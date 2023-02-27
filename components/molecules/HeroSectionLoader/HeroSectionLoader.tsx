import { AnimatePresence, m } from "framer-motion"
import { useEffect, useState } from "react"

const HeroSectionLoader = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="absolute inset-0 z-20 grid w-full h-full grid-cols-12 pointer-events-none">
      <AnimatePresence>
        {!mounted && (
          <>
            <m.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 flex items-center justify-center bg-white "
            ></m.div>

            <m.div
              initial={{ x: 0 }}
              animate={{ x: 0 }}
              exit={{ x: -5000 }}
              transition={{ duration: 2, delay: 1, type: "spring" }}
              className="z-20 w-full col-span-6 col-start-1 bg-dark"
            />

            <m.div
              initial={{ x: 0 }}
              animate={{ x: 0 }}
              exit={{ x: 5000 }}
              transition={{ duration: 2, delay: 1, type: "spring" }}
              className="z-20 w-full col-span-3 col-start-10 bg-dark"
            />

            <m.div
              initial={{ x: 0 }}
              animate={{ x: 0 }}
              exit={{ x: -5000 }}
              transition={{ duration: 2, delay: 1.1, type: "spring" }}
              className="z-20 w-full col-span-1 col-start-1 bg-darj"
            />

            <m.div
              initial={{ x: 0 }}
              animate={{ x: 0 }}
              exit={{ x: 5000 }}
              transition={{ duration: 2, delay: 1.1, type: "spring" }}
              className="z-20 w-full col-span-9 col-start-4 bg-dark"
            />

            <m.div
              initial={{ x: 0 }}
              animate={{ x: 0 }}
              exit={{ x: -5000 }}
              transition={{ duration: 2, delay: 1.1, type: "spring" }}
              className="z-20 w-full col-span-8 col-start-1 bg-dark"
            />
          </>
        )}
      </AnimatePresence>
    </section>
  )
}

export default HeroSectionLoader
