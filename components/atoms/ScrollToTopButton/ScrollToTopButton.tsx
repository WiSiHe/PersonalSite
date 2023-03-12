import clsx from "clsx"
import { AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion"
import { m } from "framer-motion"
// import useScrollPosition from "hooks/useScrollPosition"
import { useState } from "react"
import { IoArrowUpSharp } from "react-icons/io5"

interface iScrollToTopButton {
  isFixed?: boolean
}

const ScrollToTopButton = ({ isFixed = true }: iScrollToTopButton) => {
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
  }

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    })
  }

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
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
          className={clsx(
            "flex-shrink-0",
            isFixed && "fixed z-10 bottom-8 right-8"
          )}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <m.button
            onClick={handleClick}
            whileHover={{ scale: 1.1 }}
            className={clsx(
              "flex items-center rounded-full justify-center p-4 transition-all duration-200 ease-in-out bg-white shadow hover:text-white group hover:bg-primary ring-highlight focus-within:ring hover:ring active:bg-highlight focus:outline-none focus:ring focus-visible:ring-highlight focus-visible:text-white focus-visible:bg-primary"
            )}
          >
            <IoArrowUpSharp />
          </m.button>
        </m.div>
      )}
    </AnimatePresence>
  )
}

export default ScrollToTopButton
