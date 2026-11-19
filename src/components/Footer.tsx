import { Link } from 'react-router-dom'
import { useTheme, type ThemePref } from '../lib/theme'

const APP_STORE_URL = 'https://apps.apple.com/mx/app/erre/id6800519444'

const themeOptions: { id: ThemePref; label: string }[] = [
  { id: 'system', label: 'sistema' },
  { id: 'light', label: 'claro' },
  { id: 'dark', label: 'oscuro' },
]

export default function Footer() {
  const { pref, setPref } = useTheme()
  return (
    <footer className="border-t border-border px-4 sm:px-6 py-12 md:py-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <a href="#" className="font-heading text-xl font-medium text-black no-underline tracking-tight">
          erre
        </a>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-6">
          <Link
            to="/cuidado"
            className="text-muted hover:text-black transition-colors duration-300 no-underline text-sm py-1.5"
          >
            cuidado del vaso
          </Link>
          <Link
            to="/privacidad"
            className="text-muted hover:text-black transition-colors duration-300 no-underline text-sm py-1.5"
          >
            privacidad
          </Link>
          <a
            href="https://instagram.com/erreparallevar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-black transition-colors duration-300 no-underline text-sm py-1.5"
          >
            instagram
          </a>
          <a
            href="mailto:hola@holaerre.com"
            className="text-muted hover:text-black transition-colors duration-300 no-underline text-sm py-1.5"
          >
            hola@holaerre.com
          </a>
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-black transition-colors duration-300 no-underline text-sm py-1.5"
          >
            app para iPhone
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-muted text-xs text-left">
          &copy; {new Date().getFullYear()} erre. todos los derechos reservados.
        </p>
        <div className="flex items-center gap-4">
          {themeOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              aria-pressed={pref === option.id}
              onClick={() => setPref(option.id)}
              className={`text-xs bg-transparent border-none cursor-pointer px-0 py-2 transition-colors duration-300 ${
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
