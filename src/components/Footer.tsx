export default function Footer() {
  return (
    <footer className="border-t border-border px-6 py-12 md:py-16">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <a href="#" className="font-heading text-xl text-black no-underline tracking-tight">
          erre
        </a>

        <div className="flex items-center gap-6">
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
