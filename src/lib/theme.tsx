import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { useLocation } from 'react-router-dom'

export type ThemePref = 'system' | 'light' | 'dark'
export type ResolvedTheme = 'light' | 'dark'

const STORAGE_KEY = 'erre-theme'

type ThemeContextValue = {
  pref: ThemePref
  resolved: ResolvedTheme
  setPref: (next: ThemePref) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function readPref(): ThemePref {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark' || stored === 'system') return stored
  } catch {
    /* private mode */
  }
  return 'system'
}

function systemDark() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function paint(resolved: ResolvedTheme) {
  document.documentElement.dataset.theme = resolved
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute('content', resolved === 'dark' ? '#141413' : '#FAFAF8')
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  const [pref, setPrefState] = useState<ThemePref>(readPref)
  const [systemIsDark, setSystemIsDark] = useState(systemDark)
  const printLight = pathname === '/qr'
  const resolved: ResolvedTheme = printLight
    ? 'light'
    : pref === 'light'
      ? 'light'
      : pref === 'dark'
        ? 'dark'
        : systemIsDark
          ? 'dark'
          : 'light'

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => setSystemIsDark(media.matches)
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    paint(resolved)
  }, [resolved])

  const setPref = useCallback((next: ThemePref) => {
    setPrefState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* private mode */
    }
  }, [])

  const value = useMemo(() => ({ pref, resolved, setPref }), [pref, resolved, setPref])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
