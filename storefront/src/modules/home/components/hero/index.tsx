'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Image from 'next/image'


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
      thumb:'https://bucket-production-f8f9.up.railway.app/medusa-media/static-assets/pala-agustin-tapia.webp',
      full:'https://bucket-production-f8f9.up.railway.app/medusa-media/static-assets/pala-agustin-tapia-image-home.svg',
      thumbClasses:  'w-[46%] sm:w-[42%] xl:h-auto h-auto',      // pala: 48×36
      fullClasses:   'w-80 h-60',      // opcional: full más grande
      positionClasses: 'absolute bottom-[0%] xl:bottom-[3%] left-[27%] sm:left-[30%] rotate-[0deg] z-10',
    },
    {
      thumb:'https://bucket-production-f8f9.up.railway.app/medusa-media/static-assets/chica-bolso.webp',
      full:'https://bucket-production-f8f9.up.railway.app/medusa-media/static-assets/chica-bolso-full.png',
      thumbClasses:  'w-[36%] sm:w-[35%] lg:w-[35%] xl:w-[31%] xl:h-auto h-auto',      // bolso: 64×48
      fullClasses:   'w-96 h-72',      // full aún más grande
      positionClasses: 'absolute left-[0%] sm:left-[2%] xl:left-[5%] bottom-[0%] md:top-[7%] rotate-[0deg] z-20',

    },
    {
      thumb:'https://bucket-production-f8f9.up.railway.app/medusa-media/static-assets/pala-pelota-figura.webp',
      full:'https://bucket-production-f8f9.up.railway.app/medusa-media/static-assets/pala-pelota-full-.png',
      thumbClasses:  'w-[40%] md:w-[36%] xl:h-48 h-auto',      // bolso: 64×48
      fullClasses:   'w-96 h-72',      // full aún más grande
      positionClasses: 'absolute top-[16%] sm:top-[-1%] md:top-[-4%] md:left-[30%] xl:left-[29%] lg:top-[-4%] xl:top-[4%] left-[26%]   rotate-[0deg] z-20',

    },
    {
      thumb:'https://bucket-production-f8f9.up.railway.app/medusa-media/static-assets/pala-pelota-grama-figura.webp',
      full:'https://bucket-production-f8f9.up.railway.app/medusa-media/static-assets/pala-pelota-grama-full.png',
      thumbClasses:  'w-[40%] xl:h-auto h-auto',      // bolso: 64×48
      fullClasses:   'w-96 h-72',      // full aún más grande
      positionClasses: 'absolute top-[20%] sm:top-[6%] right-[0%] sm:right-[2%] md:top-[0%] xl:md:top-[3%] lg:right-[2%] rotate-[0deg] z-20',

    },
    {
      thumb:'https://bucket-production-f8f9.up.railway.app/medusa-media/static-assets/jugador-padel-figura.webp',
      full:'https://bucket-production-f8f9.up.railway.app/medusa-media/static-assets/jugador-padel-full.png',
      thumbClasses:  'w-[38%] sm:w-[35%] xl:h-auto h-auto',      // bolso: 64×48
      fullClasses:   'w-96 h-72',      // full aún más grande
      positionClasses: 'absolute bottom-[0%] lg:bottom-[2%] right-[0%] sm:right-[2%] rotate-[0deg] z-20',

    },
    
  ]

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div
      className="sm:h-[300px] md:h-[350px] lg:h-[450px] xl:h-[570px] h-48 xl:max-w-[1280px] container mx-auto px-4 w-full border-b border-ui-bg-subtle relative bg-grey-5 mt-12"
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {/* Thumbnails */}
      
        {items.map((item, i) => (
          <motion.div
            key={i}
            onMouseEnter={() => setHoveredIndex(i)}
            className={`overflow-hidden  z-10 ${item.thumbClasses} ${item.positionClasses}`}
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
            className="absolute inset-0 z-20 bg-black rounded-md"
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            exit   ={ { opacity: 0, scale: 0.75 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={items[hoveredIndex].full}
              alt="full preview"
              fill
              className="w-full h-full object-fill rounded-md"
              priority={false}
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
