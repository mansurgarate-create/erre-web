import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import FadeIn from '../components/ui/FadeIn'
import Closing from '../components/Closing'
import Footer from '../components/Footer'
import { supabase } from '../lib/supabase'

interface CafeInfo {
  name: string
  address: string
  hours: string
  mapsUrl: string | null
  city: string
}

export default function CafeNFCLanding() {
  const { slug = '' } = useParams<{ slug: string }>()
  const [cafe, setCafe] = useState<CafeInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setNotFound(false)

      const nfcTagId = `erre:${slug}`

      try {
        const { data, error } = await supabase
          .from('cafes')
          .select('name, address, hours, maps_url, city')
          .eq('nfc_tag_id', nfcTagId)
          .maybeSingle()

        if (cancelled) return

        if (error || !data) {
          setNotFound(true)
          setCafe(null)
        } else {
          setCafe({
            name: data.name,
            address: data.address,
            hours: data.hours,
            mapsUrl: data.maps_url,
            city: data.city,
          })
        }
      } catch {
        if (!cancelled) {
          setNotFound(true)
          setCafe(null)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    if (slug) {
      load()
    } else {
      setNotFound(true)
      setLoading(false)
    }

    return () => {
      cancelled = true
    }
  }, [slug])

  return (
    <div className="min-h-screen bg-white">
      <header className="px-6 pt-10 pb-6 md:pt-14 md:pb-8">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/"
            className="font-heading text-xl md:text-2xl font-medium text-black no-underline hover:text-muted transition-colors duration-300"
          >
            erre
          </Link>
        </div>
      </header>

      <main className="px-6 pb-8 md:pb-12">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            {loading ? (
              <p className="text-muted text-base">Cargando…</p>
            ) : notFound || !cafe ? (
              <>
                <h1 className="font-heading text-3xl md:text-5xl font-medium text-black leading-tight tracking-tight mb-6">
                  Punto erre
                </h1>
                <p className="text-muted text-base md:text-lg leading-relaxed mb-10">
                  No encontramos esta cafetería. Revisa el mapa de la red erre.
                </p>
                <Link
                  to="/#cafeterias"
                  className="inline-block px-8 py-3.5 bg-black text-white text-sm font-medium tracking-wide no-underline hover:bg-black/85 transition-colors duration-300"
                >
                  Ver cafeterías
                </Link>
              </>
            ) : (
              <>
                <p className="text-muted text-xs md:text-sm tracking-widest uppercase mb-4">
                  Punto erre
                </p>
                <h1 className="font-heading text-3xl md:text-5xl font-medium text-black leading-tight tracking-tight mb-4">
                  {cafe.name}
                </h1>
                <p className="text-muted text-base md:text-lg leading-relaxed mb-2">
                  {cafe.address}
                </p>
                <p className="text-muted text-sm md:text-base mb-10">
                  {cafe.hours}
                  {cafe.city ? ` · ${cafe.city}` : ''}
                </p>

                <div className="border border-border p-8 md:p-10 mb-10">
                  <h2 className="font-heading text-xl md:text-2xl font-medium text-black mb-8">
                    ¿Cómo funciona?
                  </h2>
                  <div className="space-y-6 md:space-y-8">
                    {[
                      {
                        number: '01',
                        title: 'Pide',
                        description:
                          'Ordena tu bebida en un vaso erre y deja un pequeño depósito en la caja.',
                      },
                      {
                        number: '02',
                        title: 'Disfruta',
                        description: 'Llévalo contigo. Es tuyo mientras lo necesites.',
                      },
                      {
                        number: '03',
                        title: 'Devuelve',
                        description:
                          'Regresa el vaso en cualquier cafetería de la red y recupera tu depósito.',
                      },
                    ].map((step) => (
                      <div key={step.number}>
                        <span className="font-heading text-3xl md:text-4xl text-muted/40 block mb-3">
                          {step.number}
                        </span>
                        <h3 className="font-sans text-lg md:text-xl font-medium text-black mb-2">
                          {step.title}
                        </h3>
                        <p className="text-muted text-sm md:text-base leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    ))}
                  </div>
                  <p className="text-muted text-sm md:text-base leading-relaxed mt-8 pt-8 border-t border-border">
                    Para registrar renta o devolución en tu historial, abre la app{' '}
                    <span className="text-black font-medium">erre</span>, elige Rentar o
                    Devolver y acerca el iPhone a este punto.
                  </p>
                </div>

                {slug === 'fiato-cafeto' && (
                  <div className="border border-border p-8 md:p-10 mb-10">
                    <h2 className="font-heading text-xl md:text-2xl font-medium text-black mb-2">
                      Recomendados por erre
                    </h2>
                    <p className="text-muted text-sm md:text-base mb-8">
                      Pídelas en vaso erre.
                    </p>
                    <div className="space-y-6 md:space-y-8">
                      {[
                        {
                          number: '01',
                          title: 'Bee tonic',
                          description:
                            'Miel de azahar, jugo de limón, agua tónica y cold brew.',
                        },
                        {
                          number: '02',
                          title: 'Danish Latte',
                          description:
                            'Jarabe de frambuesa natural, leche, espresso y foam de queso crema con vainilla.',
                        },
                        {
                          number: '03',
                          title: 'Matcha tonic',
                          description:
                            'Jarabe de piña natural, agua tónica y matcha ceremonial.',
                        },
                      ].map((drink) => (
                        <div key={drink.number}>
                          <span className="font-heading text-3xl md:text-4xl text-muted/40 block mb-3">
                            {drink.number}
                          </span>
                          <h3 className="font-sans text-lg md:text-xl font-medium text-black mb-2">
                            {drink.title}
                          </h3>
                          <p className="text-muted text-sm md:text-base leading-relaxed">
                            {drink.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3">
                  {cafe.mapsUrl && (
                    <a
                      href={cafe.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-center px-8 py-3.5 bg-black text-white text-sm font-medium tracking-wide no-underline hover:bg-black/85 transition-colors duration-300"
                    >
                      Abrir en Maps
                    </a>
                  )}
                  <Link
                    to="/#cafeterias"
                    className="inline-block text-center px-8 py-3.5 border border-black text-black text-sm font-medium tracking-wide no-underline hover:bg-black hover:text-white transition-colors duration-300"
                  >
                    Ver la red
                  </Link>
                </div>
              </>
            )}
          </FadeIn>
        </div>
      </main>

      <Closing />
      <Footer />
    </div>
  )
}
