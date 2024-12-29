import { db } from '@/app/_lib/prisma'
import { TransactionType } from '@prisma/client'
import { TransactionPercentagePerType } from './types'

export const getDashBoard = async (month: string) => {
  const where = {
    date: {
      gte: new Date(`2024-${month}-01`),
      lt: new Date(`2024-${month}-31`),
    },
  }
  const depositsTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: 'DEPOSIT' },
        _sum: {
          amount: true,
        },
      })
    )?._sum?.amount,
  )
  const investmentsTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: 'INVESTMENT' },
        _sum: {
          amount: true,
        },
      })
    )?._sum?.amount,
  )
  const expensesTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: 'EXPENSE' },
        _sum: {
          amount: true,
        },
      })
    )?._sum?.amount,
  )
  const balance = depositsTotal - investmentsTotal - expensesTotal

  const transactionsTotal = Number(
    (
      await db.transaction.aggregate({
        where,
        _sum: { amount: true },
      })
    )._sum?.amount,
  )

  const typePercentage: TransactionPercentagePerType = {
    [TransactionType.INVESTMENT]: Math.round(
      ((investmentsTotal || 0) / transactionsTotal) * 100,
    ),
    [TransactionType.DEPOSIT]: Math.round(
      ((depositsTotal || 0) / transactionsTotal) * 100,
    ),
    [TransactionType.EXPENSE]: Math.round(
      ((expensesTotal || 0) / transactionsTotal) * 100,
    ),
    // Este código calcula a porcentagem de cada tipo de transação (INVESTMENT, DEPOSIT, EXPENSE) em relação ao total de transações e armazena esses valores em um objeto
  }

  return {
    balance,
    depositsTotal,
    investmentsTotal,
    expensesTotal,
    typePercentage,
  }
}
