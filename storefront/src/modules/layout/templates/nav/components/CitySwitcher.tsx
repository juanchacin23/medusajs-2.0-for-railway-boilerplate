'use client'
// components/CitySwitcher.tsx
import { useState, ChangeEvent, useMemo } from 'react'


type City = 'caracas' | 'maracaibo'
const CITY_PATTERN = /^storefront-([^.-]+)-production/

export default function CitySwitcher() {
   // 1) Extraemos la ciudad de window.location.host
  const inferredCity = useMemo<City>(() => {
    if (typeof window === 'undefined') return 'caracas'
    const host = window.location.host    // e.g. "storefront-caracas-production.up.railway.app"
    const m = host.match(CITY_PATTERN)
    // m[1] será "caracas" o "maracaibo", si coincide
    return (m?.[1] as City) || 'caracas'
  }, [])

  // 2) Estado controlado
  const [city, setCity] = useState<City>(inferredCity)

  // 3) URLs fijas por ciudad
  const urls: Record<City,string> = {
    caracas:   'https://storefront-caracas-production.up.railway.app',
    maracaibo: 'https://storefront-maracaibo-production.up.railway.app',
  }

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newCity = e.target.value as City
    setCity(newCity)
    // redirijo al deploy correspondiente
    window.location.href = urls[newCity]
  }


  return (
    <select value={city} onChange={onChange}>
      <option value="caracas">Caracas</option>
      <option value="maracaibo">Maracaibo</option>
    </select>
  )
}