'use server'
import Stripe from 'stripe'
import { auth } from '@clerk/nextjs/server'
export const createStripeCheckout = async () => {
  // função para criar o checkout
  const { userId } = await auth()

  if (!userId) {
    throw new Error('Usuário não autenticado') // verifica se o usuário está autenticado
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('Chave secreta do Stripe não definida') // verifica se a chave secreta do stripe está definida
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-12-18.acacia', // versão da api
  })

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'], // metodo de pagamento disponivel para o checkout
    subscription_data: {
      // dados da assinatura
      metadata: {
        clerk_user_id: userId, // id do usuário
      },
    },
    line_items: [
      // itens que serão cobrados
      {
        price: process.env.STRIPE_PREMIUM_PLAN_PRICE_ID, // id do preço do plano
        quantity: 1, // quantidade de itens
      },
    ],
    mode: 'subscription', // modo de pagamento
    success_url: `http://localhost:3000`, // url de sucesso
    cancel_url: `http://localhost:3000`, // url de cancelamento
  })

  return { sessionId: session.id } // retorna o id da sessão
}
