import { AnimatePresence, motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { IoArrowBackSharp } from "react-icons/io5"

const buttonVariant = {
  hidden: {
    x: -200,
  },
  visible: {
    x: 0,
  },
}

const BackButton = () => {
  const router = useRouter()

  const [isHovered, setIsHovered] = useState(false)

  const handleGoBack = () => {
    router.back()
  }

  return (
    <div className="fixed z-20 top-24 left-2 overflow-clip">
      <motion.button
        key="backButton"
        variants={buttonVariant}
        initial="hidden"
        animate="visible"
        layout
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleGoBack}
        className="flex items-center gap-2 min-w-[120px] justify-center px-4 py-2 text-xl text-white transition-all ease-in-out overflow-clip group bg-primary active:bg-highlight focus:outline-none focus:ring focus:ring-highlight "
      >
        <AnimatePresence>
          {!isHovered && (
            <motion.div
              key="icon-1"
              initial={{ width: 0, scale: 0, x: -100 }}
              animate={{ width: "auto", scale: 1, x: 0 }}
              exit={{ width: 0, scale: 0, x: -100 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="overflow-clip"
            >
              <IoArrowBackSharp />
            </motion.div>
          )}
          <span>Back</span>

          {isHovered && (
            <motion.div
              key="icon-2"
              initial={{ width: 0, scale: 0, x: 100 }}
              animate={{ width: "auto", scale: 1, x: 0 }}
              exit={{ width: 0, scale: 0, x: 100 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="overflow-clip"
            >
              <IoArrowBackSharp />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}

export default BackButton
