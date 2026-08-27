import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { consumeAuthNext } from '../lib/auth'

export default function AuthCallback() {
  const navigate = useNavigate()
  const [stuck, setStuck] = useState(false)

  useEffect(() => {
    const next = consumeAuthNext()
    let done = false

    const go = () => {
      if (done) return
      done = true
      navigate(next, { replace: true })
    }

    supabase.auth.getSession().then(({ data }) => {
      if (data.session) go()
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) go()
    })

    const timer = window.setTimeout(() => {
      if (!done) setStuck(true)
    }, 8000)

    return () => {
      listener.subscription.unsubscribe()
      window.clearTimeout(timer)
    }
  }, [navigate])

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="font-heading text-2xl text-black mb-4">erre</p>
        {stuck ? (
          <>
            <p className="text-muted text-base leading-relaxed mb-8">
              No se completó el inicio de sesión. Revisa que Google esté activo en Supabase y que
              esta URL esté en Redirect URLs.
            </p>
            <button
              type="button"
              onClick={() => navigate('/', { replace: true })}
              className="px-8 py-3.5 bg-black text-white text-sm font-medium tracking-wide border-none cursor-pointer"
            >
              Volver
            </button>
          </>
        ) : (
          <p className="text-muted text-base">Entrando…</p>
        )}
      </div>
    </div>
  )
}
