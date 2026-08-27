import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../lib/auth'
import { rpcMessage } from '../lib/rpc'

type Mode = 'rent' | 'return'

export default function RentActions({ cafeId, cafeName }: { cafeId: string; cafeName: string }) {
  const { session, profile, signInWithGoogle, refreshProfile } = useAuth()
  const [busy, setBusy] = useState<Mode | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function run(mode: Mode) {
    setBusy(mode)
    setMessage(null)
    setError(null)
    const rpc = mode === 'rent' ? 'rent_cup_for_me' : 'return_cup_for_me'
    const { error: rpcError } = await supabase.rpc(rpc, { p_cafe_id: cafeId })
    setBusy(null)
    if (rpcError) {
      setError(rpcMessage(rpcError))
      return
    }
    await refreshProfile()
    setMessage(
      mode === 'rent'
        ? `Listo, registramos tu renta en ${cafeName}.`
        : `Listo, registramos tu devolución en ${cafeName}.`
    )
  }

  if (!session) {
    return (
      <div className="border border-border p-8 md:p-10 mb-10">
        <h2 className="font-heading text-xl md:text-2xl font-medium text-black mb-3">
          Registrar vaso
        </h2>
        <p className="text-muted text-sm md:text-base leading-relaxed mb-8">
          Entra con Google para registrar la renta o la devolución. El depósito se maneja en la
          cafetería. Aquí solo llevas tu historial.
        </p>
        <button
          type="button"
          onClick={() => void signInWithGoogle().catch((e: Error) => setError(e.message))}
          className="px-8 py-3.5 bg-black text-white text-sm font-medium tracking-wide border-none cursor-pointer hover:bg-black/85 transition-colors duration-300"
        >
          Continuar con Google
        </button>
        {error && <p className="text-muted text-sm mt-4">{error}</p>}
      </div>
    )
  }

  return (
    <div className="border border-black p-8 md:p-10 mb-10">
      <h2 className="font-heading text-xl md:text-2xl font-medium text-black mb-2">
        Registrar vaso
      </h2>
      <p className="text-muted text-sm md:text-base leading-relaxed mb-6">
        {profile
          ? `Tienes ${profile.cups_in_hand} ${profile.cups_in_hand === 1 ? 'vaso' : 'vasos'} en mano.`
          : 'El depósito se maneja en la cafetería. Esto solo guarda tu historial.'}
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          disabled={busy !== null}
          onClick={() => void run('rent')}
          className="px-8 py-3.5 border border-black bg-transparent text-black text-sm font-medium tracking-wide cursor-pointer hover:bg-black hover:text-white transition-colors duration-300 disabled:opacity-50"
        >
          {busy === 'rent' ? 'Registrando…' : 'Rentar'}
        </button>
        <button
          type="button"
          disabled={busy !== null || !profile || profile.cups_in_hand <= 0}
          onClick={() => void run('return')}
          className="px-8 py-3.5 border border-black bg-transparent text-black text-sm font-medium tracking-wide cursor-pointer hover:bg-black hover:text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-default disabled:hover:bg-transparent disabled:hover:text-black"
        >
          {busy === 'return' ? 'Registrando…' : 'Devolver'}
        </button>
      </div>
      {message && <p className="text-black text-sm md:text-base mt-6">{message}</p>}
      {error && <p className="text-muted text-sm md:text-base mt-6">{error}</p>}
    </div>
  )
}
