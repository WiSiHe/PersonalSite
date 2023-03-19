import clsx from "clsx"
import { FilterBar, Footer, Main, Meta, Painting } from "components"
import { motion } from "framer-motion"
import useScrollPosition from "hooks/useScrollPosition"
import { getAllTagsAndPaintingsLight } from "lib/api"
import { iSanityPainting } from "lib/models/objects/sanityPainting"
import { iSanityTag } from "lib/models/objects/SanityTag"
import { useCombinedStore } from "lib/store"
import React, { useEffect, useState } from "react"
import { BiGame } from "react-icons/bi"
import { BsFillBrushFill } from "react-icons/bs"
import { HiOutlineDesktopComputer } from "react-icons/hi"
import { isEmptyArray } from "utils/array"
import { sortPaintings } from "utils/painting"

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
      />
    </div>
  )
}

const Test2 = () => {
  return (
    <div className="flex items-center justify-center col-span-12 row-span-2 text-white lg:col-span-6 aspect-square bg-primary">
      placeholder
      {/* <iframe
        src="https://workshop-shaders.vercel.app/"
        width="100%"
        height="100%"
      /> */}
    </div>
  )
}

const PaintingsPage = ({ paintings = [], tags = [] }: iPaintingsPageProps) => {
  const scrollPosition = useScrollPosition()

  const [paintingsSlice, setPaintingsSlice] = useState(25)
  const [hasLoadedAllPaintings, setHasLoadedAllPaintings] = useState(false)

  const sorting = useCombinedStore((state) => state.paintingSorting)
  const filterList: string[] = useCombinedStore((state) => state.filterList)
  const clearFilterList = useCombinedStore((state) => state.clearFilterList)

  const filteredPaintings = paintings.filter((p) => {
    if (filterList.length === 0) return true

    const paintingTags = p.tagsV2.map((t) => t.name)
    const hasAllTags = filterList.every((f) => paintingTags.includes(f))

    return hasAllTags
  })

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
              className="flex flex-col justify-center h-full gap-4 p-4 text-white xl:p-4 bg-primary col-span-full lg:col-span-6 "
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
                // className="text-4xl @xl:text-purple-500 @6xl:text-red-500   @7xl:text-yellow-400"
              >
                <strong>Henrik Wilhelm Sissener</strong>
              </motion.h1>
              <motion.ul variants={container} initial="hidden" animate="show">
                <motion.li variants={item} className="flex items-center gap-2">
                  <HiOutlineDesktopComputer />
                  <span>Frontend developer</span>
                </motion.li>
                <motion.li variants={item} className="flex items-center gap-2">
                  <BsFillBrushFill />
                  <span>Digital artist</span>
                </motion.li>
                <motion.li variants={item} className="flex items-center gap-2">
                  <BiGame />
                  <span>Game developer</span>
                </motion.li>
              </motion.ul>
            </motion.section>
            {!isEmptyArray(filteredPaintings) ? (
              <>
                {sortPaintings(filteredPaintings, sorting)
                  .slice(0, paintingsSlice)
                  .map((p, i) => {
                    const { _id } = p
                    return (
                      <>
                        {i === 8 && <Test2 key={i} />}
                        {i === 20 && <Test key={i} />}
                        <div
                          key={_id}
                          className={clsx(
                            "aspect-square",
                            "col-span-6 lg:col-span-3"
                          )}
                        >
                          <Painting paintingData={p} />
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
