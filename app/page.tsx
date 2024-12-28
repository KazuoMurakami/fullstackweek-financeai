import { UserButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'

const Home = async () => {
  const { userId } = await auth()
  // verifica se o usuario está logaod
  if (!userId) {
    redirect('/login')
  }
  return (
    <div className="flex h-full items-center justify-center flex-col">
      {/* userButton faz parte do clerk para criar um button com as informações do login */}
      <UserButton showName />
      <Link href="/transactions">Transações</Link>
    </div>
  )
}

export default Home
