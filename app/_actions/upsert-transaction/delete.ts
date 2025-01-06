'use server'
import { db } from '@/app/_lib/prisma'
import { DeleteTransactionButton } from '@/app/transactions/_components/delete-transaction-button'
import { revalidatePath } from 'next/cache'
const deleteTransaction = async ({ transaction }: DeleteTransactionButton) => {
  try {
    await db.transaction.delete({
      where: { id: transaction.id },
    })
  } catch (error) {
    console.error('An error occurred while deleting the transaction', error)
  } finally {
    console.log('excluido com sucesso!')
  }
  revalidatePath('/transactions')
}

export default deleteTransaction
