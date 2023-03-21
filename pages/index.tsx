import clsx from "clsx"
import { FilterBar, Footer, Main, Meta, Painting } from "components"
import { motion } from "framer-motion"
import useScrollPosition from "hooks/useScrollPosition"
import { getAllTagsAndPaintingsLight } from "lib/api"
import { iSanityPainting } from "lib/models/objects/sanityPainting"
import { iSanityTag } from "lib/models/objects/SanityTag"
import { useCombinedStore } from "lib/store"
import { useRouter } from "next/router"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import { BiGame } from "react-icons/bi"
import { BsFillBrushFill } from "react-icons/bs"
import { HiOutlineDesktopComputer } from "react-icons/hi"
import { isEmptyArray, isNotEmptyArray } from "utils/array"
import { sortPaintings } from "utils/painting"
import { slugify } from "utils/string"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 1,
      staggerChildren: 0.5,
    },
  },
}

const item = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0 },
}

interface iPaintingsPageProps {
  paintings: iSanityPainting[]
  tags: iSanityTag[]
}

const Test = () => {
  return (
    <div className="flex items-center justify-center col-span-12 row-span-2 text-white lg:col-span-6 aspect-square">
      <iframe
        src="https://my.spline.design/untitled-1d78fd428f4d7531d03185f67d730969/"
        width="100%"
        height="100%"
        title="spline"
      />
    </div>
  )
}

const Test2 = () => {
  return (
    <div className="flex items-center justify-center col-span-12 row-span-2 text-white lg:col-span-6 aspect-square bg-primary">
      <iframe
        src="https://workshop-shaders.vercel.app/"
        width="100%"
        height="100%"
        className="overflow-hidden pointer-events-none"
        title="shader"
      />
    </div>
  )
}

const PaintingsPage = ({ paintings = [], tags = [] }: iPaintingsPageProps) => {
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

  // todo  add sorting to the filter from query params
  // const filteredPaintings = paintings.filter((p) => {
  //   if (isEmptyArray(filterArray) || !filter) return true
  //   const paintingTags = p.tagsV2.map((t) => slugify(t.name))
  //   const hasAllTags = filterArray.every((f) => paintingTags.includes(f))
  //   return hasAllTags
  // })

  {
    /* {i === 8 && !hasFilters && <Test key={i} />}
                      {i === 20 && !hasFilters && <Test2 key={i} />} */
  }

  const filterPaintingsV2 = useMemo(() => {
    const filteredPaintings = paintings.filter((p) => {
      if (isEmptyArray(filterArray) || !filter) return true
      const paintingTags = p.tagsV2.map((t) => slugify(t.name))
      const hasAllTags = filterArray.every((f) => paintingTags.includes(f))
      return hasAllTags
    })
    return sortPaintings(filteredPaintings, sorting)
  }, [filter, filterArray, paintings, sorting])

  // useEffect(() => {
  //   if (isEmptyArray(filterArray)) return

  // }, [filterArray])

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

  return (
    <>
      <Meta
        title="Gallery"
        url="https://wisihe.no/gallery"
        description="A gallery of some of my paintings"
      />
      <Main className="relative grid flex-1 flex-grow w-full h-full min-h-screen grid-cols-12 gap-4 p-4">
        <section className="col-span-full">
          <FilterBar filters={tags} />
          <div className="grid grid-cols-12 gap-2 mb-10 xl:gap-4 @container">
            {!hasFilters && (
              <motion.section
                initial={{
                  opacity: 0,
                  scale: 0.9,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  type: "spring",
                }}
                className="flex flex-col justify-center h-full gap-4 p-4 text-white rounded-lg xl:p-4 bg-primary col-span-full lg:col-span-4 xl:col-span-3"
              >
                <motion.h1
                  initial={{
                    opacity: 0,
                    x: -40,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    type: "spring",
                  }}
                  className="text-4xl  @6xl:text-5xl  @7xl:text-7xl"
                >
                  <strong>Henrik Wilhelm Sissener</strong>
                </motion.h1>
                <motion.ul variants={container} initial="hidden" animate="show">
                  <motion.li
                    variants={item}
                    className="flex items-center gap-2"
                  >
                    <HiOutlineDesktopComputer />
                    <span>Frontend developer</span>
                  </motion.li>
                  <motion.li
                    variants={item}
                    className="flex items-center gap-2"
                  >
                    <BsFillBrushFill />
                    <span>Digital artist</span>
                  </motion.li>
                  <motion.li
                    variants={item}
                    className="flex items-center gap-2"
                  >
                    <BiGame />
                    <span>Game developer</span>
                  </motion.li>
                </motion.ul>
              </motion.section>
            )}
            {isNotEmptyArray(filterPaintingsV2) ? (
              <>
                {filterPaintingsV2.slice(0, paintingsSlice).map((p, i) => {
                  const { _id } = p
                  console.log("p", p)
                  const shouldBeLazy = i >= 8
                  return (
                    <>
                      <div
                        key={_id}
                        className={clsx(
                          "aspect-square",
                          "col-span-6 lg:col-span-4 xl:col-span-3"
                        )}
                      >
                        <Painting
                          paintingData={p}
                          shouldBeLazy={shouldBeLazy}
                        />
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
      <Footer />
    </>
  )
}

export default PaintingsPage

export async function getStaticProps() {
  const data = await getAllTagsAndPaintingsLight()

  if (data.length < 1) {
    return { props: {} }
  }

  const {
    paintings = [],
    tags = [],
  }: { paintings: iSanityPainting[]; tags: iSanityTag[] } = data
  // define tags as iSanityTag

  const sortedTags = tags
    .filter((p) => p.paintingsCount > 2)
    .sort((a, b) => b.paintingsCount - a.paintingsCount)

  const randomPaintings = paintings.sort(() => Math.random() - 0.5)

  return {
    props: {
      paintings: randomPaintings,
      tags: sortedTags,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  }
}
