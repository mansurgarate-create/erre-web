import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../lib/auth'
import { firstName } from '../lib/firstName'

export default function SiteHeader({ maxWidth = 'max-w-3xl' }: { maxWidth?: string }) {
  const { session, profile } = useAuth()
  const { pathname } = useLocation()

  const hideAccountLink =
    pathname === '/cuenta' ||
    pathname === '/privacidad' ||
    pathname === '/cuidado' ||
    pathname === '/info' ||
    pathname === '/info/hoja'
  const label = !session ? 'entrar' : firstName(profile?.name, profile?.email)

  return (
    <header className="px-4 sm:px-6 border-b border-border">
      <div className={`${maxWidth} mx-auto flex items-center justify-between gap-4 h-16 md:h-20`}>
        <Link
          to="/"
          className="font-heading text-2xl md:text-3xl font-medium tracking-tight text-black no-underline hover:text-muted transition-colors duration-300"
        >
          erre
        </Link>
        {hideAccountLink ? null : (
          <Link
            to="/cuenta"
            className="text-[15px] text-muted hover:text-black transition-colors duration-300 no-underline truncate max-w-[40vw]"
          >
            {label}
          </Link>
        )}
      </div>
    </header>
  )
}
