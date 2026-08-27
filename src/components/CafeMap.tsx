import { useEffect, useState, useMemo } from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet'
import { LatLngBounds } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import FadeIn from './ui/FadeIn'
import { supabase } from '../lib/supabase'

interface Cafe {
  name: string
  city: string
  address: string
  lat: number
  lng: number
  mapsUrl: string
  hours: string
}

interface SupabaseCafe {
  name: string
  city: string
  address: string
  lat: number
  lng: number
  maps_url: string
  hours: string
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

function usePrefersDark() {
  const [dark, setDark] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
  )

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => setDark(media.matches)
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  return dark
}

export default function CafeMap() {
  const [cafes, setCafes] = useState<Cafe[]>([])
  const [search, setSearch] = useState('')
  const [cityFilter, setCityFilter] = useState('Todas')
  const dark = usePrefersDark()
  const pin = dark ? '#FAFAF8' : '#000'

  useEffect(() => {
    async function fetchCafes() {
      try {
        const { data, error } = await supabase
          .from('cafes')
          .select('name, city, address, lat, lng, maps_url, hours')

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
          }))
        )
      } catch {
        const res = await fetch('/data/cafes.json')
        const json = await res.json()
        setCafes(json)
      }
    }
    fetchCafes()
  }, [])

  const cities = useMemo(
    () => ['Todas', ...Array.from(new Set(cafes.map((c) => c.city)))],
    [cafes]
  )

  const filtered = useMemo(
    () =>
      cafes.filter((c) => {
        const matchCity = cityFilter === 'Todas' || c.city === cityFilter
        const matchSearch = c.name.toLowerCase().includes(search.toLowerCase())
        return matchCity && matchSearch
      }),
    [cafes, search, cityFilter]
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
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <input
              type="text"
              placeholder="Buscar cafetería..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-4 py-3 border border-border text-sm font-sans text-black placeholder:text-muted focus:outline-none focus:border-black transition-colors duration-300"
            />
            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="px-4 py-3 border border-border text-sm font-sans text-black bg-white focus:outline-none focus:border-black transition-colors duration-300 cursor-pointer appearance-none"
            >
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </FadeIn>

        <FadeIn delay={300}>
          <div className="border border-border overflow-hidden" style={{ height: '480px' }}>
            <MapContainer
              key={dark ? 'dark' : 'light'}
              center={[25.651, -100.294]}
              zoom={15}
              scrollWheelZoom={false}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                url={
                  dark
                    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
                    : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
                }
              />
              <FitMapBounds cafes={filtered} />
              {filtered.map((cafe) => (
                <CircleMarker
                  key={cafe.name}
                  center={[cafe.lat, cafe.lng]}
                  radius={8}
                  pathOptions={{
                    color: pin,
                    fillColor: pin,
                    fillOpacity: 0.9,
                    weight: 2,
                  }}
                >
                  <Popup>
                    <div className="font-sans p-1">
                      <h3 className="text-sm font-semibold text-black m-0 mb-1">
                        {cafe.name}
                      </h3>
                      <p className="text-xs text-muted m-0 mb-1">{cafe.address}</p>
                      <p className="text-xs text-muted m-0 mb-3">{cafe.hours}</p>
                      <a
                        href={cafe.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-xs bg-black text-white px-3 py-1.5 no-underline hover:bg-black/80 transition-colors duration-300"
                      >
                        Abrir en Maps
                      </a>
                    </div>
                  </Popup>
                </CircleMarker>
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
