'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

type Item = { 
  thumb: string; 
  full: string;
  thumbClasses: string  // tamaño/ratio de cada thumb
  fullClasses?:  string // *opcional* si quieres controlar el tamaño del full
  positionClasses: string   // top, left, rotate, z-index…
  }

export default function Hero() {
  const items: Item[] = [
    {
      thumb:'https://bucket-production-f8f9.up.railway.app/medusa-media/static-assets/pala-agustin-tapia.png',
      full:'https://bucket-production-f8f9.up.railway.app/medusa-media/static-assets/pala-agustin-tapia-image-home.svg',
      thumbClasses:  'w-[42%] xl:h-auto h-auto',      // pala: 48×36
      fullClasses:   'w-80 h-60',      // opcional: full más grande
      positionClasses: 'absolute bottom-[0%] left-[27%] rotate-[0deg] z-10',
    },
    {
      thumb:'https://bucket-production-f8f9.up.railway.app/medusa-media/static-assets/chica-bolso.png',
      full:'https://bucket-production-f8f9.up.railway.app/medusa-media/static-assets/chica-bolso-full.svg',
      thumbClasses:  'w-[35%] xl:h-auto h-auto',      // bolso: 64×48
      fullClasses:   'w-96 h-72',      // full aún más grande
      positionClasses: 'absolute top-[7%] rotate-[0deg] z-20',

    },
    {
      thumb:'https://bucket-production-f8f9.up.railway.app/medusa-media/static-assets/pala-pelota-figura.png',
      full:'https://bucket-production-f8f9.up.railway.app/medusa-media/static-assets/pala-pelotaa-full.svg',
      thumbClasses:  'w-[34%] xl:h-48 h-auto',      // bolso: 64×48
      fullClasses:   'w-96 h-72',      // full aún más grande
      positionClasses: 'absolute top-[-2%] lg:top-[0%] xl:top-[2%] left-[26%]  rotate-[0deg] z-20',

    },
    {
      thumb:'https://bucket-production-f8f9.up.railway.app/medusa-media/static-assets/pala-pelota-grama-figura.png',
      full:'https://bucket-production-f8f9.up.railway.app/medusa-media/static-assets/pala-pelota-gramaa-full.svg',
      thumbClasses:  'w-[40%] xl:h-auto h-auto',      // bolso: 64×48
      fullClasses:   'w-96 h-72',      // full aún más grande
      positionClasses: 'absolute top-[0%] right-[5%] rotate-[0deg] z-20',

    },
    {
      thumb:'https://bucket-production-f8f9.up.railway.app/medusa-media/static-assets/jugador-padel-figura.png',
      full:'https://bucket-production-f8f9.up.railway.app/medusa-media/static-assets/jugador-padel-full.svg',
      thumbClasses:  'w-[35%] xl:h-auto h-auto',      // bolso: 64×48
      fullClasses:   'w-96 h-72',      // full aún más grande
      positionClasses: 'absolute bottom-[1%] right-[5%]  rotate-[0deg] z-20',

    },
    
  ]

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div
      className="md:h-[41vh] lg:h-[53vh] xl:h-[75vh] h-[20vh] w-full border-b border-ui-bg-subtle relative bg-grey-5 mt-12"
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {/* Thumbnails */}
      
        {items.map((item, i) => (
          <motion.div
            key={i}
            onMouseEnter={() => setHoveredIndex(i)}
            className={`overflow-hidden z-10 ${item.thumbClasses} ${item.positionClasses}`}
          >
            <motion.img
              src={item.thumb}
              alt={`thumb ${i}`}
              className="w-full h-full object-cover"
              animate={{
                opacity: hoveredIndex === i ? 0 : 1,
                scale:   hoveredIndex === i ? 1.1 : 1,
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        ))}
      

      {/* Full previews */}
      <AnimatePresence>
        {hoveredIndex !== null && (
          <motion.div
            key="full-container"
            className="absolute inset-0 z-20 bg-black"
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            exit   ={ { opacity: 0, scale: 0.75 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={items[hoveredIndex].full}
              alt="full preview"
              className="w-full h-full object-contain"
            />

            <div className="absolute bottom-4 right-0 transform -translate-x-1/2 flex gap-2">
              <button className="px-4 py-2 bg-white rounded shadow">
                Ver detalle
              </button>
              <button className="px-4 py-2 bg-white rounded shadow">
                Comprar
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
