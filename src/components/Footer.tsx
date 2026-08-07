import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-border px-6 py-12 md:py-16">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <a href="#" className="font-heading text-xl text-black no-underline tracking-tight">
          erre
        </a>

        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
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
            className="text-muted hover:text-black transition-colors duration-300 no-underline text-sm"
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

      <div className="max-w-5xl mx-auto mt-8 pt-8 border-t border-border">
        <p className="text-muted text-xs text-center">
          &copy; {new Date().getFullYear()} erre. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}
