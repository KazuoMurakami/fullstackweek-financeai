import { db } from '../_lib/prisma'
import { DataTable } from '../_components/ui/data-table'
import AddTransactionButton from '../_components/add-transaction-button'
import { transactionColumns } from './_columns'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Navbar from '../_components/navbar'
import { canUserAddTransactions } from '../_data/can-user-add-transactions'
const TransactionsPage = async () => {
  const { userId } = await auth()
  if (!userId) {
    redirect('/login')
  }
  const transactions = await db.transaction.findMany({
    where: {
      userId,
    },
  })

  const canUserAddTransaction = await canUserAddTransactions()

  return (
    <>
      <Navbar />
      <div className="space-y-6 p-6">
        {/* TÍTULO E BOTÃO */}
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Transações</h1>
          <AddTransactionButton userCanAddTransaction={canUserAddTransaction} />
        </div>
        <DataTable columns={transactionColumns} data={transactions} />
      </div>
    </>
  )
}

export default TransactionsPage
