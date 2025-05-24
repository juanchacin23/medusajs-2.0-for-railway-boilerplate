'use client'
// components/CitySwitcher.tsx
import { useState, useEffect, ChangeEvent  } from 'react'
import { Select } from "@medusajs/ui"



type City = 'caracas' | 'maracaibo'

const BASE = process.env.NEXT_PUBLIC_BASE_URL! 

// 2) extrae la ciudad actual del host
const currentCity = ((): City => {
  try {
    const h = new URL(BASE).hostname.split('.')[0]
    return (h === 'maracaibo' ? 'maracaibo' : 'caracas')
  } catch {
    return 'caracas'
  }
})()


// 3) construye la “ciudad opuesta”
const otherCity: City = currentCity === 'caracas' ? 'maracaibo' : 'caracas'
const OTHER_BASE = BASE.replace(currentCity, otherCity)

export default function CitySwitcher() {
  const [city, setCity] = useState<City>(currentCity)

  const onValueChange = (c: City) => {
    // si selecciona la misma no hacemos nada
    if (c === city) return
    // redirige usando env o el derivado
    window.location.href = c === currentCity ? BASE : OTHER_BASE
  }

  return (
  <>
    

    <Select value={city} onValueChange={onValueChange}>
      <Select.Trigger>
        <Select.Value placeholder="Ciudad" />
      </Select.Trigger>
      <Select.Content className='z-50'>
        <Select.Item value="caracas">Caracas</Select.Item>
        <Select.Item value="maracaibo">Maracaibo</Select.Item>
      </Select.Content>
    </Select>
  </>
  )
}