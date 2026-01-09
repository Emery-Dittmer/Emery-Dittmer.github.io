'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import type { GeoJSONSource, Map as MapLibreMap, Marker } from 'maplibre-gl'

type LngLat = {
  lng: number
  lat: number
}

type StopFeatureProps = {
  id: string
  name: string
  mode: 'bus' | 'metro'
}

const DEFAULT_CENTER: LngLat = { lng: -73.5673, lat: 45.5017 }
const WALKING_SPEED_METERS_PER_MIN = 83
const OVERPASS_URL = 'https://overpass-api.de/api/interpreter'
const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search'
const CATCHMENT_SOURCE_ID = 'catchment-area'
const STOPS_SOURCE_ID = 'transit-stops'

const round = (value: number, digits = 4) =>
  Number(value.toFixed(digits))

function metersFromMinutes(minutes: number) {
  return minutes * WALKING_SPEED_METERS_PER_MIN
}

function toRad(value: number) {
  return (value * Math.PI) / 180
}

function toDeg(value: number) {
  return (value * 180) / Math.PI
}

function destinationPoint(center: LngLat, distanceMeters: number, bearing: number): LngLat {
  const radius = 6371000
  const delta = distanceMeters / radius
  const theta = toRad(bearing)
  const lat1 = toRad(center.lat)
  const lng1 = toRad(center.lng)

  const sinLat1 = Math.sin(lat1)
  const cosLat1 = Math.cos(lat1)
  const sinDelta = Math.sin(delta)
  const cosDelta = Math.cos(delta)

  const lat2 = Math.asin(sinLat1 * cosDelta + cosLat1 * sinDelta * Math.cos(theta))
  const lng2 =
    lng1 +
    Math.atan2(
      Math.sin(theta) * sinDelta * cosLat1,
      cosDelta - sinLat1 * Math.sin(lat2)
    )

  return { lat: toDeg(lat2), lng: toDeg(lng2) }
}

function emphasizeTransitLayers(map: MapLibreMap) {
  const style = map.getStyle()
  if (!style || !style.layers) return

  style.layers.forEach((layer) => {
    if (layer.type !== 'line') return
    const id = layer.id.toLowerCase()
    const sourceLayer = typeof layer['source-layer'] === 'string' ? layer['source-layer'].toLowerCase() : ''
    const isRoadLayer =
      id.includes('road') ||
      id.includes('street') ||
      id.includes('highway') ||
      id.includes('motorway') ||
      sourceLayer.includes('road') ||
      sourceLayer.includes('street') ||
      sourceLayer.includes('highway') ||
      sourceLayer.includes('motorway')
    const isTransitLayer =
      id.includes('rail') ||
      id.includes('railway') ||
      id.includes('subway') ||
      id.includes('metro') ||
      id.includes('tram') ||
      id.includes('light_rail') ||
      id.includes('transit') ||
      id.includes('tunnel_railway_transit') ||
      id.includes('tunnel_rail') ||
      sourceLayer.includes('rail') ||
      sourceLayer.includes('railway') ||
      sourceLayer.includes('subway') ||
      sourceLayer.includes('metro') ||
      sourceLayer.includes('tram') ||
      sourceLayer.includes('light_rail') ||
      (sourceLayer.includes('transportation') && id.includes('rail'))

    if (!isTransitLayer || isRoadLayer) return

    map.setPaintProperty(layer.id, 'line-color', '#f97316')
    map.setPaintProperty(layer.id, 'line-width', 2.6)
    map.setPaintProperty(layer.id, 'line-opacity', 0.9)
  })
}

function showRoadLayers(map: MapLibreMap) {
  const style = map.getStyle()
  if (!style || !style.layers) return

  style.layers.forEach((layer) => {
    const id = layer.id.toLowerCase()
    const sourceLayer = typeof layer['source-layer'] === 'string' ? layer['source-layer'].toLowerCase() : ''
    const isRoadLayer =
      id.includes('road') ||
      id.includes('street') ||
      id.includes('highway') ||
      id.includes('motorway') ||
      sourceLayer.includes('road') ||
      sourceLayer.includes('street') ||
      sourceLayer.includes('highway') ||
      sourceLayer.includes('motorway')

    if (!isRoadLayer) return

    map.setLayoutProperty(layer.id, 'visibility', 'visible')
  })
}

function createCircle(center: LngLat, radiusMeters: number, steps = 72): GeoJSON.FeatureCollection {
  const coordinates: number[][] = []
  for (let i = 0; i <= steps; i += 1) {
    const bearing = (i / steps) * 360
    const point = destinationPoint(center, radiusMeters, bearing)
    coordinates.push([point.lng, point.lat])
  }

  return {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [coordinates],
        },
        properties: {},
      },
    ],
  }
}

function buildStopsQuery(center: LngLat, radiusMeters: number) {
  return `
[out:json][timeout:25];
(
  node(around:${Math.round(radiusMeters)},${center.lat},${center.lng})["highway"="bus_stop"];
  node(around:${Math.round(radiusMeters)},${center.lat},${center.lng})["public_transport"="station"]["station"="subway"];
  node(around:${Math.round(radiusMeters)},${center.lat},${center.lng})["railway"="station"];
  node(around:${Math.round(radiusMeters)},${center.lat},${center.lng})["railway"="subway_entrance"];
);
out body;
`
}

function toStopFeature(element: any): GeoJSON.Feature<GeoJSON.Point, StopFeatureProps> | null {
  if (!element || element.type !== 'node') return null
  const tags = element.tags ?? {}
  const isBus = tags.highway === 'bus_stop'
  const isMetro =
    tags.station === 'subway' ||
    tags.railway === 'subway_entrance' ||
    (tags.railway === 'station' && tags.subway !== 'no')

  if (!isBus && !isMetro) return null

  return {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [element.lon, element.lat],
    },
    properties: {
      id: String(element.id ?? `${element.lat}-${element.lon}`),
      name: tags.name ?? (isMetro ? 'Metro stop' : 'Bus stop'),
      mode: isMetro ? 'metro' : 'bus',
    },
  }
}

const distanceMeters = (a: LngLat, b: LngLat) => {
  const radius = 6371000
  const dLat = toRad(b.lat - a.lat)
  const dLng = toRad(b.lng - a.lng)
  const lat1 = toRad(a.lat)
  const lat2 = toRad(b.lat)
  const h =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
  return 2 * radius * Math.asin(Math.min(1, Math.sqrt(h)))
}

export default function TransitCatchmentMap({
  locale = 'en',
}: {
  locale?: 'en' | 'fr'
}) {
  const [selected, setSelected] = useState<LngLat>(DEFAULT_CENTER)
  const [walkingMinutes, setWalkingMinutes] = useState(15)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchStatus, setSearchStatus] = useState<'idle' | 'loading' | 'empty' | 'error'>('idle')
  const [stopsData, setStopsData] = useState<GeoJSON.FeatureCollection | null>(null)
  const [stopsStatus, setStopsStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [mapReady, setMapReady] = useState(false)
  const [filterMode, setFilterMode] = useState<'all' | 'bus' | 'metro'>('all')
  const [filterQuery, setFilterQuery] = useState('')
  const [sortKey, setSortKey] = useState<'name' | 'mode' | 'distance'>('distance')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')
  const [coordStep, setCoordStep] = useState(0.001)

  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<MapLibreMap | null>(null)
  const markerRef = useRef<Marker | null>(null)

  const copy = {
    en: {
      title: 'Transit Catchment Map',
      subtitle: 'Click the map or search an address to see nearby bus and metro stops.',
      searchLabel: 'Search address',
      searchPlaceholder: 'Enter an address or place',
      searchButton: 'Locate',
      walkingLabel: 'Walking time',
      walkingNote: 'Approx. 5 km/h walking speed.',
      radiusLabel: 'Catchment radius',
      resultsLabel: 'Stops within range',
      busLabel: 'Bus stops',
      metroLabel: 'Metro stops',
      loadingStops: 'Loading nearby stops...',
      errorStops: 'Unable to load stops right now.',
      emptySearch: 'No results for that address.',
      errorSearch: 'Search failed. Try a different address.',
      dataNote: 'Data from OpenStreetMap via Overpass.',
      mapLoading: 'Loading map...',
      filterLabel: 'Filter stops',
      filterAll: 'All',
      filterBus: 'Bus',
      filterMetro: 'Metro',
      filterPlaceholder: 'Filter by name',
      sortLabel: 'Sort',
      sortName: 'Name',
      sortType: 'Type',
      sortDistance: 'Distance',
      coordLabel: 'Adjust coordinates',
      latLabel: 'Latitude',
      lngLabel: 'Longitude',
      stepLabel: 'Step',
    },
    fr: {
      title: 'Carte des zones de marche',
      subtitle: "Cliquez sur la carte ou recherchez une adresse pour voir les arrets proches.",
      searchLabel: 'Rechercher une adresse',
      searchPlaceholder: 'Adresse ou lieu',
      searchButton: 'Localiser',
      walkingLabel: 'Temps de marche',
      walkingNote: 'Vitesse approx. 5 km/h.',
      radiusLabel: 'Rayon de marche',
      resultsLabel: 'Arrets dans la zone',
      busLabel: 'Arrets de bus',
      metroLabel: 'Arrets de metro',
      loadingStops: 'Chargement des arrets proches...',
      errorStops: "Impossible de charger les arrets pour l'instant.",
      emptySearch: "Aucun resultat pour cette adresse.",
      errorSearch: 'Recherche echouee. Essayez une autre adresse.',
      dataNote: 'Donnees OpenStreetMap via Overpass.',
      mapLoading: 'Chargement de la carte...',
      filterLabel: 'Filtrer les arrets',
      filterAll: 'Tous',
      filterBus: 'Bus',
      filterMetro: 'Metro',
      filterPlaceholder: 'Filtrer par nom',
      sortLabel: 'Trier',
      sortName: 'Nom',
      sortType: 'Type',
      sortDistance: 'Distance',
      coordLabel: 'Ajuster les coordonnees',
      latLabel: 'Latitude',
      lngLabel: 'Longitude',
      stepLabel: 'Pas',
    },
  }
  const t = copy[locale]

  const radiusMeters = useMemo(() => metersFromMinutes(walkingMinutes), [walkingMinutes])

  useEffect(() => {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setSelected({ lng: position.coords.longitude, lat: position.coords.latitude })
      },
      () => undefined,
      { enableHighAccuracy: true, timeout: 6000 }
    )
  }, [])

  useEffect(() => {
    let cancelled = false

    const init = async () => {
      if (!mapContainerRef.current || mapRef.current) return
      const maplibregl = await import('maplibre-gl')
      if (cancelled) return

      const map = new maplibregl.Map({
        container: mapContainerRef.current,
        style: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
        center: [selected.lng, selected.lat],
        zoom: 13,
      })

      mapRef.current = map
      markerRef.current = new maplibregl.Marker({ color: '#a855f7' })
        .setLngLat([selected.lng, selected.lat])
        .addTo(map)

      map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right')

      map.on('click', (event) => {
        setSelected({ lng: event.lngLat.lng, lat: event.lngLat.lat })
      })

      map.on('load', () => {
        emphasizeTransitLayers(map)
        showRoadLayers(map)
        setMapReady(true)
      })
    }

    init()

    return () => {
      cancelled = true
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (!mapReady || !mapRef.current) return
    const map = mapRef.current

    if (!map.getSource(CATCHMENT_SOURCE_ID)) {
      map.addSource(CATCHMENT_SOURCE_ID, {
        type: 'geojson',
        data: createCircle(selected, radiusMeters),
      })
      map.addLayer({
        id: 'catchment-fill',
        type: 'fill',
        source: CATCHMENT_SOURCE_ID,
        paint: {
          'fill-color': '#7c3aed',
          'fill-opacity': 0.16,
        },
      })
      map.addLayer({
        id: 'catchment-outline',
        type: 'line',
        source: CATCHMENT_SOURCE_ID,
        paint: {
          'line-color': '#a855f7',
          'line-width': 2,
        },
      })
    }

    if (!map.getSource(STOPS_SOURCE_ID)) {
      map.addSource(STOPS_SOURCE_ID, {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: [] },
      })
      map.addLayer({
        id: 'stops-bus',
        type: 'circle',
        source: STOPS_SOURCE_ID,
        filter: ['==', ['get', 'mode'], 'bus'],
        paint: {
          'circle-color': '#38bdf8',
          'circle-radius': 5,
          'circle-stroke-color': '#0f172a',
          'circle-stroke-width': 1,
        },
      })
      map.addLayer({
        id: 'stops-metro',
        type: 'circle',
        source: STOPS_SOURCE_ID,
        filter: ['==', ['get', 'mode'], 'metro'],
        paint: {
          'circle-color': '#22c55e',
          'circle-radius': 6,
          'circle-stroke-color': '#052e16',
          'circle-stroke-width': 1,
        },
      })
    }

  }, [mapReady, radiusMeters, selected])

  useEffect(() => {
    if (!mapReady || !mapRef.current) return
    const map = mapRef.current
    const source = map.getSource(CATCHMENT_SOURCE_ID) as GeoJSONSource | undefined
    if (source) {
      source.setData(createCircle(selected, radiusMeters))
    }

    if (markerRef.current) {
      markerRef.current.setLngLat([selected.lng, selected.lat])
    }
  }, [mapReady, radiusMeters, selected])

  useEffect(() => {
    if (!mapReady || !mapRef.current) return
    mapRef.current.flyTo({
      center: [selected.lng, selected.lat],
      zoom: 13,
      duration: 800,
    })
  }, [mapReady, selected])

  useEffect(() => {
    if (!mapReady) return
    let isCurrent = true
    setStopsStatus('loading')

    const timeout = setTimeout(async () => {
      try {
        const response = await fetch(OVERPASS_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain',
          },
          body: buildStopsQuery(selected, radiusMeters),
          cache: 'no-store',
        })

        if (!response.ok) {
          throw new Error('overpass_failed')
        }

        const data = await response.json()
        const features = (data.elements ?? [])
          .map(toStopFeature)
          .filter((feature: GeoJSON.Feature | null): feature is GeoJSON.Feature<GeoJSON.Point, StopFeatureProps> => Boolean(feature))

        if (isCurrent) {
          setStopsData({
            type: 'FeatureCollection',
            features,
          })
          setStopsStatus('idle')
        }
      } catch (error) {
        if (isCurrent) {
          setStopsStatus('error')
        }
      }
    }, 350)

    return () => {
      isCurrent = false
      clearTimeout(timeout)
    }
  }, [mapReady, radiusMeters, selected])

  useEffect(() => {
    if (!mapReady || !mapRef.current || !stopsData) return
    const source = mapRef.current.getSource(STOPS_SOURCE_ID) as GeoJSONSource | undefined
    if (source) {
      source.setData(stopsData)
    }
  }, [mapReady, stopsData])


  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmed = searchQuery.trim()
    if (!trimmed) return
    setSearchStatus('loading')

    try {
      const params = new URLSearchParams({
        format: 'json',
        q: trimmed,
        limit: '1',
      })
      const response = await fetch(`${NOMINATIM_URL}?${params.toString()}`, { cache: 'no-store' })
      if (!response.ok) {
        throw new Error('nominatim_failed')
      }
      const results = await response.json()
      if (!results.length) {
        setSearchStatus('empty')
        return
      }
      const match = results[0]
      setSelected({ lng: Number(match.lon), lat: Number(match.lat) })
      setSearchStatus('idle')
    } catch (error) {
      setSearchStatus('error')
    }
  }

  const counts = useMemo(() => {
    const tally = { bus: 0, metro: 0 }
    if (!stopsData) return tally
    stopsData.features.forEach((feature: any) => {
      const mode = feature?.properties?.mode
      if (mode === 'bus') tally.bus += 1
      if (mode === 'metro') tally.metro += 1
    })
    return tally
  }, [stopsData])

  const stopsList = useMemo(() => {
    if (!stopsData) return []
    const seen = new Set<string>()
    const raw = stopsData.features
      .map((feature: any) => ({
        id: feature?.properties?.id ?? `${feature?.geometry?.coordinates?.[1]}-${feature?.geometry?.coordinates?.[0]}`,
        name: feature?.properties?.name ?? 'Stop',
        mode: feature?.properties?.mode ?? 'bus',
        lat: feature?.geometry?.coordinates?.[1] ?? 0,
        lng: feature?.geometry?.coordinates?.[0] ?? 0,
      }))
      .filter((stop) => {
        const key = `${stop.mode}-${stop.name}-${round(stop.lat, 5)}-${round(stop.lng, 5)}`
        if (seen.has(key)) return false
        seen.add(key)
        return true
      })

    const query = filterQuery.trim().toLowerCase()
    const filtered = raw.filter((stop) => {
      const matchesMode = filterMode === 'all' || stop.mode === filterMode
      const matchesQuery = !query || stop.name.toLowerCase().includes(query)
      return matchesMode && matchesQuery
    })

    const sorted = [...filtered].sort((a, b) => {
      const direction = sortDir === 'asc' ? 1 : -1
      if (sortKey === 'name') {
        return a.name.localeCompare(b.name) * direction
      }
      if (sortKey === 'mode') {
        return a.mode.localeCompare(b.mode) * direction
      }
      const distA = distanceMeters(selected, { lat: a.lat, lng: a.lng })
      const distB = distanceMeters(selected, { lat: b.lat, lng: b.lng })
      return (distA - distB) * direction
    })

    return sorted
  }, [stopsData, filterMode, filterQuery, sortDir, sortKey, selected])

  const toggleSort = (key: 'name' | 'mode' | 'distance') => {
    if (sortKey === key) {
      setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  const adjustCoordinate = (axis: 'lat' | 'lng', delta: number) => {
    setSelected((prev) => ({
      ...prev,
      [axis]: round(prev[axis] + delta, 6),
    }))
  }

  const adjustWalkingMinutes = (delta: number) => {
    setWalkingMinutes((prev) => {
      const next = prev + delta
      return Math.min(45, Math.max(1, next))
    })
  }

  return (
    <section className="w-full">
      <div className="py-12 md:py-20 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center mb-10">
          <h1 className="h2 mb-3">{t.title}</h1>
          <p className="text-lg text-gray-400">{t.subtitle}</p>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid lg:grid-cols-[1.2fr_2fr] gap-6 items-start">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-lg">
            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  {t.searchLabel}
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-gray-200 placeholder:text-gray-500 focus:border-purple-500 focus:outline-none"
                    placeholder={t.searchPlaceholder}
                  />
                  <button
                    type="submit"
                    className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-500"
                  >
                    {t.searchButton}
                  </button>
                </div>
                {searchStatus === 'empty' && (
                  <p className="mt-2 text-xs text-amber-300">{t.emptySearch}</p>
                )}
                {searchStatus === 'error' && (
                  <p className="mt-2 text-xs text-red-300">{t.errorSearch}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  {t.walkingLabel}: {walkingMinutes} min
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => adjustWalkingMinutes(-1)}
                    className="h-9 w-9 rounded-md border border-slate-700 bg-slate-950 text-lg text-gray-200 transition hover:border-purple-400"
                    aria-label="Decrease walking time"
                  >
                    -
                  </button>
                  <input
                    type="range"
                    min={1}
                    max={45}
                    step={1}
                    value={walkingMinutes}
                    onChange={(event) => setWalkingMinutes(Number(event.target.value))}
                    className="w-full accent-purple-500"
                  />
                  <button
                    type="button"
                    onClick={() => adjustWalkingMinutes(1)}
                    className="h-9 w-9 rounded-md border border-slate-700 bg-slate-950 text-lg text-gray-200 transition hover:border-purple-400"
                    aria-label="Increase walking time"
                  >
                    +
                  </button>
                </div>
                <p className="mt-2 text-xs text-gray-500">{t.walkingNote}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
                <div className="rounded-lg bg-slate-950/80 border border-slate-800 p-3">
                  <div className="text-xs uppercase tracking-wide text-gray-500">{t.radiusLabel}</div>
                  <div className="mt-1 text-lg font-semibold">
                    {(radiusMeters / 1000).toFixed(2)} km
                  </div>
                </div>
                <div className="rounded-lg bg-slate-950/80 border border-slate-800 p-3">
                  <div className="text-xs uppercase tracking-wide text-gray-500">{t.resultsLabel}</div>
                  <div className="mt-1 text-lg font-semibold">
                    {counts.bus + counts.metro}
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2">
                    <span className="inline-block h-2 w-2 rounded-full bg-sky-400" />
                    {t.busLabel}
                  </span>
                  <span className="font-semibold">{counts.bus}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2">
                    <span className="inline-block h-2 w-2 rounded-full bg-green-400" />
                    {t.metroLabel}
                  </span>
                  <span className="font-semibold">{counts.metro}</span>
                </div>
                <div className="text-xs text-gray-500">
                  {t.dataNote}
                </div>
              </div>

              <div className="space-y-3 text-xs text-gray-400">
                <div className="text-gray-500">
                  {round(selected.lat, 4)}, {round(selected.lng, 4)}
                </div>
                <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-3">
                  <div className="text-[11px] uppercase tracking-wide text-gray-500 mb-2">
                    {t.coordLabel}
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-gray-400">{t.latLabel}</span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => adjustCoordinate('lat', -coordStep)}
                          className="rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-gray-200 transition hover:border-purple-400"
                        >
                          -
                        </button>
                        <button
                          type="button"
                          onClick={() => adjustCoordinate('lat', coordStep)}
                          className="rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-gray-200 transition hover:border-purple-400"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-gray-400">{t.lngLabel}</span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => adjustCoordinate('lng', -coordStep)}
                          className="rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-gray-200 transition hover:border-purple-400"
                        >
                          -
                        </button>
                        <button
                          type="button"
                          onClick={() => adjustCoordinate('lng', coordStep)}
                          className="rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-gray-200 transition hover:border-purple-400"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <label className="flex items-center justify-between gap-2 text-gray-500">
                      <span>{t.stepLabel}</span>
                      <input
                        type="number"
                        min={0.0001}
                        step={0.0001}
                        value={coordStep}
                        onChange={(event) => setCoordStep(Math.max(0.0001, Number(event.target.value)))}
                        className="w-24 rounded-md border border-slate-800 bg-slate-900 px-2 py-1 text-xs text-gray-200 focus:border-purple-500 focus:outline-none"
                      />
                    </label>
                  </div>
                </div>
              </div>

              {stopsStatus === 'loading' && (
                <div className="text-xs text-purple-200">{t.loadingStops}</div>
              )}
              {stopsStatus === 'error' && (
                <div className="text-xs text-red-300">{t.errorStops}</div>
              )}
            </form>
          </div>

          <div className="relative">
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-purple-500/20 via-slate-900/0 to-cyan-500/20 blur-2xl" />
            <div className="relative h-[520px] rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
              <div ref={mapContainerRef} className="h-full w-full" />
              {!mapReady && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-slate-950/80 text-sm text-gray-200">
                  <div className="h-10 w-10 animate-spin rounded-full border-2 border-purple-400 border-t-transparent" aria-hidden="true" />
                  <span role="status" aria-live="polite">{t.mapLoading}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 w-full px-4 sm:px-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-gray-300">
              <span>{t.resultsLabel}</span>
              <span className="text-xs text-gray-500">{counts.bus + counts.metro} total</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-3 text-xs text-gray-300">
              <div className="flex items-center gap-2">
                <span className="text-gray-500">{t.filterLabel}</span>
                <div className="inline-flex rounded-full bg-slate-900 p-1">
                  {(['all', 'bus', 'metro'] as const).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setFilterMode(mode)}
                      className={`px-3 py-1 rounded-full transition ${
                        filterMode === mode ? 'bg-purple-600 text-white' : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      {mode === 'all' ? t.filterAll : mode === 'bus' ? t.filterBus : t.filterMetro}
                    </button>
                  ))}
                </div>
              </div>
              <input
                type="text"
                value={filterQuery}
                onChange={(event) => setFilterQuery(event.target.value)}
                className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-1 text-xs text-gray-200 placeholder:text-gray-600 focus:border-purple-500 focus:outline-none"
                placeholder={t.filterPlaceholder}
              />
              <div className="flex items-center gap-2">
                <span className="text-gray-500">{t.sortLabel}</span>
                <div className="inline-flex rounded-full bg-slate-900 p-1">
                  {(['distance', 'name', 'mode'] as const).map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => toggleSort(key)}
                      className={`px-3 py-1 rounded-full transition ${
                        sortKey === key ? 'bg-purple-600 text-white' : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      {key === 'distance' ? t.sortDistance : key === 'name' ? t.sortName : t.sortType}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-200">
                <thead className="text-xs uppercase tracking-wide text-gray-500">
                  <tr>
                    <th className="px-3 py-2">
                      <button type="button" onClick={() => toggleSort('name')}>
                        {t.sortName}
                      </button>
                    </th>
                    <th className="px-3 py-2">
                      <button type="button" onClick={() => toggleSort('mode')}>
                        {t.sortType}
                      </button>
                    </th>
                    <th className="px-3 py-2">Lat</th>
                    <th className="px-3 py-2">Lng</th>
                    <th className="px-3 py-2">
                      <button type="button" onClick={() => toggleSort('distance')}>
                        {t.sortDistance}
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {stopsList.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-3 py-3 text-gray-500">
                        {stopsStatus === 'loading' ? t.loadingStops : t.resultsLabel}
                      </td>
                    </tr>
                  )}
                  {stopsList.map((stop) => (
                    <tr key={stop.id} className="border-t border-slate-800 text-gray-300">
                      <td className="px-3 py-2">{stop.name}</td>
                      <td className="px-3 py-2 capitalize">{stop.mode}</td>
                      <td className="px-3 py-2">{round(stop.lat, 4)}</td>
                      <td className="px-3 py-2">{round(stop.lng, 4)}</td>
                      <td className="px-3 py-2">
                        {(distanceMeters(selected, { lat: stop.lat, lng: stop.lng }) / 1000).toFixed(2)} km
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
