'use client'
// components/CitySwitcher.tsx
import { ChangeEvent } from 'react'

const options = [
  { label: 'Maracaibo', url: 'https://storefront-maracaibo-production.up.railway.app' },
  { label: 'Caracas', url: 'https://storefront-caracas-production.up.railway.app' },
]

export default function CitySwitcher() {
  // Determina cuál option debe salir seleccionado al montar
  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : ''
  const defaultUrl = options.find(o => currentOrigin.startsWith(o.url))?.url || options[0].url

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    window.location.href = e.target.value
  }

  return (
    <select defaultValue={defaultUrl} onChange={onChange}>
      {options.map(({ label, url }) => (
        <option key={url} value={url}>
          {label}
        </option>
      ))}
    </select>
  )
}