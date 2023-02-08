/* eslint-disable react-hooks/exhaustive-deps */
import { Filters, Footer, Main, Meta, Painting } from "components"
import { m } from "framer-motion"
import useScrollPosition from "hooks/useScrollPosition"
import { getAllTagsAndPaintingsLight } from "lib/api"
import React, { useEffect, useState } from "react"
import { IoArrowUpSharp } from "react-icons/io5"

import { PaintingsPageProps } from "./[slug]"

const PaintingsPage = ({
  paintings = [],
  tags = [],
  slug = "all",
}: PaintingsPageProps) => {
  const [paintingsSlice, setPaintingsSlice] = useState(25)
  const [hasLoadedAllPaintings, setHasLoadedAllPaintings] = useState(false)

  const scrollPosition = useScrollPosition()

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    })
  }

  // functions that load more paintings, and at the end of the list, load more paintings
  const loadMorePaintings = () => {
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
  }, [scrollPosition, hasLoadedAllPaintings])

  return (
    <>
      <Meta
        title="Gallery"
        url="https://wisihe.no/gallery"
        description="A gallery of some of my paintings"
      />
      <Main noTopPadding className="overflow-clip">
        <section className="relative grid flex-1 flex-grow w-full h-full min-h-screen grid-cols-12 ring">
          <section className="col-span-full">
            <div className="sticky top-0 z-20 px-2 py-4 xl:px-4 bg-bright bg-opacity-30 backdrop-blur-lg">
              <Filters
                filteredTags={tags}
                activeFilter={slug}
                amountOfPaintings={paintings.length}
              />
            </div>
            <div className="p-2 xl:p-4">
              <h1 className="text-2xl font-bold">Welcome to my gallery</h1>
              <p className="mt-2">
                Here you can find some of my paintings. I have a wide range of
                paintings.
              </p>
            </div>

            <div className="grid grid-cols-12 gap-2 p-2 mb-10 xl:gap-4 xl:p-4">
              {paintings.slice(0, paintingsSlice).map((p) => {
                const { _id } = p
                return <Painting paintingData={p} key={_id} />
              })}
            </div>
          </section>
        </section>

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

  const { paintings = [], tags = [] } = data

  const sortedTags = tags
    .filter((p) => p.paintingsCount > 5)
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
