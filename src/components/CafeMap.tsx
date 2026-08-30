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

const pinIcon = L.divIcon({
  className: 'erre-pin',
  html: '<span></span>',
  iconSize: [19, 19],
  iconAnchor: [10, 10],
  popupAnchor: [0, -12],
})

function slugFromTag(nfcTagId: string | null) {
  if (!nfcTagId?.startsWith('erre:')) return null
  return nfcTagId.slice('erre:'.length)
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

function ClearSelectionOnMapClick({ onClear }: { onClear: () => void }) {
  useMapEvents({
    click: () => onClear(),
  })
  return null
}

export default function CafeMap() {
  const [cafes, setCafes] = useState<Cafe[]>([])
  const [search, setSearch] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [selected, setSelected] = useState<Cafe | null>(null)
  const searchRef = useRef<HTMLDivElement>(null)
  const { resolved } = useTheme()
  const dark = resolved === 'dark'

  useEffect(() => {
    async function fetchCafes() {
      try {
        const { data, error } = await supabase
          .from('cafes')
          .select('name, city, address, lat, lng, maps_url, hours, nfc_tag_id, instagram, logo_url')

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
    void fetchCafes()
  }, [])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const filtered = useMemo(
    () => cafes.filter((c) => c.name.toLowerCase().includes(search.toLowerCase())),
    [cafes, search]
  )

  function handleSelect(cafe: Cafe) {
    setSelected(cafe)
    setSearch('')
    setShowDropdown(false)
  }

  return (
    <section id="cafeterias" className="px-6 py-24 md:py-32">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <h2 className="font-heading text-3xl md:text-5xl font-medium text-black text-center mb-12 md:mb-16">
            La red erre
          </h2>
        </FadeIn>

        <FadeIn delay={150} className="relative z-[1000]">
          <div className="mb-8 relative" ref={searchRef}>
            <input
              type="text"
              placeholder="Buscar cafetería..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setShowDropdown(true)
                setSelected(null)
              }}
              onFocus={() => setShowDropdown(true)}
              className="w-full px-5 py-3 rounded-full bg-wash border-none text-base font-sans text-black placeholder:text-muted focus:outline-none transition-colors duration-300"
            />
            {showDropdown && filtered.length > 0 && (
              <ul className="absolute left-0 right-0 top-full z-50 mt-1 rounded-2xl bg-wash max-h-60 overflow-y-auto overflow-hidden"
              >
                {filtered.map((cafe) => (
                  <li
                    key={cafe.name}
                    onClick={() => handleSelect(cafe)}
                    className="px-4 py-3 cursor-pointer hover:bg-black/5 transition-colors duration-150"
                  >
                    <p className="text-sm font-medium text-black m-0">{cafe.name}</p>
                    <p className="text-xs text-muted m-0">{cafe.address}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </FadeIn>

        <FadeIn delay={300}>
          <div className="rounded-2xl overflow-hidden" style={{ height: '480px' }}>
            <MapContainer
              key={resolved}
              center={[25.651, -100.294]}
              zoom={15}
              maxZoom={20}
              scrollWheelZoom={false}
              zoomControl={false}
              style={{ height: '100%', width: '100%', background: 'var(--color-wash)' }}
            >
              <ZoomControl position="bottomright" />
              <TileLayer
                attribution='&copy; <a href="https://www.mapbox.com/">Mapbox</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url={dark ? MB_DARK : MB_LIGHT}
                tileSize={256}
                maxZoom={20}
              />
              <FitMapBounds cafes={cafes} />
              <ClearSelectionOnMapClick onClear={() => setSelected(null)} />
              {cafes.map((cafe) => (
                <Marker
                  key={cafe.name}
                  position={[cafe.lat, cafe.lng]}
                  icon={pinIcon}
                  eventHandlers={{
                    click: (e) => {
                      L.DomEvent.stopPropagation(e)
                      setSelected(cafe)
                    },
                  }}
                />
              ))}
            </MapContainer>
          </div>
          {selected && (
            <div className="mt-4 rounded-2xl bg-wash p-5 md:p-6">
              <div className="flex items-center gap-3 mb-1">
                {selected.logoUrl ? (
                  <img
                    src={selected.logoUrl}
                    alt=""
                    className="w-10 h-10 rounded-full object-cover shrink-0"
                  />
                ) : null}
                <h3 className="font-heading text-base font-medium text-black m-0">
                  {selected.name}
                </h3>
              </div>
              <p className="text-xs text-muted m-0 mb-1">{selected.address}</p>
              <p className={`text-xs text-muted m-0 ${selected.instagram ? 'mb-2' : 'mb-4'}`}>
                {selected.hours}
                {selected.city ? ` · ${selected.city}` : ''}
              </p>
              {selected.instagram ? (
                <a
                  href={`https://instagram.com/${selected.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-xs text-muted no-underline mb-4 hover:text-black"
                >
                  @{selected.instagram}
                </a>
              ) : null}
              <div className="flex flex-wrap items-center gap-3">
                {selected.slug ? (
                  <Link to={`/r/${selected.slug}`} className="erre-btn erre-btn-sm">
                    punto erre
                  </Link>
                ) : null}
                {selected.mapsUrl ? (
                  <a
                    href={selected.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-muted no-underline hover:text-black transition-colors duration-300"
                  >
                    Abrir en Maps
                  </a>
                ) : null}
              </div>
            </div>
          )}
        </FadeIn>

        {cafes.length === 0 && (
          <p className="text-muted text-sm text-center mt-6">
            No se encontraron cafeterías.
          </p>
        )}
      </div>
    </section>
  )
}
