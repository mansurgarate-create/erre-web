import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../lib/auth'
import { firstName } from '../lib/firstName'

const accountLinkClass =
  'text-sm text-muted hover:text-black transition-all duration-300 no-underline truncate max-w-[40vw]'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { session, profile, loading } = useAuth()
  const accountLabel = session ? firstName(profile?.name, profile?.email) : 'Entrar'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-white/90 backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16 md:h-20">
        <a href="#" className="font-heading text-2xl md:text-3xl text-black no-underline tracking-tight">
          erre
        </a>

        <Link to="/cuenta" className={`${accountLinkClass} ${loading ? 'opacity-0' : 'opacity-100'}`}>
          {accountLabel}
        </Link>
      </div>
    </nav>
  )
}
