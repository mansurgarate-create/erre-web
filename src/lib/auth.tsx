import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from './supabase'

const NEXT_KEY = 'erre_auth_next'

export type WebProfile = {
  id: string
  name: string | null
  email: string | null
  cups_in_hand: number
}

type AuthContextValue = {
  session: Session | null
  profile: WebProfile | null
  loading: boolean
  signInWithGoogle: (nextPath?: string) => Promise<void>
  signInWithApple: (nextPath?: string) => Promise<void>
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<WebProfile | null>(null)
  const [loading, setLoading] = useState(true)

  const loadProfile = useCallback(async (active: Session | null) => {
    if (!active) {
      setProfile(null)
      return
    }
    const { data, error } = await supabase.rpc('ensure_web_user')
    if (error || !data) {
      setProfile(null)
      return
    }
    const row = (typeof data === 'string' ? JSON.parse(data) : data) as WebProfile
    setProfile({
      id: row.id,
      name: row.name ?? null,
      email: row.email ?? null,
      cups_in_hand: row.cups_in_hand ?? 0,
    })
  }, [])

  useEffect(() => {
    let cancelled = false

    supabase.auth.getSession().then(({ data }) => {
      if (cancelled) return
      setSession(data.session)
      loadProfile(data.session).finally(() => {
        if (!cancelled) setLoading(false)
      })
    })

    const { data: listener } = supabase.auth.onAuthStateChange((event, next) => {
      if (event === 'INITIAL_SESSION') return
      setSession(next)
      void loadProfile(next)
    })

    return () => {
      cancelled = true
      listener.subscription.unsubscribe()
    }
  }, [loadProfile])

  const signInWithOAuth = useCallback(async (provider: 'google' | 'apple', nextPath?: string) => {
    sessionStorage.setItem(NEXT_KEY, nextPath ?? `${window.location.pathname}${window.location.search}`)
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: provider === 'google' ? { prompt: 'select_account' } : undefined,
      },
    })
    if (error) throw error
  }, [])

  const signInWithGoogle = useCallback(
    (nextPath?: string) => signInWithOAuth('google', nextPath),
    [signInWithOAuth]
  )

  const signInWithApple = useCallback(
    (nextPath?: string) => signInWithOAuth('apple', nextPath),
    [signInWithOAuth]
  )

  const signOut = useCallback(async () => {
    await supabase.auth.signOut()
    setProfile(null)
  }, [])

  const refreshProfile = useCallback(async () => {
    await loadProfile(session)
  }, [loadProfile, session])

  const value = useMemo(
    () => ({
      session,
      profile,
      loading,
      signInWithGoogle,
      signInWithApple,
      signOut,
      refreshProfile,
    }),
    [session, profile, loading, signInWithGoogle, signInWithApple, signOut, refreshProfile]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export function consumeAuthNext(): string {
  const next = sessionStorage.getItem(NEXT_KEY)
  sessionStorage.removeItem(NEXT_KEY)
  if (!next || !next.startsWith('/') || next.startsWith('//')) return '/'
  return next
}
