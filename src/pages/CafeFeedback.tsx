import { useEffect, useState, type FormEvent } from 'react'
import { Link, useParams } from 'react-router-dom'
import FadeIn from '../components/ui/FadeIn'
import Footer from '../components/Footer'
import SiteHeader from '../components/SiteHeader'
import PageLoading from '../components/ui/PageLoading'
import { supabase } from '../lib/supabase'

const TOPICS = [
  'El vaso no estaba limpio',
  'El pin en el mapa no coincide',
  'Ya no tienen vasos erre',
  'No ofrecen vaso erre',
  'No aceptaron la devolución',
  'Elogio o comentario',
] as const

type CafeRow = {
  id: string
  name: string
  city: string
}

async function loadCafe(slug: string): Promise<CafeRow | 'inactive' | null> {
  const { data: entry, error: entryError } = await supabase
    .from('entry_codes')
    .select('cafe_id')
    .eq('code', slug)
    .maybeSingle()

  if (!entryError && entry) {
    if (!entry.cafe_id) return 'inactive'
    const { data, error } = await supabase
      .from('cafes')
      .select('id, name, city')
      .eq('id', entry.cafe_id)
      .maybeSingle()
    if (!error && data) return data as CafeRow
    return null
  }

  const { data, error } = await supabase
    .from('cafes')
    .select('id, name, city')
    .eq('nfc_tag_id', `erre:${slug}`)
    .maybeSingle()

  if (error || !data) return null
  return data as CafeRow
}

export default function CafeFeedback() {
  const { slug = '' } = useParams<{ slug: string }>()
  const [cafe, setCafe] = useState<CafeRow | null>(null)
  const [loading, setLoading] = useState(true)
  const [missing, setMissing] = useState(false)
  const [inactive, setInactive] = useState(false)
  const [topic, setTopic] = useState('')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setMissing(false)
      setInactive(false)
      setCafe(null)

      if (!slug) {
        setMissing(true)
        setLoading(false)
        return
      }

      try {
        const result = await loadCafe(slug)
        if (cancelled) return
        if (result === 'inactive') setInactive(true)
        else if (!result) setMissing(true)
        else setCafe(result)
      } catch {
        if (!cancelled) setMissing(true)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [slug])

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    if (!cafe || !topic || sending) return

    setSending(true)
    setError(false)

    const { error: insertError } = await supabase.from('cafe_feedback').insert({
      cafe_id: cafe.id,
      cafe_name: cafe.name,
      topic,
      message: message.trim() || null,
    })

    setSending(false)
    if (insertError) {
      setError(true)
      return
    }
    setSent(true)
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <SiteHeader />

      <main className="px-6 pb-24 md:pb-32 flex-1">
        <div className="max-w-xl mx-auto">
          {loading ? (
            <PageLoading />
          ) : (
            <FadeIn appear>
              {inactive ? (
                <>
                  <h1 className="font-heading text-3xl md:text-5xl font-medium text-black leading-tight tracking-tight mb-6">
                    punto erre
                  </h1>
                  <p className="text-muted text-base md:text-lg leading-relaxed mb-10">
                    Este punto erre aún no está activo.
                  </p>
                  <Link to="/#cafeterias" className="erre-btn">
                    Ver la red erre
                  </Link>
                </>
              ) : missing || !cafe ? (
                <>
                  <h1 className="font-heading text-3xl md:text-5xl font-medium text-black leading-tight tracking-tight mb-6">
                    punto erre
                  </h1>
                  <p className="text-muted text-base md:text-lg leading-relaxed mb-10">
                    No encontramos esta cafetería. Revisa el mapa de la red erre.
                  </p>
                  <Link to="/#cafeterias" className="erre-btn">
                    Ver la red erre
                  </Link>
                </>
              ) : (
                <>
                  <p className="text-muted text-xs md:text-sm mb-4">punto erre</p>
                  <h1 className="font-heading text-3xl md:text-5xl font-medium text-black leading-tight tracking-tight mb-3">
                    Hola. ¿Qué nos quieres contar de este punto erre?
                  </h1>
                  <p className="text-muted text-base md:text-lg mb-10">{cafe.name}</p>

                  {sent ? (
                    <p className="text-black text-base md:text-lg leading-relaxed mb-10">
                      Gracias por tu comentario.
                    </p>
                  ) : (
                    <form onSubmit={onSubmit} className="flex flex-col gap-8">
                    <label className="flex flex-col gap-2">
                      <span className="text-sm font-medium text-black">
                        ¿De qué se trata? <span className="text-muted">*</span>
                      </span>
                      <select
                        required
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="w-full px-5 py-3 rounded-2xl bg-wash border-none text-base font-sans text-black focus:outline-none"
                      >
                        <option value="">Elige una opción</option>
                        {TOPICS.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="flex flex-col gap-2">
                      <span className="text-sm font-medium text-black">Cuéntanos qué pasó</span>
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={5}
                        className="w-full px-5 py-3 rounded-2xl bg-wash border-none text-base font-sans text-black placeholder:text-muted focus:outline-none resize-y min-h-32"
                      />
                    </label>

                    {error ? (
                      <p className="text-muted text-sm">
                        No se pudo enviar. Inténtalo de nuevo.
                      </p>
                    ) : null}

                    <button
                      type="submit"
                      disabled={!topic || sending}
                      className="erre-btn self-start disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {sending ? 'Enviando…' : 'Enviar'}
                    </button>
                    </form>
                  )}

                  <Link
                    to={`/r/${slug}`}
                    className="inline-block mt-10 text-muted text-sm no-underline hover:text-black transition-colors duration-300"
                  >
                    Volver al punto erre
                  </Link>
                </>
              )}
            </FadeIn>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
