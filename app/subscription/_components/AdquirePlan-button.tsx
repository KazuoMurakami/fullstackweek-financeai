'use client'
import { Button } from '@/app/_components/ui/button'
import { createStripeCheckout } from '../_actions/create-checkout'
import { loadStripe } from '@stripe/stripe-js'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'

const AdquirePlan = () => {
  const { user } = useUser()
  const handleAdquirePlan = async () => {
    const { sessionId } = await createStripeCheckout() // cria a sessão de checkout

    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      throw new Error('Chave pública do Stripe não definida')
    }
    const stripe = await loadStripe(
      // carrega o stripe
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    )

    if (!stripe) {
      throw new Error('Erro ao carregar o stripe')
    }

    await stripe.redirectToCheckout({
      // redireciona para o checkout
      sessionId,
    })
  }

  const hasPremiumPlan = user?.publicMetadata.subscriptionPlan === 'premium'

  if (hasPremiumPlan) {
    return (
      <Button className="rounded-full w-full font-bold" variant="link" asChild>
        <Link
          href={`${process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL as string}?prefilled_email=${user.emailAddresses[0].emailAddress}`}
        >
          Gerenciar assinatura
        </Link>
      </Button>
    )
  }
  return (
    <Button
      className="rounded-full w-full font-bold"
      onClick={handleAdquirePlan}
    >
      Adquirir plano
    </Button>
  )
}

export default AdquirePlan
