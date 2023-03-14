import clsx from "clsx"
import { FilterBar, Footer, Main, Meta, Painting } from "components"
import useScrollPosition from "hooks/useScrollPosition"
import { getAllTagsAndPaintingsLight } from "lib/api"
import { iSanityPainting } from "lib/models/objects/sanityPainting"
import { iSanityTag } from "lib/models/objects/SanityTag"
import { useCombinedStore } from "lib/store"
import React, { useEffect, useState } from "react"
import { sortPaintings } from "utils/painting"

interface iPaintingsPageProps {
  paintings: iSanityPainting[]
  tags: iSanityTag[]
}

const PaintingsPage = ({ paintings = [], tags = [] }: iPaintingsPageProps) => {
  const [paintingsSlice, setPaintingsSlice] = useState(25)
  const [hasLoadedAllPaintings, setHasLoadedAllPaintings] = useState(false)

  const sorting = useCombinedStore((state) => state.paintingSorting)
  const filterList: string[] = useCombinedStore((state) => state.filterList)

  const filteredPaintings = paintings.filter((p) => {
    if (filterList.length === 0) return true

    const paintingTags = p.tagsV2.map((t) => t.name)
    const hasAllTags = filterList.every((f) => paintingTags.includes(f))

    return hasAllTags
  })

  const colStyle = useCombinedStore((state) => state.colStyle)

  const scrollPosition = useScrollPosition()

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
      <Main className="overflow-clip">
        <section className="relative grid flex-1 flex-grow w-full h-full min-h-screen grid-cols-12 ring">
          <section className="col-span-full">
            <div className="p-2 xl:p-4">
              <h1 className="">Welcome to my gallery</h1>
              <p className="mt-2">
                Here you can find some of my paintings. I have a wide range of
                paintings.
              </p>
            </div>
            <FilterBar filters={tags} />
            <div className="grid grid-cols-12 gap-4 p-4 mb-10">
              {sortPaintings(filteredPaintings, sorting)
                .slice(0, paintingsSlice)
                .map((p) => {
                  const { _id } = p
                  return (
                    <div
                      key={_id}
                      className={clsx(
                        "aspect-square",
                        "col-span-6 xl:col-span-3"
                        // colStyle
                      )}
                    >
                      <Painting paintingData={p} />
                    </div>
                  )
                })}
            </div>
          </section>
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
