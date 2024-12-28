'use client'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
const Navbar = () => {
  const pathname = usePathname()
  return (
    <nav className="flex justify-between items-center p-6">
      <div className="flex items-center gap-10">
        <Image src="/logo.svg" alt="Logo" width={100} height={100} />
        <Link
          href="/"
          className={
            pathname === '/' ? 'text-primary ' : 'text-muted-foreground'
          }
        >
          Dashboard
        </Link>
        <Link
          href="/transactions"
          className={
            pathname === '/transactions'
              ? 'text-primary '
              : 'text-muted-foreground'
          }
        >
          transações
        </Link>
        <Link
          href="/subscription"
          className={
            pathname === '/subscription'
              ? 'text-primary '
              : 'text-muted-foreground'
          }
        >
          Assinatura
        </Link>
      </div>
      <UserButton showName />
    </nav>
  )
}

export default Navbar
