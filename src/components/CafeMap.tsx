import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, ZoomControl, useMap, useMapEvents } from 'react-leaflet'
import L, { LatLngBounds } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import FadeIn from './ui/FadeIn'
import { supabase } from '../lib/supabase'
import { useTheme } from '../lib/theme'

interface Cafe {
  name: string
  city: string
  address: string
  lat: number
  lng: number
  mapsUrl: string
  hours: string
  slug: string | null
  instagram: string | null
  logoUrl: string | null
}

interface SupabaseCafe {
  name: string
  city: string
  address: string
  lat: number
  lng: number
  maps_url: string
  hours: string
  nfc_tag_id: string | null
  instagram: string | null
  logo_url: string | null
}

const MB_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN as string
const MB_LIGHT = `https://api.mapbox.com/styles/v1/mapbox/light-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${MB_TOKEN}`
const MB_DARK = `https://api.mapbox.com/styles/v1/mapbox/dark-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${MB_TOKEN}`

const ALL = 'todos'

const pinIcon = L.divIcon({
  className: 'erre-pin',
  html: '<span></span>',
  iconSize: [36, 36],
  iconAnchor: [18, 18],
})

const activePinIcon = L.divIcon({
  className: 'erre-pin erre-pin-active',
  html: '<span></span>',
  iconSize: [40, 40],
  iconAnchor: [20, 20],
})

const MOBILE_LIST_LIMIT = 4

function isTouchDevice() {
  return typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches
}

function isNarrow() {
  return typeof window !== 'undefined' && window.innerWidth < 768
}

function slugFromTag(nfcTagId: string | null) {
  if (!nfcTagId?.startsWith('erre:')) return null
  return nfcTagId.slice('erre:'.length)
}

function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
}

function FitMapBounds({ cafes }: { cafes: Pick<Cafe, 'lat' | 'lng'>[] }) {
  const map = useMap()

  useEffect(() => {
    if (cafes.length === 0) return
    const bounds = new LatLngBounds(cafes.map((c) => [c.lat, c.lng]))
    map.fitBounds(bounds, { padding: [48, 48], maxZoom: 16 })
  }, [cafes, map])

  return null
}

function FlyToSelected({ cafe }: { cafe: Cafe | null }) {
  const map = useMap()

  useEffect(() => {
    if (!cafe) return
    map.flyTo([cafe.lat, cafe.lng], Math.max(map.getZoom(), 15), { duration: 0.6 })
  }, [cafe, map])

  return null
}

// En pantallas táctiles el mapa no se arrastra hasta que lo tocas: así el dedo
// puede seguir bajando por la página sin quedarse atrapado en el mapa.
function ActivateDragOnTap({ active, onActivate }: { active: boolean; onActivate: () => void }) {
  const map = useMap()

  useEffect(() => {
    if (active) map.dragging.enable()
  }, [active, map])

  useMapEvents({
    click: () => {
      if (!active) onActivate()
    },
  })
  return null
}

function ClearSelectionOnMapClick({ onClear }: { onClear: () => void }) {
  useMapEvents({
    click: () => onClear(),
  })
  return null
}

export default function CafeMap() {
  const [cafes, setCafes] = useState<Cafe[]>([])
  const [search, setSearch] = useState('')
  const [city, setCity] = useState(ALL)
  const [selected, setSelected] = useState<Cafe | null>(null)
  const [loaded, setLoaded] = useState(false)
  const [showAll, setShowAll] = useState(false)
  const [touch] = useState(isTouchDevice)
  const [dragActive, setDragActive] = useState(() => !isTouchDevice())
  const mapBoxRef = useRef<HTMLDivElement>(null)

  function selectFromList(cafe: Cafe) {
    setSelected(cafe)
    // En celular la lista queda debajo del mapa: sube para que se vea el pin elegido.
    if (isNarrow()) mapBoxRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  const { resolved } = useTheme()
  const dark = resolved === 'dark'

  useEffect(() => {
    async function fetchCafes() {
      try {
        const { data, error } = await supabase
          .from('cafes')
          .select('name, city, address, lat, lng, maps_url, hours, nfc_tag_id, instagram, logo_url')
          .eq('visible_on_map', true)

        if (error || !data || data.length === 0) throw new Error('Supabase fetch failed')

        setCafes(
          (data as SupabaseCafe[]).map((c) => ({
            name: c.name,
            city: c.city,
            address: c.address,
            lat: c.lat,
            lng: c.lng,
            mapsUrl: c.maps_url,
            hours: c.hours,
            slug: slugFromTag(c.nfc_tag_id),
            instagram: c.instagram,
            logoUrl: c.logo_url,
          }))
        )
      } catch {
        const res = await fetch('/data/cafes.json')
        const json = (await res.json()) as Cafe[]
        setCafes(
          json.map((c) => ({
            ...c,
            slug: c.slug ?? null,
            instagram: c.instagram ?? null,
            logoUrl: c.logoUrl ?? null,
          }))
        )
      }
    }
    void fetchCafes().finally(() => setLoaded(true))
  }, [])

  // Las zonas salen de los datos: un café en una ciudad nueva agrega su filtro solo.
  const cities = useMemo(() => {
    const unique = Array.from(new Set(cafes.map((c) => c.city).filter(Boolean)))
    return unique.sort((a, b) => a.localeCompare(b, 'es'))
  }, [cafes])

  const filtered = useMemo(() => {
    const q = normalize(search.trim())
    return cafes
      .filter((c) => city === ALL || c.city === city)
      .filter((c) => !q || normalize(`${c.name} ${c.address} ${c.city}`).includes(q))
      .sort((a, b) => a.name.localeCompare(b.name, 'es'))
  }, [cafes, search, city])

  const visibleNames = useMemo(() => new Set(filtered.map((c) => c.name)), [filtered])

  const cityLabel = cities.length > 1 ? cities.slice(0, -1).join(', ') + ' y ' + cities[cities.length - 1] : cities[0]

  return (
    <section id="cafeterias" className="border-t border-border px-4 sm:px-6 py-20 md:py-28 scroll-mt-16">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-8 mb-8">
            <div>
              <p className="erre-eyebrow mb-4">la red</p>
              <h2 className="font-heading text-[32px] md:text-[52px] font-medium text-black leading-[1.1] tracking-[-0.02em]">
                cafés erre cerca de ti
              </h2>
            </div>
            {cafes.length > 0 && (
              <p className="text-base leading-normal max-w-[34ch]">
                pide en uno, devuelve en cualquiera. hoy somos{' '}
                <span className="font-medium">{cafes.length} cafés</span>
                {cityLabel ? ` en ${cityLabel}` : ''}.
              </p>
            )}
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="flex flex-col md:flex-row md:items-end gap-3 md:gap-6 mb-5">
            <label className="flex-1 flex flex-col gap-1.5 text-[13px] text-muted">
              busca por café o colonia
              <input
                type="search"
                placeholder="ej. Roma, Tec, Mood"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-12 px-4 border border-black bg-white text-base font-sans font-light text-black placeholder:text-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
              />
            </label>
            {cities.length > 1 && (
              <div role="group" aria-label="Filtrar por zona" className="flex flex-wrap gap-2">
                {[ALL, ...cities].map((c) => {
                  const on = city === c
                  return (
                    <button
                      key={c}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setCity(c)}
                      className={`min-h-11 px-4 border border-black text-sm cursor-pointer transition-colors duration-200 ${
                        on ? 'bg-black text-white font-medium' : 'bg-transparent text-black font-light hover:bg-black/5'
                      }`}
                    >
                      {c}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <div className="flex flex-col md:flex-row border border-black">
            <div className="relative md:flex-[2] min-w-0">
              <div
                ref={mapBoxRef}
                className="relative h-[360px] md:h-[560px] overflow-hidden scroll-mt-20"
                style={{ isolation: 'isolate' }}
              >
                <MapContainer
                  key={resolved}
                  center={[25.651, -100.294]}
                  zoom={15}
                  maxZoom={20}
                  scrollWheelZoom={false}
                  dragging={!touch}
                  zoomControl={false}
                  style={{ height: '100%', width: '100%', background: 'var(--color-white)' }}
                >
                  <ZoomControl position="topright" />
                  <TileLayer
                    attribution='&copy; <a href="https://www.mapbox.com/">Mapbox</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url={dark ? MB_DARK : MB_LIGHT}
                    tileSize={256}
                    maxZoom={20}
                  />
                  <FitMapBounds cafes={cafes} />
                  <FlyToSelected cafe={selected} />
                  {touch && <ActivateDragOnTap active={dragActive} onActivate={() => setDragActive(true)} />}
                  <ClearSelectionOnMapClick onClear={() => setSelected(null)} />
                  {cafes.map((cafe) => (
                    <Marker
                      key={cafe.name}
                      position={[cafe.lat, cafe.lng]}
                      icon={selected?.name === cafe.name ? activePinIcon : pinIcon}
                      opacity={visibleNames.has(cafe.name) ? 1 : 0.25}
                      zIndexOffset={selected?.name === cafe.name ? 1000 : 0}
                      title={cafe.name}
                      eventHandlers={{
                        click: (e) => {
                          L.DomEvent.stopPropagation(e)
                          setSelected(cafe)
                        },
                      }}
                    />
                  ))}
                </MapContainer>

                {touch && !dragActive && (
                  <p className="pointer-events-none absolute left-3 top-3 z-[1000] m-0 bg-white/90 border border-border px-3 py-2 text-[13px]">
                    toca el mapa para moverlo
                  </p>
                )}
              </div>

              {selected && (
                <div className="border-t border-black md:border md:absolute md:left-4 md:bottom-4 md:w-[340px] md:z-[1000] bg-white p-5 flex flex-col gap-2">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-heading text-xl font-medium tracking-[-0.01em] m-0">{selected.name}</p>
                    <button
                      type="button"
                      aria-label="Cerrar"
                      onClick={() => setSelected(null)}
                      className="w-11 h-11 -mt-3 -mr-3 shrink-0 bg-transparent border-none text-xl text-muted hover:text-black cursor-pointer"
                    >
                      ×
                    </button>
                  </div>
                  <p className="text-sm leading-normal m-0">{selected.address}</p>
                  {selected.hours.trim() ? (
                    <p className="text-sm leading-normal text-muted m-0">{selected.hours}</p>
                  ) : null}
                  <div className="flex flex-wrap gap-x-5 gap-y-1 mt-1">
                    {selected.mapsUrl ? (
                      <a
                        href={selected.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-black underline underline-offset-4 py-2.5"
                      >
                        cómo llegar
                      </a>
                    ) : null}
                    {selected.slug ? (
                      <Link to={`/r/${selected.slug}`} className="text-sm text-black underline underline-offset-4 py-2.5">
                        registrar vaso aquí
                      </Link>
                    ) : null}
                    {selected.instagram ? (
                      <a
                        href={`https://instagram.com/${selected.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted no-underline hover:text-black py-2.5"
                      >
                        @{selected.instagram}
                      </a>
                    ) : null}
                  </div>
                </div>
              )}
            </div>

            <div className="md:flex-1 min-w-0 border-t md:border-t-0 md:border-l border-border flex flex-col md:max-h-[560px]">
              <p className="m-0 px-5 py-4 text-[13px] text-muted border-b border-border" aria-live="polite">
                {!loaded ? 'cargando cafés…' : filtered.length === 1 ? '1 café' : `${filtered.length} cafés`}
              </p>
              <ul className="list-none m-0 p-0 md:overflow-y-auto flex-1">
                {filtered.map((cafe, i) => {
                  const on = selected?.name === cafe.name
                  const collapsed = !showAll && i >= MOBILE_LIST_LIMIT
                  return (
                    <li key={cafe.name} className={`border-b border-border ${collapsed ? 'hidden md:block' : ''}`}>
                      <button
                        type="button"
                        aria-pressed={on}
                        onClick={() => selectFromList(cafe)}
                        className={`block w-full text-left px-5 py-4 bg-transparent border-none cursor-pointer font-sans font-light text-black transition-shadow duration-200 hover:bg-black/[0.03] ${
                          on ? 'shadow-[inset_4px_0_0_var(--color-black)]' : ''
                        }`}
                      >
                        <span className="block text-[17px] font-medium tracking-[-0.01em]">{cafe.name}</span>
                        <span className="block mt-1 text-sm">{cafe.address}</span>
                        {cafe.hours.trim() ? (
                          <span className="block mt-0.5 text-[13px] text-muted">{cafe.hours}</span>
                        ) : null}
                      </button>
                    </li>
                  )
                })}
                {cafes.length > 0 && filtered.length === 0 && (
                  <li className="px-5 py-6 text-[15px] leading-normal">
                    no hay cafés erre ahí todavía.{' '}
                    <a href="#para-cafes" className="text-black underline underline-offset-4">
                      ¿conoces uno que debería estar?
                    </a>
                  </li>
                )}
              </ul>
              {filtered.length > MOBILE_LIST_LIMIT && (
                <button
                  type="button"
                  onClick={() => setShowAll((v) => !v)}
                  className="md:hidden min-h-12 px-5 text-left text-[15px] font-medium text-black bg-transparent border-none cursor-pointer underline underline-offset-4"
                >
                  {showAll ? 'ver menos' : `ver los ${filtered.length} cafés`}
                </button>
              )}
            </div>
          </div>
        </FadeIn>

        {loaded && cafes.length === 0 && (
          <p className="text-muted text-sm mt-6">no pudimos cargar los cafés. intenta de nuevo en un momento.</p>
        )}
      </div>
    </section>
  )
}
