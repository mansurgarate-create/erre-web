import { Link } from 'react-router-dom'
import { useTheme, type ThemePref } from '../lib/theme'

const themeOptions: { id: ThemePref; label: string }[] = [
  { id: 'system', label: 'Sistema' },
  { id: 'light', label: 'Claro' },
  { id: 'dark', label: 'Oscuro' },
]

export default function Footer() {
  const { pref, setPref } = useTheme()
  return (
    <footer className="border-t border-border px-6 py-12 md:py-16">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <a href="#" className="font-heading text-xl text-black no-underline tracking-tight">
          erre
        </a>

        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
          <Link
            to="/cuenta"
            className="text-muted hover:text-black transition-colors duration-300 no-underline text-sm"
          >
            Cuenta
          </Link>
          <Link
            to="/cuidado"
            className="text-muted hover:text-black transition-colors duration-300 no-underline text-sm"
          >
            Cuidado del vaso
          </Link>
          <Link
            to="/privacidad"
            className="text-muted hover:text-black transition-colors duration-300 no-underline text-sm"
          >
            Privacidad
          </Link>
          <a
            href="https://instagram.com/erreparallevar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-muted transition-colors duration-300 no-underline text-sm"
          >
            Instagram
          </a>
          <a
            href="mailto:reusoconerre@gmail.com"
            className="text-muted hover:text-black transition-colors duration-300 no-underline text-sm"
          >
            reusoconerre@gmail.com
          </a>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-8 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-muted text-xs text-center sm:text-left">
          &copy; {new Date().getFullYear()} erre. Todos los derechos reservados.
        </p>
        <div className="flex items-center gap-4">
          {themeOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              aria-pressed={pref === option.id}
              onClick={() => setPref(option.id)}
              className={`text-xs bg-transparent border-none cursor-pointer p-0 transition-colors duration-300 ${
                pref === option.id ? 'text-black' : 'text-muted hover:text-black'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </footer>
  )
}
