import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Navbar from '../_components/navbar'
import SummaryCards from './_components/summary-cards'
import TimeSelect from './_components/time-select'
import { isMatch } from 'date-fns'
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

  const monthIsValid = !month || isMatch(month, 'MM')

  if (!monthIsValid) {
    redirect('/?month=12')
  }
  return (
    <>
      <Navbar />
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center ">
          <h1 className="text-2xl font-bold ">Dashboard</h1>
          <TimeSelect />
        </div>
        <SummaryCards month={month} />
      </div>
    </>
  )
}

export default Home
