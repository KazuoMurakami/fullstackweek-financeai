'use client'
import { Button } from '@/app/_components/ui/button'
import { createStripeCheckout } from '../_actions/create-checkout'
import { loadStripe } from '@stripe/stripe-js'

const AdquirePlan = () => {
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
