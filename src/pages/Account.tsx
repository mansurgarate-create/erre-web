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

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('es-MX', { day: 'numeric', month: 'short' })
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })
}

function TxArrow({ type }: { type: 'rent' | 'return' }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={type === 'rent' ? 'text-black' : 'text-muted'}
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      {type === 'rent' ? (
        <path
          d="M12 16V8M12 8l-3.5 3.5M12 8l3.5 3.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M12 8v8M12 16l-3.5-3.5M12 16l3.5-3.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  )
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
                Entra con Google para ver tu historial y registrar vasos. El depósito se maneja en
                la cafetería. Aquí solo llevas tu historial.
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
              <div className="mb-8">
                {profile?.name ? (
                  <p className="font-heading text-xl md:text-2xl font-medium text-black mb-1">
                    {profile.name}
                  </p>
                ) : null}
                {profile?.email || !profile?.name ? (
                  <p className="text-muted text-sm md:text-base">
                    {profile?.email || 'Sesión con Google'}
                  </p>
                ) : null}
              </div>

              {profile ? (
                <div className="border border-border p-6 md:p-8 mb-10">
                  <p className="text-muted text-xs md:text-sm mb-2">Vasos en mano</p>
                  <p className="font-heading text-5xl md:text-6xl font-medium text-black leading-none tracking-tight">
                    {profile.cups_in_hand}
                  </p>
                  <p className="text-muted text-xs md:text-sm mt-3">vasos rentados actualmente</p>
                </div>
              ) : (
                <p className="text-muted text-sm md:text-base mb-10">
                  No pudimos cargar tu perfil. ¿Corriste el SQL de la web en Supabase?
                </p>
              )}

              <div className="flex flex-col sm:flex-row gap-3 mb-14">
                <Link
                  to="/registrar"
                  className="inline-block text-center px-8 py-3.5 border border-black bg-transparent text-black text-sm font-medium tracking-wide no-underline hover:bg-black hover:text-white transition-colors duration-300"
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
                    <li key={tx.id} className="py-4 flex items-center gap-4">
                      <TxArrow type={tx.type} />
                      <div className="min-w-0 flex-1">
                        <p className="text-black text-sm md:text-base font-medium">
                          {tx.type === 'rent' ? 'Rentado' : 'Devuelto'}
                        </p>
                        <p className="text-muted text-xs md:text-sm truncate">{tx.cafe_name}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-muted text-xs">{formatDate(tx.created_at)}</p>
                        <p className="text-muted text-xs">{formatTime(tx.created_at)}</p>
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
