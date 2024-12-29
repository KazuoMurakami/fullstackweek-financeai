import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpDown,
  WalletIcon,
} from 'lucide-react'
import SummaryCard from './summary-card'

interface SummaryCard {
  balance: number
  depositsTotal: number
  investmentsTotal: number
  expensesTotal: number
}

const SummaryCards = async ({
  balance,
  depositsTotal,
  investmentsTotal,
  expensesTotal,
}: SummaryCard) => {
  return (
    <div className="space-y-6">
      <SummaryCard
        icon={<WalletIcon size={16} />}
        title="Saldo"
        amount={balance}
        size="large"
      />
      {/* OUTROS CARDS */}
      <div className="grid grid-cols-3 gap-4">
        <SummaryCard
          icon={<PiggyBankIcon size={24} />}
          title="Investido"
          amount={investmentsTotal}
        />
        <SummaryCard
          icon={<TrendingUpDown size={24} className="text-primary" />}
          title="Receitas"
          amount={depositsTotal}
        />
        <SummaryCard
          icon={<TrendingDownIcon size={24} className="text-red-500" />}
          title="Despesas"
          amount={expensesTotal}
        />
      </div>
    </div>
  )
}

export default SummaryCards
