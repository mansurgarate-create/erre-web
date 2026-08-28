import { Link } from 'react-router-dom'
import SiteHeader from '../components/SiteHeader'
import Footer from '../components/Footer'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <SiteHeader />
      <main className="px-6 pb-24 md:pb-32 flex-1">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-heading text-3xl md:text-5xl font-medium text-black leading-tight tracking-tight mb-6">
            Esta página no existe
          </h1>
          <p className="text-muted text-base md:text-lg leading-relaxed mb-10">
            Revisa el enlace o vuelve al inicio.
          </p>
          <Link
            to="/"
            className="erre-btn"
          >
            Ir al inicio
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}
