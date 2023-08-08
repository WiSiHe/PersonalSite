"use client"
import GreeterCard from "components/molecules/GreeterCard"
import Painting from "components/molecules/Painting/Painting"
import { AnimatePresence, motion } from "framer-motion"
import { iSanityPainting } from "lib/models/objects/sanityPainting"
import { useCombinedStore } from "lib/store"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { isEmptyArray, isNotEmptyArray } from "utils/array"
import { sortPaintings } from "utils/painting"
import { slugify } from "utils/string"
import { cn } from "utils/utility"

interface iPaintingGridProps {
  paintings: iSanityPainting[]
  isStorybook?: boolean
}

const debounce = <F extends (...args: any[]) => void>(
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

const PaintingGrid = ({
  paintings = [],
  isStorybook = false,
}: iPaintingGridProps) => {
  const router = useRouter()

  const searchParams = useSearchParams()

  const allFilter = searchParams?.getAll("filter")

  const [hasLoadedAllPaintings, setHasLoadedAllPaintings] = useState(false)

  const sorting = useCombinedStore((state) => state.paintingSorting)

  // const [paintingsSlice, setPaintingsSlice] = useState(25)
  const paintingsSlice = useCombinedStore((state) => state.paintingSlice)
  const setPaintingsSlice = useCombinedStore((state) => state.setPaintingSlice)

  const clearFilterList = useCombinedStore((state) => state.clearFilterList)

  const splitFilters = useMemo(() => {
    if (!allFilter || isEmptyArray(allFilter)) return []
    return allFilter.flatMap((f) => f.split(","))
  }, [allFilter])

  const hasFilters = isNotEmptyArray(splitFilters)

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
    setPaintingsSlice(newPaintingsSlice)

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

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [handleScroll, paintings])

  useEffect(() => {
    if (isEmptyArray(paintings)) return
  }, [paintings])

  return (
    <section className="grid items-start w-full h-full grid-cols-12 gap-4 mb-10 grid-flow-dense">
      {!hasFilters && (
        <div className="flex flex-col h-full gap-4 col-span-full xl:col-span-6 aspect-auto xl:aspect-auto">
          <GreeterCard />
        </div>
      )}

      <AnimatePresence>
        {!isEmptyArray(filterPaintingsV2) ? (
          filterPaintingsV2
            .slice(0, paintingsSlice)
            .map((painting) => (
              <Painting
                paintingData={painting}
                key={painting._id}
                storybook={isStorybook}
              />
            ))
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring" }}
            key="no-paintings-found"
            className={cn(
              "flex flex-col items-center justify-center h-full gap-2 p-4 rounded-lg col-span-full ring  ring-primary",
              hasFilters ? "bg-primary/10" : "xl:col-span-6"
            )}
          >
            <h2 className="text-2xl text-center">
              No paintings found with the selected filters
            </h2>
            <p className="text-center">
              Try removing some filters to see more paintings
            </p>
            <button
              onClick={handleClearFilter}
              className="px-4 py-3 text-white rounded-lg bg-primary hover:bg-primary/90"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default PaintingGrid
