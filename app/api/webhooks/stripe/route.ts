import { clerkClient } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

export const POST = async (request: Request) => {
  const signature = request.headers.get('Stripe-Signature')
  if (!signature) {
    return new Response('No signature', { status: 400 })
  }

  const text = await request.text()

  if (!process.env.STRIPE_SECRET_KEY) {
    return new Response('No secret key', { status: 400 })
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-12-18.acacia',
  })
  const event = stripe.webhooks.constructEvent(
    text,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET as string,
  )

  switch (event.type) {
    case 'invoice.paid': {
      const {
        customer,
        subscription_details: subscriptionDetails,
        subscription,
      } = event.data.object

      const clerkUserId = subscriptionDetails?.metadata?.clerk_user_id

      if (!clerkUserId) {
        return NextResponse.error()
      }
      await clerkClient().users.updateUser(clerkUserId, {
        privateMetadata: {
          stripeCustomerId: customer, // customer id
          stripeSubscriptionId: subscription, // subscription id
        },
        publicMetadata: {
          subscriptionPlan: 'premium',
        },
      })
      break
    }
    case 'customer.subscription.deleted': {
      const subscription = await stripe.subscriptions.retrieve(
        event.data.object.id,
      )
      const clerkUserId = subscription.metadata.clerk_user_id
      if (!clerkUserId) {
        return NextResponse.error()
      }
      await clerkClient().users.updateUser(clerkUserId, {
        privateMetadata: {
          stripeCustomerId: null,
          stripeSubscriptionId: null,
        },
        publicMetadata: {
          subscriptionPlan: null,
        },
      })
      break
    }
  }
  return NextResponse.json({ received: true })
}
