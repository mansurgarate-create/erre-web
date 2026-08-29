import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../lib/auth'
import { firstName } from '../lib/firstName'

export default function SiteHeader({ maxWidth = 'max-w-3xl' }: { maxWidth?: string }) {
  const { session, profile } = useAuth()
  const { pathname } = useLocation()

  const onAccount = pathname === '/cuenta'
  const label = !session ? 'Iniciar sesión' : firstName(profile?.name, profile?.email)

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
