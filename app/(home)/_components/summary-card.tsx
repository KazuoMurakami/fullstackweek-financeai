import AddTransactionButton from '@/app/_components/add-transaction-button'
import { Card, CardContent, CardHeader } from '@/app/_components/ui/card'
import { canUserAddTransactions } from '@/app/_data/can-user-add-transactions'
interface SummaryCardProps {
  icon: React.ReactNode
  title: string
  amount: number
  size?: 'small' | 'large'
}

const SummaryCard = async ({
  icon,
  title,
  amount,
  size = 'small',
}: SummaryCardProps) => {
  const canUserAddTransaction = await canUserAddTransactions()
  return (
    <div>
      <Card>
        <CardHeader className="flex-row items-center gap-4">
          {icon}
          <p
            className={`${size === 'small' ? 'text-muted-foreground' : 'text-white opacity-70'}`}
          >
            {title}
          </p>
        </CardHeader>
        <CardContent className="flex justify-between">
          <p
            className={`font-bold ${size === 'small' ? 'text-2xl' : 'text-4xl'}`}
          >
            {Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(Number(amount))}
          </p>

          {size === 'large' && (
            <AddTransactionButton
              userCanAddTransaction={canUserAddTransaction}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default SummaryCard
