import { useEffect, useState } from 'react'
import FadeIn from './ui/FadeIn'
import { supabase } from '../lib/supabase'

async function countVisibleCafes(): Promise<number> {
  const { count, error } = await supabase
    .from('cafes')
    .select('id', { count: 'exact', head: true })
    .eq('visible_on_map', true)

  if (!error && count !== null) return count

  const res = await fetch('/data/cafes.json')
  const json = (await res.json()) as unknown[]
  return json.length
}

async function countAvoidedCups(): Promise<number> {
  const { count, error } = await supabase
    .from('transactions')
    .select('id', { count: 'exact', head: true })
    .eq('type', 'rent')

  if (error || count === null) return 0
  return count
}

export default function CommunityImpact() {
  const [avoided, setAvoided] = useState(0)
  const [cafes, setCafes] = useState(0)

  useEffect(() => {
    let cancelled = false
    async function load() {
      const [nextAvoided, nextCafes] = await Promise.all([
        countAvoidedCups(),
        countVisibleCafes(),
      ])
      if (cancelled) return
      setAvoided(nextAvoided)
      setCafes(nextCafes)
    }
    void load()
    return () => {
      cancelled = true
    }
  }, [])

  const stats = [
    { value: '200', label: 'Vasos en la red' },
    { value: `+${avoided}`, label: 'Vasos desechables evitados' },
    { value: `+${cafes}`, label: 'Cafeterías participantes' },
  ]

  return (
    <section className="px-6 py-24 md:py-32">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <h2 className="font-heading text-3xl md:text-5xl font-medium text-black text-center mb-16 md:mb-20">
            Impacto colectivo
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 text-center">
          {stats.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 150}>
              <div>
                <span className="font-heading text-5xl md:text-7xl font-medium text-black block">
                  {stat.value}
                </span>
                <span className="text-muted text-sm md:text-base mt-3 block tracking-wide">
                  {stat.label}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
