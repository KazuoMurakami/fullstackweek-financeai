'use server'

import { db } from '@/app/_lib/prisma'
import { auth } from '@clerk/nextjs/server'
import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from '@prisma/client'
import { upsertTransactionSchema } from './schema'
import { revalidatePath } from 'next/cache'

interface UpsertTransactionParams {
  id?: string
  name: string
  amount: number
  type: TransactionType
  category: TransactionCategory
  paymentMethod: TransactionPaymentMethod
  date: Date
}

export const upsertTransaction = async (params: UpsertTransactionParams) => {
  const { userId } = await auth()

  if (!userId) {
    throw new Error('Unauthorized')
  }
  upsertTransactionSchema.parse(params)
  if (params.id) {
    // Se `id` estiver definido, use `upsert` normalmente
    await db.transaction.upsert({
      where: { id: params.id },
      update: { ...params, userId },
      create: { ...params, userId },
    })
  } else {
    // Se `id` não estiver definido, apenas crie
    await db.transaction.create({
      data: { ...params, userId },
    })
  }

  revalidatePath('/transactions')
}
