import { m } from "framer-motion"
import { useRouter } from "next/router"
import { IoArrowBackSharp } from "react-icons/io5"

const BackButton = () => {
  const router = useRouter()

  const handleGoBack = () => {
    router.back()
  }

  const buttonVariant = {
    hidden: {
      x: -200,
    },
    visible: {
      x: 0,
    },
    hover: {
      scale: 1.1,
      backgroundColor: "#DE0D92",
    },
    transition: {
      type: "spring",
      // bounce: 0.4,
    },
  }

  return (
    <div className="fixed z-20 top-24 left-4">
      <m.button
        variants={buttonVariant}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        onClick={handleGoBack}
        className="flex items-center justify-center gap-2 px-4 py-2 text-xl text-white transition-all duration-200 ease-in-out shadow-lg bg-primary hover:ring hover:shadow-lg active:bg-highlight focus:outline-none focus:ring focus:ring-highlight "
      >
        <IoArrowBackSharp /> Back
      </m.button>
    </div>
  )
}

export default BackButton
