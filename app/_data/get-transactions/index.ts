import { db } from '@/app/_lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { startOfMonth, endOfMonth } from 'date-fns'

export const getCurrentMonthlyTransactions = async () => {
  const { userId } = await auth()
  if (!userId) {
    throw new Error('User not authenticated')
  }

  return db.transaction.count({
    where: {
      userId,
      createdAt: {
        gte: startOfMonth(new Date()),
        lt: endOfMonth(new Date()),
      },
    },
  })
}
