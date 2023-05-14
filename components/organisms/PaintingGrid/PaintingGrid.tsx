"use client"
import GreeterCard from "components/molecules/GreeterCard"
import Painting from "components/molecules/Painting/Painting"
import { AnimatePresence, motion } from "framer-motion"
import { iSanityPainting } from "lib/models/objects/sanityPainting"
import { useCombinedStore } from "lib/store"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { isEmptyArray } from "utils/array"
import { sortPaintings } from "utils/painting"
import { slugify } from "utils/string"

interface iPaintingGridProps {
  paintings: iSanityPainting[]
}

const debounce = <F extends (...args: any[]) => any>(
  func: F,
  wait: number
): ((...args: Parameters<F>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null
  return (...args: Parameters<F>) => {
    const later = () => {
      if (timeout !== null) {
        clearTimeout(timeout)
        timeout = null
      }
      func(...args)
    }
    if (timeout !== null) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(later, wait)
  }
}

const PaintingGrid = ({ paintings = [] }: iPaintingGridProps) => {
  const router = useRouter()

  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)

  const allFilter = searchParams?.getAll("filter")

  const [paintingsSlice, setPaintingsSlice] = useState(25)
  const [hasLoadedAllPaintings, setHasLoadedAllPaintings] = useState(false)

  const sorting = useCombinedStore((state) => state.paintingSorting)

  const clearFilterList = useCombinedStore((state) => state.clearFilterList)

  const splitFilters = useMemo(() => {
    if (!allFilter || isEmptyArray(allFilter)) return []
    return allFilter.flatMap((f) => f.split(","))
  }, [allFilter])

  const filterPaintingsV2 = useMemo(() => {
    if (isEmptyArray(splitFilters)) return sortPaintings(paintings, sorting)

    const filteredPaintings = paintings.filter((p) => {
      const paintingTags = p.tagsV2.map((t) => slugify(t.name))
      return splitFilters.every((f) => paintingTags.includes(f))
    })

    return sortPaintings(filteredPaintings, sorting)
  }, [splitFilters, paintings, sorting])

  // functions that load more paintings, and at the end of the list, load more paintings

  function handleClearFilter() {
    clearFilterList()
    router.replace("/")
  }

  const loadMorePaintings = () => {
    if (hasLoadedAllPaintings) return

    // append 25 more paintings to the list
    const newPaintingsSlice = paintingsSlice + 25
    setPaintingsSlice((prev) => prev + 25)

    if (newPaintingsSlice >= paintings.length) {
      setHasLoadedAllPaintings(true)
    }
  }

  const handleScroll = debounce(() => {
    // This code checks to see if all of the paintings have been loaded, or if the user has scrolled to within 100 pixels of the bottom of the page.
    // The purpose of this code is to determine whether or not to load more paintings from the database.

    if (
      hasLoadedAllPaintings ||
      window.innerHeight + document.documentElement.scrollTop <
        document.documentElement.offsetHeight - 1000
    ) {
      return
    }

    loadMorePaintings()
  }, 100)

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)

    // Check for empty paintings array
    if (!paintings.length) return
    setIsLoading(false)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [handleScroll, paintings])

  useEffect(() => {
    if (isEmptyArray(paintings)) return
    setIsLoading(false)
  }, [paintings])

  return (
    <section className="grid items-start w-full grid-cols-12 gap-2 mb-10 xl:gap-4">
      <div className="h-full col-span-full md:col-span-8 lg:col-span-6 xl:col-span-6 2xl:col-span-4">
        <GreeterCard />
      </div>
      <AnimatePresence>
        {!isEmptyArray(filterPaintingsV2) ? (
          filterPaintingsV2.slice(0, paintingsSlice).map((painting) => (
            <div
              key={painting._id}
              className="col-span-6 md:col-span-4 lg:col-span-3 2xl:col-span-2"
            >
              <Painting paintingData={painting} />
            </div>
          ))
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring" }}
              key="no-paintings-found"
              className="flex flex-col items-center gap-2 p-4 g col-span-full md:col-span-6 lg:col-span-8 ring xl:col-span-9 ring-primary "
            >
              <h2 className="text-2xl text-center">
                No paintings found with the selected filters
              </h2>
              <p className="text-center">
                Try removing some filters to see more paintings
              </p>
              <button
                onClick={handleClearFilter}
                className="px-4 py-3 text-white bg-primary hover:bg-primary/90"
              >
                Clear Filters
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}

export default PaintingGrid
