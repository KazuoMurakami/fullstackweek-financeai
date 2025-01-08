import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Navbar from '../_components/navbar'
import SummaryCards from './_components/summary-cards'
import TimeSelect from './_components/time-select'
import { isMatch } from 'date-fns'
import { getDashBoard } from '../_data/get-dashboard'
import PieChartDonut from './_components/transactions-pie-chart'
import ExpensePerCategory from './_components/expenses-per-category'
import LastTransactions from './_components/last-transactions'

const Home = async ({
  searchParams: { month },
}: {
  searchParams: { month: string }
}) => {
  const { userId } = await auth()
  // verifica se o usuario está logaod
  if (!userId) {
    redirect('/login')
  }

  const currentMonth = new Date().getMonth() + 1

  if (!month) {
    redirect(`/?month=${currentMonth}`)
  }

  const monthIsValid = isMatch(month, 'MM')

  if (!monthIsValid) {
    redirect('/?month=12')
  }

  const dashboard = await getDashBoard(month)

  return (
    <>
      <Navbar />
      <div className="p-6 space-y-6 flex flex-col overflow-hidden h-full">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold ">Dashboard</h1>
          <TimeSelect />
        </div>
        <div className="grid grid-cols-[2fr,1fr] gap-6 overflow-hidden h-full">
          <div className="flex flex-col gap-3 overflow-hidden">
            <SummaryCards {...dashboard} />
            <div className="grid grid-cols-3 grid-row-1 gap-6 overflow-hidden">
              <PieChartDonut {...dashboard} />
              <ExpensePerCategory
                expensesPerCategory={dashboard.TotalExpensePerCategory}
              />
            </div>
          </div>
          <LastTransactions lastTransactions={dashboard.lastTransactions} />
        </div>
      </div>
    </>
  )
}

export default Home
