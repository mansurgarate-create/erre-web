import { useState, useEffect } from 'react'

const links = [
  { label: 'Cómo funciona', href: '#como-funciona' },
  { label: 'Cafeterías', href: '#cafeterias' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'FAQ', href: '#faq' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

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

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted hover:text-black transition-colors duration-300 no-underline"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden bg-transparent border-none cursor-pointer p-2"
          aria-label="Menú"
        >
          <div className="w-5 flex flex-col gap-1.5">
            <span
              className={`block h-px bg-black transition-all duration-300 ${
                menuOpen ? 'rotate-45 translate-y-[3.5px]' : ''
              }`}
            />
            <span
              className={`block h-px bg-black transition-all duration-300 ${
                menuOpen ? '-rotate-45 -translate-y-[3.5px]' : ''
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 bg-white ${
          menuOpen ? 'max-h-64' : 'max-h-0'
        }`}
      >
        <div className="px-6 pb-6 flex flex-col gap-4">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm text-muted hover:text-black transition-colors duration-300 no-underline"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
