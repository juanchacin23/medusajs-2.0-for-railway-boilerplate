"use client"

import { Popover, Transition } from "@headlessui/react"
import { ArrowRightMini, XMark, BarsThree, ShoppingBag, MagnifyingGlass, User } from "@medusajs/icons"
import { Text, clx, useToggleState } from "@medusajs/ui"
import { Fragment, useState, useEffect } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CountrySelect from "../country-select"
import { HttpTypes } from "@medusajs/types"
import CitySwitcher from "../../../layout/templates/nav/components/CitySwitcher";

type CatRaw = {
  id: string
  name: string
  handle: string
  rank: number
  // y opcionalmente cualquier otra propiedad que venga
  is_internal?: boolean
  parent_category?: any
  category_children?: CatRaw[]
}

function pruneAndSort(categories: CatRaw[]): CatRaw[] {
  return categories
    .filter(cat => !cat.is_internal)
    .map(cat => ({
      ...cat,
      category_children: pruneAndSort(cat.category_children || []),
    }))
    .sort((a, b) => a.rank - b.rank)
}


const SideMenu = ({ regions }: { regions: HttpTypes.StoreRegion[] | null }) => {
  const [cats, setCats] = useState<CatRaw[]>([])
  const toggleState = useToggleState()

   useEffect(() => {
    fetch("/api/categories")
      .then(res => res.json() as Promise<CatRaw[]>)
      .then(data => {
        const tree = pruneAndSort(data)
        setCats(tree.filter(c => !c.parent_category).slice(0, 6))
      })
  }, [])

  // 1) Inicio
  // 2) Categorías dinámicas
  // 3) Resto de estáticos
  const menuItems = [
    { name: "Inicio", href: "/" },
    ...cats.map(cat => ({
      name: cat.name,
      href: `/categories/${cat.handle}`,
    })),
    { name: "Tienda", href: "/store"},
    /*{ name: "Buscar", href: "/search", Icon: MagnifyingGlass },
    { name: "Cuenta", href: "/account", Icon: User },
    { name: "Carrito", href: "/cart", Icon: ShoppingBag }, */
  ]


  const specialSizes: Record<string,string> = {
    Buscar: "text-xl leading-8",
    Cuenta: "text-xl leading-7",
    Carrito: "text-xl leading-6",
  }

  
  return (
    <div className="h-full">
      <div className="flex items-center h-full">
        <Popover className="h-full flex">
          {({ open, close }) => (
            <>
              <div className="relative flex h-full">
                <Popover.Button
                  data-testid="nav-menu-button"
                  className="relative h-full flex items-center transition-all ease-out duration-200 focus:outline-none hover:text-ui-fg-base"
                >
                   {/* Icono solo en móvil (<768px) */}
                <BarsThree className="block lg:hidden" />

                {/* Texto solo en md+ (≥768px) */}
                <span className="hidden lg:inline">Menu</span>
                </Popover.Button>
              </div>

              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-150"
                enterFrom="opacity-0"
                enterTo="opacity-100 backdrop-blur-2xl"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 backdrop-blur-2xl"
                leaveTo="opacity-0"
              >
                <Popover.Panel className="flex flex-col absolute w-full pr-4 sm:pr-0 sm:w-1/3 2xl:w-1/4 sm:min-w-min h-[calc(100vh-1rem)] z-30 inset-x-0 text-sm text-ui-fg-on-color m-2 backdrop-blur-2xl">
                  <div
                    data-testid="nav-menu-popup"
                    className="flex flex-col h-full bg-[rgba(3,7,18,0.5)] rounded-rounded justify-between p-6"
                  >
                    <div className="flex justify-end z-40" id="xmark">
                      <button data-testid="close-menu-button" onClick={close}>
                        <XMark />
                      </button>
                    </div>
                    <ul className="flex flex-col gap-6 items-start justify-start">
                      {menuItems.map(({ name, href, Icon }) => (
                        
                        
                          <li key={name} className="flex items-center gap-1">
                           {Icon && <Icon />}
                            <LocalizedClientLink
                              href={href}
                              className={clx(specialSizes[name] ?? "text-3xl leading-10", "hover:text-ui-fg-disabled")}
                              onClick={close}
                              data-testid={`${name.toLowerCase()}-link`}
                            >
                              {name}
                            </LocalizedClientLink>
                          </li>
                        
                      ))}
                      <li>
                        <CitySwitcher />
                      </li>
                    </ul>
                    <div className="flex flex-col gap-y-6">
                      <div
                        className="flex justify-between"
                        onMouseEnter={toggleState.open}
                        onMouseLeave={toggleState.close}
                      >
                        {regions && (
                          <CountrySelect
                            toggleState={toggleState}
                            regions={regions}
                          />
                        )}
                        <ArrowRightMini
                          className={clx(
                            "transition-transform duration-150",
                            toggleState.state ? "-rotate-90" : ""
                          )}
                        />
                      </div>
                      <Text className="flex justify-between txt-compact-small">
                        © {new Date().getFullYear()} Deuce Store. Todos los derechos reservados.
                      </Text>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  )
}

export default SideMenu
