import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import FadeIn from '../components/ui/FadeIn'
import SiteHeader from '../components/SiteHeader'
import Footer from '../components/Footer'
import { supabase } from '../lib/supabase'
import { useAuth } from '../lib/auth'
import { rpcMessage } from '../lib/rpc'

type Tx = {
  id: string
  type: 'rent' | 'return'
  created_at: string
  cafe_name: string
}

function formatWhen(iso: string) {
  const date = new Date(iso)
  return date.toLocaleString('es-MX', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function Account() {
  const { session, profile, loading, signInWithGoogle, signOut } = useAuth()
  const [transactions, setTransactions] = useState<Tx[]>([])
  const [historyError, setHistoryError] = useState<string | null>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (!session) {
      setTransactions([])
      return
    }

    let cancelled = false
    async function load() {
      const { data, error } = await supabase.rpc('my_web_account')
      if (cancelled) return
      if (error || !data) {
        setHistoryError(rpcMessage(error))
        return
      }
      const payload = (typeof data === 'string' ? JSON.parse(data) : data) as {
        transactions?: Tx[]
      }
      setTransactions(payload.transactions ?? [])
      setHistoryError(null)
    }
    void load()
    return () => {
      cancelled = true
    }
  }, [session])

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <SiteHeader />
      <main className="px-6 pb-24 md:pb-32 flex-1">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <h1 className="font-heading text-3xl md:text-5xl font-medium text-black leading-tight tracking-tight mb-6">
              Cuenta
            </h1>
          </FadeIn>

          {loading ? (
            <p className="text-muted text-base">Cargando…</p>
          ) : !session ? (
            <FadeIn delay={80}>
              <p className="text-muted text-base md:text-lg leading-relaxed mb-8">
                Entra con Google para ver tu historial y registrar vasos. El depósito sigue en la
                caja de la cafetería.
              </p>
              <button
                type="button"
                onClick={() => void signInWithGoogle('/cuenta')}
                className="px-8 py-3.5 bg-black text-white text-sm font-medium tracking-wide border-none cursor-pointer hover:bg-black/85 transition-colors duration-300"
              >
                Continuar con Google
              </button>
            </FadeIn>
          ) : (
            <FadeIn delay={80}>
              <p className="text-muted text-base md:text-lg leading-relaxed mb-2">
                {profile?.name || profile?.email || 'Sesión con Google'}
              </p>
              <p className="text-black text-base md:text-lg mb-10">
                {profile
                  ? `${profile.cups_in_hand} ${profile.cups_in_hand === 1 ? 'vaso' : 'vasos'} en mano`
                  : 'No pudimos cargar tu perfil. ¿Corriste el SQL de la web en Supabase?'}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-14">
                <Link
                  to="/registrar"
                  className="inline-block text-center px-8 py-3.5 bg-black text-white text-sm font-medium tracking-wide no-underline hover:bg-black/85 transition-colors duration-300"
                >
                  Elegir cafetería
                </Link>
                <button
                  type="button"
                  onClick={() => void signOut()}
                  className="px-8 py-3.5 border border-black bg-transparent text-black text-sm font-medium tracking-wide cursor-pointer hover:bg-black hover:text-white transition-colors duration-300"
                >
                  Cerrar sesión
                </button>
              </div>

              <h2 className="font-heading text-xl md:text-2xl font-medium text-black mb-6">
                Historial
              </h2>
              {historyError && <p className="text-muted text-sm mb-4">{historyError}</p>}
              {transactions.length === 0 && !historyError ? (
                <p className="text-muted text-sm md:text-base">Aún no hay rentas registradas.</p>
              ) : (
                <ul className="divide-y divide-border border-t border-border">
                  {transactions.map((tx) => (
                    <li key={tx.id} className="py-4 flex items-baseline justify-between gap-4">
                      <div>
                        <p className="text-black text-sm md:text-base">
                          {tx.type === 'rent' ? 'Renta' : 'Devolución'} · {tx.cafe_name}
                        </p>
                        <p className="text-muted text-xs md:text-sm">{formatWhen(tx.created_at)}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </FadeIn>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
