"use client"
import { AnimatePresence, motion } from "framer-motion"
import { iSanityPainting } from "lib/models/objects/sanityPainting"
import { useCombinedStore } from "lib/store"
import Link from "next/link"
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

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.5,
    },
  },
}

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
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
    <>
      {/* <div className="flex items-center gap-4 pb-8">
        <div className="flex flex-col">
          <label htmlFor="search" className="sr-only">
            Search:
          </label>
          <input
            type="search"
            placeholder="Search"
            id="search"
            className="h-12 px-2 py-1 border border-gray-300 rounded-md"
          />
        </div>
        <button className="flex items-center justify-center h-12 gap-2 px-8 text-white rounded-md lg:px-4 bg-primary">
          <FaSearch />
          Search
        </button>
      </div> */}
      <AnimatePresence>
        <section className="grid w-full grid-cols-12 gap-4 mb-10 grid-flow-dense">
          {!isEmptyArray(filterPaintingsV2) ? (
            filterPaintingsV2.slice(0, paintingsSlice).map((painting, i) => {
              return (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", bounce: 0.25 }}
                  key={painting._id + i}
                  className="col-span-6 rounded-lg lg:col-span-3 focus-within:ring overflow-clip ring-primary hover:ring "
                >
                  <Link href={`/painting/${painting.slug}`}>
                    <div className="flex items-center justify-center text-white bg-primary aspect-portrait">
                      test
                    </div>
                    {/* <Painting
                      paintingData={painting}
                      storybook={isStorybook}
                      key={painting._id}
                    /> */}
                  </Link>
                </motion.div>
              )
            })
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
        </section>
      </AnimatePresence>
    </>
  )
}

export default PaintingGrid
