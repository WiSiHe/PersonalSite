import { motion } from "framer-motion"
import { BiLoaderCircle } from "react-icons/bi"

const Loader = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center text-white">
      <BiLoaderCircle className="text-2xl animate-spin-slow" />
    </div>
  )
}

export default Loader
