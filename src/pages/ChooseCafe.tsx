import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import FadeIn from '../components/ui/FadeIn'
import SiteHeader from '../components/SiteHeader'
import Footer from '../components/Footer'
import { supabase } from '../lib/supabase'

type CafeRow = {
  name: string
  address: string
  city: string
  hours: string
  nfc_tag_id: string
}

function slugFromTag(nfcTagId: string) {
  return nfcTagId.replace(/^erre:/, '')
}

export default function ChooseCafe() {
  const [cafes, setCafes] = useState<CafeRow[]>([])
  const [loading, setLoading] = useState(true)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    let cancelled = false
    async function load() {
      const { data, error } = await supabase
        .from('cafes')
        .select('name, address, city, hours, nfc_tag_id')
        .order('name')

      if (cancelled) return

      if (error || !data) {
        setFailed(true)
        setLoading(false)
        return
      }
      setCafes(data as CafeRow[])
      setLoading(false)
    }
    void load()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <SiteHeader />
      <main className="px-6 pb-24 md:pb-32 flex-1">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <p className="text-muted text-xs md:text-sm tracking-widest uppercase mb-4">
              Registrar vaso
            </p>
            <h1 className="font-heading text-3xl md:text-5xl font-medium text-black leading-tight tracking-tight mb-4">
              ¿En qué cafetería estás?
            </h1>
            <p className="text-muted text-base md:text-lg leading-relaxed mb-10">
              Elige dónde estás para registrar tu vaso. El depósito se maneja en la cafetería; esto
              solo guarda tu historial.
            </p>
          </FadeIn>

          {loading ? (
            <p className="text-muted text-base">Cargando…</p>
          ) : failed ? (
            <p className="text-muted text-base">
              No pudimos cargar las cafeterías.{' '}
              <Link to="/#cafeterias" className="text-black">
                Ver el mapa
              </Link>
              .
            </p>
          ) : (
            <ul className="space-y-3">
              {cafes.map((cafe) => (
                <li key={cafe.nfc_tag_id}>
                  <Link
                    to={`/r/${slugFromTag(cafe.nfc_tag_id)}`}
                    className="block border border-border p-6 md:p-8 no-underline hover:border-black transition-colors duration-300"
                  >
                    <h2 className="font-heading text-xl md:text-2xl font-medium text-black mb-2">
                      {cafe.name}
                    </h2>
                    <p className="text-muted text-sm md:text-base">{cafe.address}</p>
                    <p className="text-muted text-xs md:text-sm mt-1">
                      {cafe.hours}
                      {cafe.city ? ` · ${cafe.city}` : ''}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
