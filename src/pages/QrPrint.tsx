import { useEffect, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import FadeIn from '../components/ui/FadeIn'
import SiteHeader from '../components/SiteHeader'
import { supabase } from '../lib/supabase'

const QR_ORIGIN = 'https://holaerre.com'

type EntryRow = {
  code: string
  cafes: { name: string } | { name: string }[] | null
}

function cafeName(cafes: EntryRow['cafes']) {
  if (!cafes) return 'Sin asignar'
  if (Array.isArray(cafes)) return cafes[0]?.name ?? 'Sin asignar'
  return cafes.name
}

export default function QrPrint() {
  const [entries, setEntries] = useState<EntryRow[]>([])
  const [loading, setLoading] = useState(true)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    let cancelled = false
    async function load() {
      const { data, error } = await supabase
        .from('entry_codes')
        .select('code, cafes(name)')
        .order('code')

      if (cancelled) return

      if (error || !data) {
        setFailed(true)
        setLoading(false)
        return
      }
      setEntries(data as EntryRow[])
      setLoading(false)
    }
    void load()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="print-hide">
        <SiteHeader />
      </div>
      <main className="px-6 pb-24 md:pb-32 flex-1">
        <div className="max-w-5xl mx-auto">
          <div className="print-hide">
            <FadeIn>
              <p className="text-muted text-xs md:text-sm tracking-widest uppercase mb-4">
                Puntos erre
              </p>
              <h1 className="font-heading text-3xl md:text-5xl font-medium text-black leading-tight tracking-tight mb-4">
                QR para imprimir
              </h1>
              <p className="text-muted text-base md:text-lg leading-relaxed mb-8">
                Cada código abre la página actual de esa cafetería. Los que dicen
                Sin asignar ya se pueden imprimir; el café se enlaza después en
                Supabase y el sticker no cambia.
              </p>
              <button
                type="button"
                onClick={() => window.print()}
                className="mb-14 px-8 py-3.5 border border-black bg-transparent text-black text-sm font-medium tracking-wide hover:bg-black hover:text-white transition-colors duration-300 cursor-pointer"
              >
                Imprimir
              </button>
            </FadeIn>
          </div>

          {loading ? (
            <p className="text-muted text-base print-hide">Cargando…</p>
          ) : failed ? (
            <p className="text-muted text-base print-hide">
              No pudimos cargar los códigos. ¿Corriste supabase-entry-codes.sql en
              Supabase?
            </p>
          ) : entries.length === 0 ? (
            <p className="text-muted text-base print-hide">Aún no hay códigos.</p>
          ) : (
            <ul className="qr-print-grid grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 list-none p-0 m-0">
              {entries.map((entry) => {
                const url = `${QR_ORIGIN}/r/${entry.code}`
                return (
                  <li
                    key={entry.code}
                    className="qr-print-card border border-border p-8 flex flex-col items-center text-center"
                  >
                    <div className="qr-print-code p-3" style={{ background: '#FFFFFF' }}>
                      <QRCodeSVG
                        value={url}
                        size={200}
                        bgColor="#FFFFFF"
                        fgColor="#000000"
                        marginSize={1}
                        title={url}
                      />
                    </div>
                    <h2 className="font-heading text-xl font-medium text-black mt-6 mb-2">
                      {cafeName(entry.cafes)}
                    </h2>
                    <p className="text-muted text-xs break-all">{url}</p>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </main>
    </div>
  )
}
