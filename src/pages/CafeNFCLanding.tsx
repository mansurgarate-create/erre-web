import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import FadeIn from '../components/ui/FadeIn'
import Closing from '../components/Closing'
import Footer from '../components/Footer'
import SiteHeader from '../components/SiteHeader'
import PageLoading from '../components/ui/PageLoading'
import { supabase } from '../lib/supabase'
import InstagramHandle, { HoursPill } from '../components/InstagramHandle'

interface RecommendedItem {
  nombre: string
  descripcion: string
  imagen_url: string | null
}

interface RecommendedItems {
  drinks?: RecommendedItem[]
  food?: RecommendedItem[]
}

interface CafeInfo {
  id: string
  name: string
  address: string
  hours: string
  mapsUrl: string | null
  city: string
  instagram: string | null
  logoUrl: string | null
  bannerUrl: string | null
  menuUrl: string | null
  recommendedItems: RecommendedItems | null
}

type CafeRow = {
  id: string
  name: string
  address: string
  hours: string
  maps_url: string | null
  city: string
  nfc_tag_id: string
  instagram: string | null
  logo_url: string | null
  banner_url: string | null
  menu_url: string | null
  recommended_items: RecommendedItems | null
}

function toCafeInfo(data: CafeRow): CafeInfo {
  return {
    id: data.id,
    name: data.name,
    address: data.address,
    hours: data.hours,
    mapsUrl: data.maps_url,
    city: data.city,
    instagram: data.instagram,
    logoUrl: data.logo_url,
    bannerUrl: data.banner_url,
    menuUrl: data.menu_url,
    recommendedItems: data.recommended_items,
  }
}

type LoadResult =
  | { status: 'cafe'; cafe: CafeRow }
  | { status: 'inactive' }
  | { status: 'missing' }

async function loadBySlug(slug: string): Promise<LoadResult> {
  const cafeSelect =
    'id, name, address, hours, maps_url, city, nfc_tag_id, instagram, logo_url, banner_url, menu_url, recommended_items'

  const { data: entry, error: entryError } = await supabase
    .from('entry_codes')
    .select('cafe_id')
    .eq('code', slug)
    .maybeSingle()

  if (!entryError && entry) {
    if (!entry.cafe_id) return { status: 'inactive' }

    const { data, error } = await supabase
      .from('cafes')
      .select(cafeSelect)
      .eq('id', entry.cafe_id)
      .maybeSingle()
    if (!error && data) return { status: 'cafe', cafe: data as CafeRow }
    return { status: 'missing' }
  }

  const { data, error } = await supabase
    .from('cafes')
    .select(cafeSelect)
    .eq('nfc_tag_id', `erre:${slug}`)
    .maybeSingle()

  if (error || !data) return { status: 'missing' }
  return { status: 'cafe', cafe: data as CafeRow }
}

async function loadImpactCount(cafeId: string): Promise<number> {
  const { count, error } = await supabase
    .from('transactions')
    .select('*', { count: 'exact', head: true })
    .eq('cafe_id', cafeId)
    .eq('type', 'rent')

  if (error || count === null) return 0
  return count
}

function CafeBanner({ cafe }: { cafe: CafeInfo }) {
  return (
    <div className="relative w-full" style={{ aspectRatio: '16/7' }}>
      {cafe.bannerUrl ? (
        <img
          src={cafe.bannerUrl}
          alt={`${cafe.name} banner`}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-wash" />
      )}
      <div className="absolute -bottom-10 left-6 md:left-10">
        {cafe.logoUrl ? (
          <img
            src={cafe.logoUrl}
            alt={`${cafe.name} logo`}
            className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-4 border-white bg-white"
          />
        ) : (
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white bg-wash flex items-center justify-center">
            <span className="font-heading text-2xl md:text-3xl font-medium text-muted">
              {cafe.name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

function RecommendedSection({ items }: { items: RecommendedItems }) {
  const drinks = items.drinks?.filter((d) => d.nombre) ?? []
  const food = items.food?.filter((f) => f.nombre) ?? []
  if (drinks.length === 0 && food.length === 0) return null

  const all = [...drinks, ...food]

  return (
    <div className="rounded-2xl bg-wash p-8 md:p-10">
      <h2 className="font-heading text-xl md:text-2xl font-medium text-black mb-2">
        Recomendados por erre
      </h2>
      <p className="text-muted text-sm md:text-base mb-8">
        Pídelos en vaso erre.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {all.map((item) => (
          <div key={item.nombre}>
            {item.imagen_url && (
              <img
                src={item.imagen_url}
                alt={item.nombre}
                className="w-full aspect-square object-cover rounded-xl mb-4"
              />
            )}
            <h3 className="font-heading text-lg md:text-xl font-medium text-black mb-2">
              {item.nombre}
            </h3>
            <p className="text-muted text-sm md:text-base leading-relaxed">
              {item.descripcion}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function CafeNFCLanding() {
  const { slug = '' } = useParams<{ slug: string }>()
  const [cafe, setCafe] = useState<CafeInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [inactive, setInactive] = useState(false)
  const [impactCount, setImpactCount] = useState(0)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setNotFound(false)
      setInactive(false)

      try {
        const result = await loadBySlug(slug)

        if (cancelled) return

        if (result.status === 'cafe') {
          const info = toCafeInfo(result.cafe)
          setCafe(info)
          loadImpactCount(info.id).then((count) => {
            if (!cancelled) setImpactCount(count)
          })
        } else if (result.status === 'inactive') {
          setInactive(true)
          setCafe(null)
        } else {
          setNotFound(true)
          setCafe(null)
        }
      } catch {
        if (!cancelled) {
          setNotFound(true)
          setCafe(null)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    if (slug) {
      load()
    } else {
      setNotFound(true)
      setLoading(false)
    }

    return () => {
      cancelled = true
    }
  }, [slug])

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />

      <main className="pb-8 md:pb-12">
        <div className="max-w-3xl mx-auto">
          {loading ? (
            <div className="px-6">
              <PageLoading />
            </div>
          ) : (
            <FadeIn appear>
              {inactive ? (
                <div className="px-6">
                  <h1 className="font-heading text-3xl md:text-5xl font-medium text-black leading-tight tracking-tight mb-6">
                    punto erre
                  </h1>
                  <p className="text-muted text-base md:text-lg leading-relaxed mb-10">
                    Este punto erre aún no está activo.
                  </p>
                  <Link to="/#cafeterias" className="erre-btn">
                    Ver la red erre
                  </Link>
                </div>
              ) : notFound || !cafe ? (
                <div className="px-6">
                  <h1 className="font-heading text-3xl md:text-5xl font-medium text-black leading-tight tracking-tight mb-6">
                    punto erre
                  </h1>
                  <p className="text-muted text-base md:text-lg leading-relaxed mb-10">
                    No encontramos esta cafetería. Revisa el mapa de la red erre.
                  </p>
                  <Link to="/#cafeterias" className="erre-btn">
                    Ver la red erre
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-10">
                  {/* 1. Banner + logo */}
                  <CafeBanner cafe={cafe} />

                  {/* Info + Instagram + Impact */}
                  <div className="px-6 md:px-10 pt-4">
                    <p className="text-muted text-xs md:text-sm mb-3">
                      punto erre
                    </p>
                    <h1 className="font-heading text-3xl md:text-5xl font-medium text-black leading-tight tracking-tight mb-4">
                      {cafe.name}
                    </h1>
                    {(cafe.hours.trim() || cafe.instagram) && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {cafe.hours.trim() ? <HoursPill hours={cafe.hours} /> : null}
                        {cafe.instagram ? <InstagramHandle handle={cafe.instagram} /> : null}
                      </div>
                    )}
                    {impactCount > 0 && (
                      <div className="flex items-baseline gap-2.5 rounded-2xl bg-wash px-5 py-5">
                        <span className="font-heading text-[32px] font-medium text-black leading-none">
                          {impactCount}
                        </span>
                        <span className="text-sm text-muted">
                          {impactCount === 1
                            ? 'vaso desechable evitado'
                            : 'vasos desechables evitados'}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* 4. Recomendados */}
                  {cafe.recommendedItems && (
                    <div className="px-6 md:px-10">
                      <RecommendedSection items={cafe.recommendedItems} />
                    </div>
                  )}

                  {/* 5. Menu link */}
                  {cafe.menuUrl && (
                    <div className="px-6 md:px-10">
                      <a
                        href={cafe.menuUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="erre-btn"
                      >
                        Ver menú completo
                      </a>
                    </div>
                  )}

                  {/* Primera vez */}
                  <div className="px-6 md:px-10">
                    <p className="text-muted/70 text-xs md:text-sm leading-relaxed">
                      ¿Primera vez? Pide tu bebida en vaso erre, deja $30 de depósito y recupéralo al devolverlo.{' '}
                      <a
                        href="https://holaerre.com/#como-funciona"
                        className="text-muted/70 underline hover:text-muted transition-colors duration-300"
                      >
                        Saber más
                      </a>
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="px-6 md:px-10 flex flex-wrap gap-3">
                    {cafe.mapsUrl && (
                      <a
                        href={cafe.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="erre-btn"
                      >
                        Abrir en Maps
                      </a>
                    )}
                    <Link
                      to="/#cafeterias"
                      className="erre-btn"
                    >
                      Ver la red erre
                    </Link>
                  </div>

                  <div className="px-6 md:px-10">
                    <p className="text-muted text-sm md:text-base leading-relaxed mb-3">
                      ¿Algo que contar de este punto erre? Escríbenos:
                    </p>
                    <Link to={`/r/${slug}/feedback`} className="erre-btn">
                      Enviar comentarios
                    </Link>
                  </div>

                  {/* Footer link */}
                  <div className="px-6 md:px-10 text-center pt-2">
                    <a
                      href="https://holaerre.com"
                      className="text-muted text-sm no-underline hover:text-black transition-colors duration-300"
                    >
                      holaerre.com
                    </a>
                  </div>
                </div>
              )}
            </FadeIn>
          )}
        </div>
      </main>

      {loading ? null : <Closing />}
      <Footer />
    </div>
  )
}
