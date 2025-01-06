import { Button } from '@/app/_components/ui/button'
import { CardContent, CardHeader, CardTitle } from '@/app/_components/ui/card'
import { ScrollArea } from '@/app/_components/ui/scroll-area'
import { TRANSACTION_PAYMENT_METHOD_ICONS } from '@/app/_constants/transactions'
import { formatCurrency } from '@/app/_utils/currency'
import { Transaction } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'

interface LastTransactionsProps {
  lastTransactions: Transaction[]
}

const LastTransactions = ({ lastTransactions }: LastTransactionsProps) => {
  const getAmountColor = (transaction: Transaction) => {
    if (transaction.type === 'EXPENSE') {
      return 'text-red-500'
    }
    if (transaction.type === 'DEPOSIT') {
      return 'text-primary'
    }
    return 'text-white'
  }

  const getAmountPrefix = (transaction: Transaction) => {
    if (transaction.type === 'DEPOSIT') {
      return '+ '
    }
    return '- '
  }

  return (
    <ScrollArea className="rounded-md border">
      <CardHeader className="flex-row justify-between items-center">
        <CardTitle className="font-bold">Ultimas Transações</CardTitle>
        <Button className="rounded-full font-bold" variant="outline" asChild>
          {/* asChild é para não duplicar o button */}
          <Link href="/transactions">Ver mais</Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {lastTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex justify-between items-center"
          >
            <div className="flex items-center gap-3">
              <div className="bg-white bg-opacity-[3%] p-3 rounded-lg">
                <Image
                  src={
                    TRANSACTION_PAYMENT_METHOD_ICONS[transaction.paymentMethod]
                  }
                  alt="pix"
                  height={20}
                  width={20}
                />
              </div>
              <div>
                <p className="text-sm font-bold">{transaction.name}</p>
                <p className="text-xs text-gray-400">
                  {new Date(transaction.date).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>
            <p className={`text-sm font-bold ${getAmountColor(transaction)}`}>
              {getAmountPrefix(transaction)}
              {formatCurrency(transaction.amount)}
            </p>
          </div>
        ))}
      </CardContent>
    </ScrollArea>
  )
}

export default LastTransactions
