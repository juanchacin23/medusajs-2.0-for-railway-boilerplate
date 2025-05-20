'use client'
// components/CitySwitcher.tsx
import { useState, ChangeEvent } from 'react'

const options = [
  { label: 'Maracaibo', url: 'https://storefront-maracaibo-production.up.railway.app' },
  { label: 'Caracas', url: 'https://storefront-caracas-production.up.railway.app' },
]

export default function CitySwitcher() {
  const host = typeof window !== 'undefined' ? window.location.host : ''
  const defaultOption = options.find(o => {
    try {
      return new URL(o.url).host === host
    } catch {
      return false
    }
  })
  const initialUrl = defaultOption?.url || options[0].url

  const [selectedUrl, setSelectedUrl] = useState<string>(initialUrl)

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedUrl(e.target.value)
    window.location.href = e.target.value
  }


  return (
    <select defaultValue={selectedUrl} onChange={onChange}>
      {options.map(({ label, url }) => (
        <option key={url} value={url}>
          {label}
        </option>
      ))}
    </select>
  )
}