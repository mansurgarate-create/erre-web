import { useEffect, useState, useMemo } from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import FadeIn from './ui/FadeIn'

interface Cafe {
  name: string
  city: string
  address: string
  lat: number
  lng: number
  hours: string
}

export default function CafeMap() {
  const [cafes, setCafes] = useState<Cafe[]>([])
  const [search, setSearch] = useState('')
  const [cityFilter, setCityFilter] = useState('Todas')

  useEffect(() => {
    fetch('/data/cafes.json')
      .then((r) => r.json())
      .then(setCafes)
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

  const mapsUrl = (lat: number, lng: number) =>
    `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`

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
              center={[25.66, -100.33]}
              zoom={13}
              scrollWheelZoom={false}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              />
              {filtered.map((cafe) => (
                <CircleMarker
                  key={cafe.name}
                  center={[cafe.lat, cafe.lng]}
                  radius={8}
                  pathOptions={{
                    color: '#000',
                    fillColor: '#000',
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
                        href={mapsUrl(cafe.lat, cafe.lng)}
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
