import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../lib/auth'
import { firstName } from '../lib/firstName'

const navLinkClass = 'text-[15px] text-black no-underline hover:text-muted transition-colors duration-300 py-2'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { session, profile, loading } = useAuth()
  const accountLabel = session ? firstName(profile?.name, profile?.email) : 'entrar'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      aria-label="Principal"
      className={`fixed top-0 left-0 right-0 z-[1100] transition-all duration-500 ${
        scrolled ? 'bg-white/90 backdrop-blur-sm border-b border-border' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 md:h-20 gap-6">
        <a href="#" className="font-heading text-2xl md:text-3xl font-medium text-black no-underline tracking-tight">
          erre
        </a>

        <div className="flex items-center gap-6 md:gap-8">
          <a href="#cafeterias" className={`${navLinkClass} hidden md:inline`}>mapa</a>
          <a href="#como-funciona" className={`${navLinkClass} hidden md:inline`}>cómo funciona</a>
          <a href="#para-cafes" className={`${navLinkClass} hidden sm:inline`}>para cafés</a>
          <Link
            to="/cuenta"
            className={`text-[15px] text-muted hover:text-black transition-all duration-300 no-underline truncate max-w-[40vw] py-2 ${
              loading ? 'opacity-0' : 'opacity-100'
            }`}
          >
            {accountLabel}
          </Link>
        </div>
      </div>
    </nav>
  )
}
