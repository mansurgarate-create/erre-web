import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import FadeIn from '../components/ui/FadeIn'
import Footer from '../components/Footer'
import SiteHeader from '../components/SiteHeader'
import PageLoading from '../components/ui/PageLoading'
import { supabase } from '../lib/supabase'
import { slugFromNfcTag } from '../lib/puntoSlug'
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

function CafeLogo({ cafe }: { cafe: CafeInfo }) {
  return cafe.logoUrl ? (
    <img
      src={cafe.logoUrl}
      alt={`${cafe.name} logo`}
      className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-4 border-white bg-white"
    />
  ) : (
    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-border bg-white flex items-center justify-center">
      <span className="font-heading text-2xl md:text-3xl font-medium text-black">
        {cafe.name.charAt(0).toUpperCase()}
      </span>
    </div>
  )
}

function CafeBanner({ cafe }: { cafe: CafeInfo }) {
  // Sin banner no dibujamos un bloque gris vacío: solo el logo.
  if (!cafe.bannerUrl) {
    return (
      <div className="px-4 sm:px-6 md:px-10 pt-10 md:pt-14 -mb-6">
        <CafeLogo cafe={cafe} />
      </div>
    )
  }
  return (
    <div className="relative w-full" style={{ aspectRatio: '16/7' }}>
      <img src={cafe.bannerUrl} alt={`${cafe.name} banner`} className="w-full h-full object-cover" />
      <div className="absolute -bottom-10 left-6 md:left-10">
        <CafeLogo cafe={cafe} />
      </div>
    </div>
  )
}

function RecCard({ item }: { item: RecommendedItem }) {
  return (
    <div className="shrink-0 w-[72%] sm:w-[46%] snap-start flex flex-col gap-3">
      <div className="aspect-[4/5] overflow-hidden border border-border bg-border">
        {item.imagen_url ? (
          <img
            src={item.imagen_url}
            alt={item.nombre}
            loading="lazy"
            className="w-full h-full max-w-none object-cover object-center"
          />
        ) : null}
      </div>
      <div>
        <p className="font-heading text-base font-medium text-black m-0">{item.nombre}</p>
        {item.descripcion ? (
          <p className="text-sm text-muted m-0 mt-1 line-clamp-2">{item.descripcion}</p>
        ) : null}
      </div>
    </div>
  )
}

function RecsCarousel({ title, items }: { title: string; items: RecommendedItem[] }) {
  return (
    <div>
      <h3 className="font-heading text-base font-medium text-black px-4 sm:px-6 md:px-10 mb-3 mt-5">
        {title}
      </h3>
      <div className="flex gap-3 overflow-x-auto px-4 sm:px-6 md:px-10 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((item) => (
          <RecCard key={item.nombre} item={item} />
        ))}
      </div>
    </div>
  )
}

function RecommendedSection({ items }: { items: RecommendedItems }) {
  const drinks = items.drinks?.filter((d) => d.nombre) ?? []
  const food = items.food?.filter((f) => f.nombre) ?? []
  if (drinks.length === 0 && food.length === 0) return null

  return (
    <div>
      <h2 className="font-heading text-lg font-medium text-black px-4 sm:px-6 md:px-10">
        recomendaciones erre
      </h2>
      {drinks.length > 0 ? <RecsCarousel title="bebidas" items={drinks} /> : null}
      {food.length > 0 ? <RecsCarousel title="comida" items={food} /> : null}
    </div>
  )
}

export default function CafeNFCLanding() {
  const { slug = '' } = useParams<{ slug: string }>()
  const navigate = useNavigate()
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
      let redirected = false

      try {
        const result = await loadBySlug(slug)

        if (cancelled) return

        if (result.status === 'cafe') {
          const canonical = slugFromNfcTag(result.cafe.nfc_tag_id)
          if (canonical && canonical !== slug) {
            redirected = true
            navigate(`/r/${canonical}`, { replace: true })
            return
          }
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
        if (!cancelled && !redirected) setLoading(false)
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
  }, [slug, navigate])

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />

      <main className="pb-8 md:pb-12">
        <div className="max-w-3xl mx-auto">
          {loading ? (
            <div className="px-4 sm:px-6">
              <PageLoading />
            </div>
          ) : (
            <FadeIn appear>
              {inactive ? (
                <div className="px-4 sm:px-6">
                  <h1 className="font-heading text-3xl md:text-5xl font-medium text-black leading-tight tracking-tight mb-6">
                    punto erre
                  </h1>
                  <p className="text-muted text-base md:text-lg leading-relaxed mb-10">
                    este punto erre aún no está activo.
                  </p>
                  <Link to="/#cafeterias" className="erre-btn">
                    ver la red erre
                  </Link>
                </div>
              ) : notFound || !cafe ? (
                <div className="px-4 sm:px-6">
                  <h1 className="font-heading text-3xl md:text-5xl font-medium text-black leading-tight tracking-tight mb-6">
                    punto erre
                  </h1>
                  <p className="text-muted text-base md:text-lg leading-relaxed mb-10">
                    no encontramos este café. búscalo en el mapa de la red erre.
                  </p>
                  <Link to="/#cafeterias" className="erre-btn">
                    ver la red erre
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-10">
                  {/* 1. Banner + logo */}
                  <CafeBanner cafe={cafe} />

                  {/* Info + Instagram + Impact */}
                  <div className="px-4 sm:px-6 md:px-10 pt-4">
                    <p className="erre-eyebrow mb-3">punto erre</p>
                    <h1 className="font-heading text-3xl md:text-5xl font-medium text-black leading-tight tracking-tight mb-4">
                      {cafe.name}
                    </h1>
                    {(cafe.hours.trim() || cafe.instagram || impactCount > 0) && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {cafe.hours.trim() ? <HoursPill hours={cafe.hours} /> : null}
                        {cafe.instagram ? <InstagramHandle handle={cafe.instagram} /> : null}
                        {impactCount > 0 ? (
                          <span className="inline-flex items-baseline gap-1 text-sm border border-border px-3 py-2">
                            <span className="font-heading font-medium text-black leading-none">
                              {impactCount}
                            </span>
                            <span className="text-muted">
                              {impactCount === 1
                                ? 'vaso desechable evitado'
                                : 'vasos desechables evitados'}
                            </span>
                          </span>
                        ) : null}
                      </div>
                    )}
                  </div>

                  {/* 4. Recomendados */}
                  {cafe.recommendedItems && (
                    <RecommendedSection items={cafe.recommendedItems} />
                  )}

                  {cafe.menuUrl && (
                    <div className="px-4 sm:px-6 md:px-10">
                      <a
                        href={cafe.menuUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="erre-cta"
                      >
                        ver menú completo
                      </a>
                    </div>
                  )}

                  <div className="h-px bg-border mx-4 sm:mx-6 md:mx-10" />

                  <div className="px-4 sm:px-6 md:px-10 flex flex-wrap gap-3">
                    {cafe.mapsUrl && (
                      <a
                        href={cafe.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="erre-btn"
                      >
                        abrir en Maps
                      </a>
                    )}
                    <Link
                      to="/#cafeterias"
                      className="erre-btn"
                    >
                      ver la red erre
                    </Link>
                  </div>

                  <div className="h-px bg-border mx-4 sm:mx-6 md:mx-10" />

                  <div className="px-4 sm:px-6 md:px-10">
                    <p className="text-muted text-sm md:text-base leading-relaxed mb-3">
                      ¿algo que contar de este punto erre? escríbenos.
                    </p>
                    <Link to={`/r/${slug}/feedback`} className="erre-btn">
                      enviar comentarios
                    </Link>
                  </div>
                </div>
              )}
            </FadeIn>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
