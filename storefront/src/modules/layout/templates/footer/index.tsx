import { getCategoriesList } from "@lib/data/categories"
import { getCollectionsList } from "@lib/data/collections"
import { Text, clx } from "@medusajs/ui"
import Image from "next/image"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import MedusaCTA from "@modules/layout/components/medusa-cta"

type Cat = {
  id: string
  name: string
  handle: string
  rank: number
  is_internal?: boolean
  parent_category?: any
  category_children?: Cat[]
}

function pruneAndSort(categories: Cat[]): Cat[] {
  return categories
    .filter(cat => !cat.is_internal)
    .map(cat => ({
      ...cat,
      category_children: pruneAndSort(cat.category_children || []),
    }))
    .sort((a, b) => a.rank - b.rank)
}

export default async function Footer() {
  const { collections } = await getCollectionsList(0, 6)
  const { product_categories } = await getCategoriesList(0, 100)
  const logoUrl = process.env.NEXT_PUBLIC_LOGO_URL!

 
  // 1) Limpio y ordeno TODO el árbol
  const publicTree = pruneAndSort(product_categories)

   // 2) Extraigo y limito sólo las raíces
  const roots = publicTree
    .filter(c => !c.parent_category)
    .slice(0, 6)

  return (
    <footer className="border-t border-ui-border-base w-full">
      <div className="content-container flex flex-col w-full">
        <div className="flex flex-col gap-y-6 xsmall:flex-row items-start justify-between py-40">
          <div>
            <LocalizedClientLink
              href="/"
              className="txt-compact-xlarge-plus text-ui-fg-subtle hover:text-ui-fg-base uppercase"
            >
                <Image
                  src={logoUrl}
                  alt="Deuce"
                  width={200}      // ajusta al tamaño que necesites
                  height={40}
                  priority         // si quieres que cargue de inmediato
                />
            </LocalizedClientLink>
          </div>
          <div className="text-small-regular gap-10 md:gap-x-16 grid grid-cols-2 sm:grid-cols-3">
            {roots.length > 0 &&  (
              <div className="flex flex-col gap-y-2">
                <span className="txt-small-plus txt-ui-fg-base">
                  Categorias
                </span>
                <ul
                  className="grid grid-cols-1 gap-2"
                  data-testid="footer-categories"
                >
                   {roots.map(root => (
                        <li key={root.id} className="flex flex-col gap-2 text-ui-fg-subtle txt-small">
                          {/* Categoría padre */}
                          <LocalizedClientLink
                            className={clx("hover:text-ui-fg-base", root.category_children?.length && "txt-small-plus")}
                            href={`/categories/${root.handle}`}
                            data-testid="category-link"
                          >
                            {root.name} <span className="text-xs text-gray-500">({root.rank})</span>
                          </LocalizedClientLink>

                          {/* Subcategorías indentadas 
                          {root.category_children.length > 0 && (
                            <ul className="grid grid-cols-1 ml-3 gap-2">
                              {root.category_children.map( child => (
                                <li key={child.id}>
                                  <LocalizedClientLink
                                    className="hover:text-ui-fg-base"
                                    href={`/categories/${child.handle}`}
                                  >
                                    {child.name} ({child.rank})
                                  </LocalizedClientLink>
                                </li>
                              ))}
                            </ul>
                          )}
                          */}
                        </li>
                    ))}

                </ul>
              </div>
            )}
            {collections && collections.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="txt-small-plus txt-ui-fg-base">
                  Colecciones 
                </span>
                <ul
                  className={clx(
                    "grid grid-cols-1 gap-2 text-ui-fg-subtle txt-small",
                    {
                      "grid-cols-2": (collections?.length || 0) > 3,
                    }
                  )}
                >
                  {collections?.slice(0, 6).map((c) => (
                    <li key={c.id}>
                      <LocalizedClientLink
                        className="hover:text-ui-fg-base"
                        href={`/collections/${c.handle}`}
                      >
                        {c.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {/*
            <div className="flex flex-col gap-y-2">
              <span className="txt-small-plus txt-ui-fg-base">seccion adicional</span>
              <ul className="grid grid-cols-1 gap-y-2 text-ui-fg-subtle txt-small">
                <li>
                  <a
                    href=""
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-ui-fg-base"
                  >
                    adicional
                  </a>
                </li>
                <li>
                  <a
                    href=""
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-ui-fg-base"
                  >
                    adicional
                  </a>
                </li>
                <li>
                  <a
                    href=""
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-ui-fg-base"
                  >
                    adicional
                  </a>
                </li>
              </ul>
            </div>
            */}
          </div>
        </div>
        <div className="block sm:flex w-full mb-16 justify-between text-ui-fg-muted">
          <Text className="txt-compact-small mb-4 sm:mb-0">
            © {new Date().getFullYear()} Deuce Store. Todos los derechos reservados.
          </Text>
          <MedusaCTA />
        </div>
      </div>
    </footer>
  )
}
