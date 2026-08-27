import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../lib/auth'

function firstName(name: string | null | undefined, email: string | null | undefined) {
  const word = name?.trim().split(/\s+/)[0]
  if (word) return word
  const local = email?.split('@')[0]
  if (local) return local
  return 'Cuenta'
}

function isRentFlow(pathname: string) {
  return pathname === '/registrar' || pathname === '/r' || pathname.startsWith('/r/')
}

export default function SiteHeader({ maxWidth = 'max-w-3xl' }: { maxWidth?: string }) {
  const { session, profile } = useAuth()
  const { pathname } = useLocation()

  const onAccount = pathname === '/cuenta'
  const rentFlow = isRentFlow(pathname)
  const label = !session ? 'Entrar' : rentFlow ? firstName(profile?.name, profile?.email) : 'Cuenta'

  return (
    <header className="px-6 pt-10 pb-6 md:pt-14 md:pb-8">
      <div className={`${maxWidth} mx-auto flex items-center justify-between gap-4`}>
        <Link
          to="/"
          className="font-heading text-xl md:text-2xl font-medium text-black no-underline hover:text-muted transition-colors duration-300"
        >
          erre
        </Link>
        {onAccount ? null : (
          <Link
            to="/cuenta"
            className="text-sm text-muted hover:text-black transition-colors duration-300 no-underline truncate max-w-[40vw]"
          >
            {label}
          </Link>
        )}
      </div>
    </header>
  )
}
