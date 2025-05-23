import { IoPhonePortraitOutline } from "react-icons/io5"
import { FaWhatsapp, FaInstagram } from "react-icons/fa"
import { HiOutlineMail } from "react-icons/hi"

const MedusaCTA = () => {
  return (
    <div className="flex gap-x-2 txt-compact-small-plus items-center">
      <a
        href="tel:+17866201407"
        target="_blank"
        rel="noopener noreferrer"
      >
        <IoPhonePortraitOutline size={20} />
      </a>

      <a
        href="https://instagram.com/deucepadelclub_"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaInstagram size={20} />
      </a>

      <a
        href="https://api.whatsapp.com/send?phone=17866201407&text=Hola%20necesito%20informacion%20acerca%20de%20sus%20productos"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaWhatsapp size={20} />
      </a>

      <a
        href="mailto:info@deucepadelshop.com?subject=Hola%20Necesito%20informacion.&body=Vengo%20desde%20su%20sitio%20web%20y%20necesito%20informacion"
        target="_blank"
        rel="noopener noreferrer"
      >
        <HiOutlineMail size={20} />
      </a>
    </div>
  )
}

export default MedusaCTA
