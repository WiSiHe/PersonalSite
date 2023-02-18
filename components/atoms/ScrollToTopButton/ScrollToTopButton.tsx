import { AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion"
import { m } from "framer-motion"
// import useScrollPosition from "hooks/useScrollPosition"
import { useState } from "react"
import { IoArrowUpSharp } from "react-icons/io5"

const ScrollToTopButton = () => {
  // const scrollPosition = useScrollPosition()
  const { scrollYProgress } = useScroll()

  const [shouldDisplayButton, setShouldDisplayButton] = useState(false)

  const buttonVariants = {
    hidden: {
      opacity: 0,
      y: 100,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 1,
      },
    },
    visible: {
      opacity: 1,
      y: 0,

      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 1,
      },
    },
    hover: {
      scale: 1.1,
      backgroundColor: "#DE0D92",

      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 1,
      },
    },
  }

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    })
  }

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    console.log("Page scroll: ", latest)
    if (latest > 0.02) {
      setShouldDisplayButton(true)
    } else if (latest < 0.02 && shouldDisplayButton) {
      setShouldDisplayButton(false)
    }
  })

  return (
    <AnimatePresence>
      {shouldDisplayButton && (
        <m.div
          variants={buttonVariants}
          className="fixed z-10 bottom-8 right-8"
          initial="hidden"
          animate="visible"
          exit="hidden"
          whileHover="hover"
        >
          <button
            onClick={handleClick}
            className="flex items-center justify-center p-2 text-2xl transition-all duration-200 ease-in-out bg-white shadow hover:text-white group hover:bg-primary ring-highlight focus-within:ring hover:ring active:bg-highlight focus:outline-none focus:ring focus-visible:ring-highlight focus-visible:text-white focus-visible:bg-primary"
          >
            <IoArrowUpSharp className="" />
          </button>
        </m.div>
      )}
    </AnimatePresence>
  )
}

export default ScrollToTopButton
