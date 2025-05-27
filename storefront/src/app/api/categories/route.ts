// app/api/categories/route.ts
import { getCategoriesList } from "@lib/data/categories"
import { NextResponse } from "next/server"

export async function GET() {
  const { product_categories } = await getCategoriesList(0, 100)
  // devuelve todo, sin filtrar
  return NextResponse.json(product_categories)
}
