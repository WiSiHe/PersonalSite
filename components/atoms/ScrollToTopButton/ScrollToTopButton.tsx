import { AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion"
import { m } from "framer-motion"
import useScrollPosition from "hooks/useScrollPosition"
import { useState } from "react"
import { IoArrowUpSharp } from "react-icons/io5"

const ScrollToTopButton = () => {
  const scrollPosition = useScrollPosition()
  const { scrollYProgress } = useScroll()

  const [shouldDisplayButton, setShouldDisplayButton] = useState(false)

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
          className="fixed z-10 bottom-8 right-8"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: "spring" }}
          key="backbutton"
        >
          <button
            onClick={handleClick}
            className="flex items-center justify-center p-2 text-2xl transition-all duration-200 ease-in-out bg-white shadow active:bg-highlight focus:outline-none focus:ring focus:ring-highlight"
          >
            <IoArrowUpSharp />
          </button>
        </m.div>
      )}
    </AnimatePresence>
  )
}

export default ScrollToTopButton
