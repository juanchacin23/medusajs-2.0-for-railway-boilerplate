'use client'
// components/CitySwitcher.tsx
import { useState, useEffect, ChangeEvent  } from 'react'


type City = 'caracas' | 'maracaibo'


const URLS: Record<City,string> = {
  caracas:   'https://storefront-caracas-production.up.railway.app',
  maracaibo: 'https://storefront-maracaibo-production.up.railway.app',
}

export default function CitySwitcher() {
   // 1) Extraemos la ciudad de window.location.host
   const [city, setCity] = useState<City>('caracas')

  // Detectamos la ciudad *en el cliente* al montar
  useEffect(() => {
    const hostname = window.location.hostname 
    // ej: "storefront-caracas-production.up.railway.app"
    const sub = hostname.split('.')[0] 
    // "storefront-caracas-production"
    const parts = sub.split('-') 
    // ["storefront","caracas","production"]
    const detected = parts[1] as City

    setCity(detected === 'maracaibo' ? 'maracaibo' : 'caracas')
  }, [])

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newCity = e.target.value as City
    // redirigimos al deploy correspondiente
    window.location.href = URLS[newCity]
  }


  return (
    <select value={city} onChange={onChange}>
      <option value="caracas">Caracas</option>
      <option value="maracaibo">Maracaibo</option>
    </select>
  )
}