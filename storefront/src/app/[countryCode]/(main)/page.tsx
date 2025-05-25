import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { getCollectionsWithProducts } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "Deuce",
  description:
    "Tu tienda de padel online. Compra palas, ropa y accesorios de padel.",
}

export default async function Home({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  const collections = await getCollectionsWithProducts(countryCode)
  const region = await getRegion(countryCode)

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <Hero />
      <div className="pb-12 xl:pt-1 pt-4">
        <ul className="flex flex-col gap-x-4">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div>
    </>
  )
}
