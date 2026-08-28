import { useEffect, useRef, useState } from 'react'
import { QRCodeCanvas, QRCodeSVG } from 'qrcode.react'
import FadeIn from '../components/ui/FadeIn'
import SiteHeader from '../components/SiteHeader'
import { supabase } from '../lib/supabase'

const QR_ORIGIN = 'https://holaerre.com'
const PNG_SIZE = 1024

type EntryRow = {
  code: string
  cafes: { name: string } | { name: string }[] | null
}

function cafeName(cafes: EntryRow['cafes']) {
  if (!cafes) return 'Sin asignar'
  if (Array.isArray(cafes)) return cafes[0]?.name ?? 'Sin asignar'
  return cafes.name
}

function downloadPng(canvas: HTMLCanvasElement | null, filename: string) {
  if (!canvas) return
  const href = canvas.toDataURL('image/png')
  const link = document.createElement('a')
  link.href = href
  link.download = filename
  link.click()
}

function QrCard({ code, name }: { code: string; name: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const url = `${QR_ORIGIN}/r/${code}`

  return (
    <li className="qr-print-card relative border border-border p-8 flex flex-col items-center text-center">
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
      <div className="absolute left-[-9999px] top-0" aria-hidden>
        <QRCodeCanvas
          ref={canvasRef}
          value={url}
          size={PNG_SIZE}
          bgColor="#FFFFFF"
          fgColor="#000000"
          marginSize={1}
        />
      </div>
      <h2 className="font-heading text-xl font-medium text-black mt-6 mb-2">{name}</h2>
      <p className="text-muted text-xs break-all">{url}</p>
      <button
        type="button"
        onClick={() => downloadPng(canvasRef.current, `erre-${code}.png`)}
        className="print-hide mt-5 bg-transparent border-none p-0 text-sm text-black cursor-pointer hover:text-muted"
      >
        Descargar PNG
      </button>
    </li>
  )
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
              <button
                type="button"
                onClick={() => window.print()}
                className="erre-btn mb-14"
              >
                Imprimir
              </button>
            </FadeIn>
          </div>

          {loading ? (
            <p className="text-muted text-base print-hide">Cargando…</p>
          ) : failed ? (
            <p className="text-muted text-base print-hide">No pudimos cargar los códigos.</p>
          ) : entries.length === 0 ? (
            <p className="text-muted text-base print-hide">Aún no hay códigos.</p>
          ) : (
            <ul className="qr-print-grid grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 list-none p-0 m-0">
              {entries.map((entry) => (
                <QrCard key={entry.code} code={entry.code} name={cafeName(entry.cafes)} />
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  )
}
