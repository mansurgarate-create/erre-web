import { Link } from 'react-router-dom'
import { useAuth } from '../lib/auth'

export default function SiteHeader({ maxWidth = 'max-w-3xl' }: { maxWidth?: string }) {
  const { session } = useAuth()

  return (
    <header className="px-6 pt-10 pb-6 md:pt-14 md:pb-8">
      <div className={`${maxWidth} mx-auto flex items-center justify-between gap-4`}>
        <Link
          to="/"
          className="font-heading text-xl md:text-2xl font-medium text-black no-underline hover:text-muted transition-colors duration-300"
        >
          erre
        </Link>
        <Link
          to="/cuenta"
          className="text-sm text-muted hover:text-black transition-colors duration-300 no-underline"
        >
          {session ? 'Cuenta' : 'Entrar'}
        </Link>
      </div>
    </header>
  )
}
