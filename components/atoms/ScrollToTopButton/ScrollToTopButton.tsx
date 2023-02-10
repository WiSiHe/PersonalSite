import { AnimatePresence } from "framer-motion"
import { m } from "framer-motion"
import useScrollPosition from "hooks/useScrollPosition"
import { IoArrowUpSharp } from "react-icons/io5"

const ScrollToTopButton = () => {
  const scrollPosition = useScrollPosition()

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    })
  }

  return (
    <AnimatePresence>
      {scrollPosition > 400 && (
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
