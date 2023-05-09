"use client"
import Painting from "components/molecules/Painting/Painting"
import { AnimatePresence, motion } from "framer-motion"
import useScrollPosition from "hooks/useScrollPosition"
import { iSanityPainting } from "lib/models/objects/sanityPainting"
import { useCombinedStore } from "lib/store"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { BiGame } from "react-icons/bi"
import { BsFillBrushFill } from "react-icons/bs"
import { HiOutlineDesktopComputer } from "react-icons/hi"
import { isEmptyArray } from "utils/array"
import { sortPaintings } from "utils/painting"
import { slugify } from "utils/string"

interface iPaintingGridProps {
  paintings: iSanityPainting[]
}

const PaintingGrid = ({ paintings = [] }: iPaintingGridProps) => {
  const router = useRouter()

  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)

  const allFilter = searchParams?.getAll("filter")

  const splitFilters = useMemo(() => {
    if (!allFilter) return []
    if (allFilter && isEmptyArray(allFilter)) return []
    return allFilter.map((f) => f.split(",")).flat()
  }, [allFilter])

  const scrollPosition = useScrollPosition()

  const [paintingsSlice, setPaintingsSlice] = useState(25)
  const [hasLoadedAllPaintings, setHasLoadedAllPaintings] = useState(false)

  const sorting = useCombinedStore((state) => state.paintingSorting)

  const clearFilterList = useCombinedStore((state) => state.clearFilterList)

  const filterPaintingsV2 = useMemo(() => {
    const filteredPaintings = paintings.filter((p) => {
      if (splitFilters && isEmptyArray(splitFilters)) return true
      const paintingTags = p.tagsV2.map((t) => slugify(t.name))
      // console.log("paintingTags", paintingTags)
      // console.log("allFilter", allFilter)
      const hasAllTags = splitFilters?.every((f) => paintingTags.includes(f))
      // console.log("hasAllTags", hasAllTags)

      return hasAllTags
    })
    return sortPaintings(filteredPaintings, sorting)
  }, [splitFilters, paintings, sorting])

  // functions that load more paintings, and at the end of the list, load more paintings
  function loadMorePaintings() {
    if (hasLoadedAllPaintings) return
    // append 25 more paintings to the list
    setPaintingsSlice(paintingsSlice + 25)

    if (paintingsSlice >= paintings.length) {
      setHasLoadedAllPaintings(true)
    }
  }

  function handleClearFilter() {
    clearFilterList()
    router.replace("/")
  }

  useEffect(() => {
    if (hasLoadedAllPaintings) return
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 200
    ) {
      loadMorePaintings()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollPosition, hasLoadedAllPaintings])

  useEffect(() => {
    if (isEmptyArray(paintings)) return
    setIsLoading(false)
  }, [paintings])

  return (
    <section className="grid w-full grid-cols-12 gap-2 mb-10 xl:gap-4">
      <section className="relative flex flex-col justify-center gap-4 p-4 text-white rounded-lg bg-primary overflow-clip xl:p-4 col-span-full md:col-span-6 lg:col-span-4 xl:col-span-3">
        <h1 className="text-4xl">
          <strong>Henrik Wilhelm Sissener</strong>
        </h1>
        <ul>
          <li className="flex items-center gap-2">
            <HiOutlineDesktopComputer />
            <span>Senior Front-end developer</span>
          </li>
          <li className="flex items-center gap-2">
            <BsFillBrushFill />
            <span>Digital artist</span>
          </li>
          <li className="flex items-center gap-2">
            <BiGame />
            <span>Game developer</span>
          </li>
        </ul>
      </section>

      {!isEmptyArray(filterPaintingsV2) ? (
        filterPaintingsV2.map((painting) => (
          <div
            key={painting._id}
            className="col-span-6 lg:col-span-4 xl:col-span-3"
          >
            <Painting paintingData={painting} />
          </div>
        ))
      ) : (
        <AnimatePresence>
          {isLoading ? (
            [...Array(9)].map((_, i) => (
              <div
                key={i}
                className="col-span-6 lg:col-span-4 xl:col-span-3 aspect-square"
              >
                <div className="w-full h-full rounded-lg bg-dark animate-pulse" />
              </div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring" }}
              key="no-paintings-found"
              className="flex flex-col items-center gap-2 p-4 rounded-lg col-span-full md:col-span-6 lg:col-span-8 ring xl:col-span-9 ring-primary "
            >
              <h2 className="text-2xl text-center">
                No paintings found with the selected filters
              </h2>
              <p className="text-center">
                Try removing some filters to see more paintings
              </p>
              <button
                onClick={handleClearFilter}
                className="px-4 py-3 text-white rounded bg-primary hover:bg-primary/90"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </section>
  )
}

export default PaintingGrid
