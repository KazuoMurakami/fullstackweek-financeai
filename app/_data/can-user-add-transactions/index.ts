import { auth, clerkClient } from '@clerk/nextjs/server'
import { getCurrentMonthlyTransactions } from '../get-transactions'

export const canUserAddTransactions = async () => {
  const { userId } = await auth()
  if (!userId) {
    throw new Error('User not authenticated')
  }

  const user = await clerkClient().users.getUser(userId)

  if (user.publicMetadata.subscriptionPlan === 'premium') {
    return true
  }

  const currentMonthTransactions = await getCurrentMonthlyTransactions()

  if (currentMonthTransactions >= 10) {
    return false // user can't add transactions
  }

  return true // user can add transactions
}
