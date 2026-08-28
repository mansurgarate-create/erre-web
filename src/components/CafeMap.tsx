import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
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
}

const OSM_TILES = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'

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

export default function CafeMap() {
  const [cafes, setCafes] = useState<Cafe[]>([])
  const [search, setSearch] = useState('')
  const { resolved } = useTheme()

  useEffect(() => {
    async function fetchCafes() {
      try {
        const { data, error } = await supabase
          .from('cafes')
          .select('name, city, address, lat, lng, maps_url, hours, nfc_tag_id, instagram')

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
          }))
        )
      }
    }
    void fetchCafes()
  }, [])

  const filtered = useMemo(
    () => cafes.filter((c) => c.name.toLowerCase().includes(search.toLowerCase())),
    [cafes, search]
  )

  return (
    <section id="cafeterias" className="px-6 py-24 md:py-32">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <h2 className="font-heading text-3xl md:text-5xl font-medium text-black text-center mb-12 md:mb-16">
            Encuentra un café
          </h2>
        </FadeIn>

        <FadeIn delay={150}>
          <div className="mb-8">
            <input
              type="text"
              placeholder="Buscar cafetería..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-3 border border-border text-sm font-sans text-black placeholder:text-muted focus:outline-none focus:border-black transition-colors duration-300"
            />
          </div>
        </FadeIn>

        <FadeIn delay={300}>
          <div className="border border-border overflow-hidden" style={{ height: '480px' }}>
            <MapContainer
              key={resolved}
              center={[25.651, -100.294]}
              zoom={15}
              maxZoom={19}
              scrollWheelZoom={false}
              style={{ height: '100%', width: '100%', background: 'var(--color-wash)' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url={OSM_TILES}
                maxZoom={19}
              />
              <FitMapBounds cafes={filtered} />
              {filtered.map((cafe) => (
                <Marker key={cafe.name} position={[cafe.lat, cafe.lng]} icon={pinIcon}>
                  <Popup>
                    <div className="erre-popup">
                      <h3 className="font-heading text-base font-medium text-black m-0 mb-1">
                        {cafe.name}
                      </h3>
                      <p className="text-xs text-muted m-0 mb-1">{cafe.address}</p>
                      <p className="text-xs text-muted m-0 mb-3">{cafe.hours}</p>
                      {cafe.instagram ? (
                        <a
                          href={`https://instagram.com/${cafe.instagram}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="erre-popup-muted block text-xs text-muted no-underline mb-3 hover:text-black"
                        >
                          @{cafe.instagram}
                        </a>
                      ) : null}
                      <div className="flex flex-wrap items-center gap-3">
                        {cafe.mapsUrl ? (
                          <a
                            href={cafe.mapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="erre-popup-cta inline-block text-xs bg-black px-3 py-1.5 no-underline hover:bg-black/80 transition-colors duration-300"
                          >
                            Abrir en Maps
                          </a>
                        ) : null}
                        {cafe.slug ? (
                          <Link
                            to={`/r/${cafe.slug}`}
                            className="erre-popup-muted text-xs text-muted no-underline hover:text-black transition-colors duration-300"
                          >
                            Punto erre
                          </Link>
                        ) : null}
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </FadeIn>

        {filtered.length === 0 && (
          <p className="text-muted text-sm text-center mt-6">
            No se encontraron cafeterías.
          </p>
        )}
      </div>
    </section>
  )
}
