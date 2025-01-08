'use client'

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/app/_components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/app/_components/ui/chart'
import { TransactionPercentagePerType } from '@/app/_data/get-dashboard/types'
import { TransactionType } from '@prisma/client'
import { Pie, PieChart } from 'recharts'
import PercentageItem from './percentage-item'
import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpDownIcon,
} from 'lucide-react'

const chartConfig = {
  [TransactionType.INVESTMENT]: {
    label: 'Investido',
    color: '#FFFFF',
  },
  [TransactionType.DEPOSIT]: {
    label: 'Receitas',
    color: '#55B02E',
  },
  [TransactionType.EXPENSE]: {
    label: 'Despesas',
    color: '#E93030',
  },
} satisfies ChartConfig

interface transactionsPieChartProps {
  depositsTotal: number
  investmentsTotal: number
  expensesTotal: number
  typePercentage: TransactionPercentagePerType
}

const PieChartDonut = ({
  depositsTotal,
  investmentsTotal,
  expensesTotal,
  typePercentage,
}: transactionsPieChartProps) => {
  const chartData = [
    {
      type: TransactionType.INVESTMENT,
      amount: investmentsTotal,
      fill: '#FFFFFF',
    },
    {
      type: TransactionType.DEPOSIT,
      amount: depositsTotal,
      fill: '#55B02E',
    },
    {
      type: TransactionType.EXPENSE,
      amount: expensesTotal,
      fill: '#E93030',
    },
  ]

  return (
    <Card className="flex flex-col p-6">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Donut</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[200px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="type"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>
        <div className="space-y-4">
          <PercentageItem
            value={typePercentage[TransactionType.INVESTMENT]}
            title="Investimentos"
            icon={<PiggyBankIcon size={24} />}
          />
          <PercentageItem
            value={typePercentage[TransactionType.DEPOSIT]}
            title="Receitas"
            icon={<TrendingUpDownIcon className="text-primary" />}
          />
          <PercentageItem
            value={typePercentage[TransactionType.EXPENSE]}
            title="Despesas"
            icon={<TrendingDownIcon size={24} className="text-red-500" />}
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default PieChartDonut
