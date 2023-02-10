/* eslint-disable react-hooks/exhaustive-deps */
import {
  Filters,
  Footer,
  Main,
  Meta,
  Painting,
  ScrollToTopButton,
} from "components"
import useScrollPosition from "hooks/useScrollPosition"
import { getAllTagsAndPaintingsLight } from "lib/api"
import { iSanityPainting } from "lib/models/objects/sanityPainting"
import { iSanityTag } from "lib/models/objects/SanityTag"
import React, { useEffect, useState } from "react"

import { PaintingsPageProps } from "./[slug]"

interface iPaintingsPageProps {
  paintings: PaintingsPageProps["paintings"]
  tags: PaintingsPageProps["tags"]
  slug: PaintingsPageProps["slug"]
}

const PaintingsPage = ({
  paintings = [],
  tags = [],
  slug = "all",
}: iPaintingsPageProps) => {
  console.log({ tags })
  const [paintingsSlice, setPaintingsSlice] = useState(25)
  const [hasLoadedAllPaintings, setHasLoadedAllPaintings] = useState(false)

  const scrollPosition = useScrollPosition()

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
        <ScrollToTopButton />
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
