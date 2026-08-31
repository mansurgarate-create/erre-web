import { useEffect, useMemo, useState } from 'react'
import FadeIn from '../components/ui/FadeIn'
import PageLoading from '../components/ui/PageLoading'
import SiteHeader from '../components/SiteHeader'
import Footer from '../components/Footer'
import { supabase } from '../lib/supabase'
import { useAuth } from '../lib/auth'
import { rpcMessage } from '../lib/rpc'

const PAGE_SIZE = 8

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
  const { session, profile, loading, signInWithGoogle, signInWithApple, signOut } = useAuth()
  const [transactions, setTransactions] = useState<Tx[]>([])
  const [historyError, setHistoryError] = useState<string | null>(null)
  const [historyReady, setHistoryReady] = useState(false)
  const [page, setPage] = useState(0)
  const [avoidedCount, setAvoidedCount] = useState(0)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (loading) return

    if (!session) {
      setTransactions([])
      setPage(0)
      setHistoryError(null)
      setHistoryReady(true)
      setAvoidedCount(0)
      return
    }

    let cancelled = false
    setHistoryReady(false)
    async function load() {
      const { data, error } = await supabase.rpc('my_web_account')
      if (cancelled) return
      if (error || !data) {
        setHistoryError(rpcMessage(error))
        setTransactions([])
        setHistoryReady(true)
        return
      }
      const payload = (typeof data === 'string' ? JSON.parse(data) : data) as {
        transactions?: Tx[]
      }
      setTransactions(payload.transactions ?? [])
      setPage(0)
      setHistoryError(null)
      setHistoryReady(true)
    }
    void load()
    return () => {
      cancelled = true
    }
  }, [loading, session])

  useEffect(() => {
    const userId = profile?.id
    if (!session || !userId) {
      setAvoidedCount(0)
      return
    }
    let cancelled = false
    async function loadImpact() {
      const { count, error } = await supabase
        .from('transactions')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', userId)
        .eq('type', 'rent')
      if (cancelled) return
      setAvoidedCount(error || count === null ? 0 : count)
    }
    void loadImpact()
    return () => {
      cancelled = true
    }
  }, [session, profile?.id])

  const pageCount = Math.max(1, Math.ceil(transactions.length / PAGE_SIZE))
  const currentPage = Math.min(page, pageCount - 1)
  const visibleTx = useMemo(
    () => transactions.slice(currentPage * PAGE_SIZE, currentPage * PAGE_SIZE + PAGE_SIZE),
    [transactions, currentPage]
  )
  const ready = !loading && historyReady

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <SiteHeader />
      <main className="px-6 pb-24 md:pb-32 flex-1">
        <div className="max-w-3xl mx-auto">
          {ready ? (
            <FadeIn appear>
              <h1 className="font-heading text-3xl md:text-5xl font-medium text-black leading-tight tracking-tight mb-6">
                Cuenta
              </h1>

              {!session ? (
                <>
                  <p className="text-muted text-base md:text-lg leading-relaxed mb-8">
                    Entra con Google o Apple para ver tu historial de vasos erre.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      type="button"
                      onClick={() => void signInWithGoogle('/cuenta')}
                      className="erre-btn erre-btn-row"
                    >
                      <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden>
                        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                        <path fill="#FBBC05" d="M10.53 28.59a14.5 14.5 0 0 1 0-9.18l-7.98-6.19a24.08 24.08 0 0 0 0 21.56l7.98-6.19z"/>
                        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                      </svg>
                      Continuar con Google
                    </button>
                    <button
                      type="button"
                      onClick={() => void signInWithApple('/cuenta')}
                      className="erre-btn erre-btn-row"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                        <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                      </svg>
                      Continuar con Apple
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-8">
                    {profile?.name ? (
                      <p className="font-heading text-xl md:text-2xl font-medium text-black mb-1">
                        {profile.name}
                      </p>
                    ) : null}
                    {profile?.email || !profile?.name ? (
                      <p className="text-muted text-sm md:text-base">
                        {profile?.email || 'Sesión iniciada'}
                      </p>
                    ) : null}
                  </div>

                  <div className="flex flex-col gap-4 mb-10">
                    <p className="inline-flex items-baseline gap-1.5 w-full rounded-full bg-impact-wash px-4 py-3">
                      <span className="font-heading text-[22px] font-medium text-impact leading-none">
                        {avoidedCount}
                      </span>
                      <span className="text-muted text-[13px]">
                        {avoidedCount === 1
                          ? 'vaso desechable evitado'
                          : 'vasos desechables evitados'}
                      </span>
                    </p>
                    <div className="rounded-2xl border border-border p-6">
                      <p className="text-muted text-[13px] mb-2">Vasos en mano</p>
                      <p className="font-heading text-[44px] font-medium text-black leading-none mb-2">
                        {profile?.cups_in_hand ?? 0}
                      </p>
                      <p className="text-muted text-[13px]">vasos rentados actualmente</p>
                    </div>
                  </div>

                  <h2 className="font-heading text-xl md:text-2xl font-medium text-black mb-6">
                    Historial
                  </h2>
                  {historyError && <p className="text-muted text-sm mb-4">{historyError}</p>}
                  {transactions.length === 0 && !historyError ? (
                    <p className="text-muted text-sm md:text-base">Aún no hay rentas registradas.</p>
                  ) : (
                    <>
                      <FadeIn appear key={currentPage}>
                        <ul
                          className="divide-y divide-border border-t border-border"
                          style={{ minHeight: `calc(${PAGE_SIZE} * 4.75rem)` }}
                        >
                          {visibleTx.map((tx) => (
                            <li key={tx.id} className="min-h-[4.75rem] py-4 flex items-center gap-4">
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
                      </FadeIn>
                      {transactions.length > PAGE_SIZE && (
                        <div className="flex items-center justify-between gap-4 mt-6">
                          <button
                            type="button"
                            disabled={currentPage === 0}
                            onClick={() => setPage((p) => Math.max(0, p - 1))}
                            className="text-sm text-black bg-transparent border-none cursor-pointer disabled:text-muted disabled:cursor-default p-0"
                          >
                            Anterior
                          </button>
                          <p className="text-muted text-xs">
                            {currentPage + 1} / {pageCount}
                          </p>
                          <button
                            type="button"
                            disabled={currentPage >= pageCount - 1}
                            onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
                            className="text-sm text-black bg-transparent border-none cursor-pointer disabled:text-muted disabled:cursor-default p-0"
                          >
                            Siguiente
                          </button>
                        </div>
                      )}
                    </>
                  )}

                  <div className="mt-16 pt-8 border-t border-border">
                    <button
                      type="button"
                      onClick={() => void signOut()}
                      className="text-sm text-muted bg-transparent border-none cursor-pointer hover:text-black transition-colors duration-300 p-0"
                    >
                      Cerrar sesión
                    </button>
                  </div>
                </>
              )}
            </FadeIn>
          ) : (
            <PageLoading />
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
