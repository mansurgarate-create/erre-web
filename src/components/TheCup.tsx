import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import FadeIn from './ui/FadeIn'
import { supabase } from '../lib/supabase'

const CUPS_IN_NETWORK = 200

async function countRents(): Promise<number> {
  const { count, error } = await supabase
    .from('transactions')
    .select('id', { count: 'exact', head: true })
    .eq('type', 'rent')

  if (error || count === null) return 0
  return count
}

const specs = [
  { label: 'material', value: 'polipropileno' },
  { label: 'bebidas', value: 'frías y calientes' },
  { label: 'lavado', value: 'a mano o lavavajillas' },
]

export default function TheCup() {
  const [rents, setRents] = useState(0)

  useEffect(() => {
    let cancelled = false
    void countRents().then((n) => {
      if (!cancelled) setRents(n)
    })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section className="bg-black text-white px-4 sm:px-6 py-20 md:py-32">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center gap-12 md:gap-20">
        <FadeIn className="md:flex-1 min-w-0">
          <figure className="m-0 flex flex-col gap-3">
            <img
              src="/images/landing/madriguera-vasos.webp"
              alt="Dos vasos erre sobre una mesa de Madriguera: uno muestra el wordmark y el otro la frase parte de algo más grande"
              width={786}
              height={1400}
              loading="lazy"
              className="w-full h-[420px] md:h-[600px] object-cover object-[50%_60%] block"
            />
            <figcaption className="text-[13px] text-white/70">en Madriguera.</figcaption>
          </figure>
        </FadeIn>

        <FadeIn delay={150} className="md:flex-1 min-w-0">
          <div className="flex flex-col gap-7">
            <p className="text-sm font-medium tracking-[0.02em] text-white/70">el vaso</p>
            <h2 className="font-heading text-[40px] md:text-[72px] font-medium leading-[1.04] tracking-[-0.03em]">
              el mismo vaso, otro café.
            </h2>
            <p className="text-lg leading-relaxed max-w-[38ch]">
              esmerilado, ligero y hecho para durar. pasa de mano en mano y de café en café.
            </p>
            <ul className="list-none m-0 p-0 border-t border-white/20">
              {specs.map((s) => (
                <li key={s.label} className="flex justify-between gap-4 py-3.5 border-b border-white/20 text-[15px]">
                  <span className="text-white/70">{s.label}</span>
                  <span>{s.value}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-x-14 gap-y-8">
              <div>
                <p className="font-heading text-[40px] font-medium tracking-[-0.02em] leading-none">{CUPS_IN_NETWORK}</p>
                <p className="mt-2 text-sm text-white/70">vasos en la red</p>
              </div>
              {rents > 0 && (
                <div>
                  <p className="font-heading text-[40px] font-medium tracking-[-0.02em] leading-none">{rents}</p>
                  <p className="mt-2 text-sm text-white/70">
                    {rents === 1 ? 'vez que un vaso' : 'veces que un vaso'}
                    <br />
                    dio la vuelta
                  </p>
                </div>
              )}
            </div>
            <Link to="/cuidado" className="self-start text-[15px] text-white underline underline-offset-4 py-1">
              cuidado del vaso
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
