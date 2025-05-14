import { Text } from "@medusajs/ui"


const MedusaCTA = () => {
  return (
    <Text className="flex gap-x-2 txt-compact-small-plus items-center">
      Desarrollado por
      <a className="italic hover:text-red-500 transition-colors duration-500 cursor-pointer underline" href="https://juanchacinportfolio.vercel.app" target="_blank" rel="noreferrer">
        Juan Chacin
      </a>
    </Text>
  )
}

export default MedusaCTA
