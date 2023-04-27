import clsx from "clsx"
import Loader from "components/atoms/Loader/Loader"
import Main from "components/atoms/Main/Main"
import Painting from "components/molecules/Painting/Painting"
import dynamic from "next/dynamic"

const FilterBar = dynamic(() => import("components/organisms/FilterBar"))

import { motion } from "framer-motion"
import useScrollPosition from "hooks/useScrollPosition"
import { iSanityPainting } from "lib/models/objects/sanityPainting"
import { iSanityPaintingTag } from "lib/models/objects/SanityTag"
import { useCombinedStore } from "lib/store"
import { useRouter } from "next/router"
// import Script from "next/script"
import { Fragment, useEffect, useMemo, useState } from "react"
import { BiGame } from "react-icons/bi"
import { BsFillBrushFill } from "react-icons/bs"
import { HiOutlineDesktopComputer } from "react-icons/hi"
import { isEmptyArray, isNotEmptyArray } from "utils/array"
import { sortPaintings } from "utils/painting"
import { slugify } from "utils/string"
interface iPaintingsPageProps {
  paintings: iSanityPainting[]
  tags: iSanityPaintingTag[]
}

const GalleryPage = ({ paintings = [], tags = [] }: iPaintingsPageProps) => {
  const router = useRouter()
  const { query } = router

  const { filter = "" } = query

  const filterArray: string[] = useMemo(() => {
    const newArray = Array.isArray(filter) ? filter : [filter]
    return newArray
  }, [filter])

  const scrollPosition = useScrollPosition()

  const [paintingsSlice, setPaintingsSlice] = useState(25)
  const [hasLoadedAllPaintings, setHasLoadedAllPaintings] = useState(false)

  const sorting = useCombinedStore((state) => state.paintingSorting)
  const filterList: string[] = useCombinedStore((state) => state.filterList)

  const hasFilters = isNotEmptyArray(filterList)

  const clearFilterList = useCombinedStore((state) => state.clearFilterList)

  const filterPaintingsV2 = useMemo(() => {
    const filteredPaintings = paintings.filter((p) => {
      if (isEmptyArray(filterArray) || !filter) return true
      const paintingTags = p.tagsV2.map((t) => slugify(t.name))
      const hasAllTags = filterArray.every((f) => paintingTags.includes(f))
      return hasAllTags
    })
    return sortPaintings(filteredPaintings, sorting)
  }, [filter, filterArray, paintings, sorting])

  // functions that load more paintings, and at the end of the list, load more paintings
  function loadMorePaintings() {
    if (hasLoadedAllPaintings) return
    // append 25 more paintings to the list
    setPaintingsSlice(paintingsSlice + 25)

    if (paintingsSlice >= paintings.length) {
      setHasLoadedAllPaintings(true)
    }
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

  if (isEmptyArray(paintings)) {
    return <Loader color="primary" />
  }

  return (
    <Main className="relative grid flex-1 flex-grow w-full h-full min-h-screen grid-cols-12 gap-4 p-4 mx-auto max-w-screen-3xl">
      <section className="col-span-full">
        <FilterBar filters={tags} />
        <div className="grid grid-cols-12 gap-2 mb-10 xl:gap-4 @container">
          {!hasFilters && (
            <section className="relative flex flex-col justify-center gap-4 p-4 text-white rounded-lg bg-primary overflow-clip xl:p-4 col-span-full lg:col-span-4 xl:col-span-3">
              <div
                className={
                  "absolute inset-0 w-full flex items-center justify-center h-full bg-gradient-to-r from-dark via-primary to-highlight animate-gradient-xy mix-blend-hue "
                }
              />
              {/* <RandomShape /> */}
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
          )}
          {isNotEmptyArray(filterPaintingsV2) ? (
            <>
              {filterPaintingsV2.slice(0, paintingsSlice).map((p, i) => {
                const shouldBeLazy = i >= 8
                return (
                  <>
                    {/* {i === 8 && !hasFilters && <Test3 key={i} />} */}
                    <div
                      key={p._id}
                      className={clsx(
                        "col-span-full lg:col-span-4 xl:col-span-3"
                      )}
                    >
                      <Painting paintingData={p} shouldBeLazy={shouldBeLazy} />
                    </div>
                  </>
                )
              })}
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring" }}
              className="flex flex-col items-center justify-center gap-4 p-4 col-span-full ring ring-primary"
            >
              <h2 className="text-2xl text-center">
                No paintings found with the selected filters
              </h2>
              <p className="text-center">
                Try removing some filters to see more paintings
              </p>
              <button
                onClick={clearFilterList}
                className="px-4 py-3 text-white bg-primary hover:bg-primary/90"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </Main>
  )
}

export default GalleryPage
