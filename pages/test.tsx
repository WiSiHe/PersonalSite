import Filters from "components/Filters"
import Main from "components/Main"
import Meta from "components/Meta"
import Navigation from "components/Navigation"

import { getAllTagsAndPaintings } from "lib/api"
import React from "react"

import Footer from "components/Footer"
import { PaintingsPageProps } from "./paintings/[slug]"
import Painting from "components/PaintingV3"

const PaintingsPage = ({ paintings, tags, slug = "all" }: PaintingsPageProps) => {
  return (
    <>
      <Meta
        title="Gallery"
        url="https://wisihe.no/gallery"
        description="A gallery of some of my paintings"
      />
      <Navigation />
      <Main noTopPadding className="overflow-clip">
        <section className="relative grid flex-1 flex-grow w-full h-full min-h-screen grid-cols-12 ring">
          <section className="col-span-full">
            <div className="sticky top-0 z-10 p-4 bg-stone-200 bg-opacity-30 backdrop-blur-lg">
              <Filters filteredTags={tags} activeFilter={slug} />
            </div>

            <div className="p-4 columns-1 sm:columns-2 md:columns-3 lg:columns-5">
              {paintings
                .filter(p => p.tags?.find(t => t.value.toLowerCase() === slug || slug === "all"))
                .map((p, i) => (
                  <div key={i} className="mb-4">
                    <Painting paintingData={p} index={i} />
                  </div>
                ))}
            </div>
          </section>
        </section>
      </Main>
      <Footer />
    </>
  )
}

export default PaintingsPage

export async function getStaticProps({ preview = false }) {
  const data = await getAllTagsAndPaintings(preview)

  if (data.length < 1) {
    return { props: {} }
  }

  const paintings = data.paintings

  const flattenedTags = data.tags.filter(tag => tag !== null).flat()
  const tagValues = flattenedTags.map(tag => tag.label)

  const result = {}

  for (let i = 0; i < tagValues.length; ++i) {
    if (!result[tagValues[i]]) result[tagValues[i]] = 0
    ++result[tagValues[i]]
  }

  // convert result to object with name and count

  const convertedResult = Object.entries(result).map(w => {
    return {
      label: w[0],
      count: w[1]
    }
  })

  const allTag = { label: "all", count: paintings.length }

  const alltags = [allTag, ...convertedResult]
    .filter(t => t.count > 5)
    .sort((a, b) => b.count - a.count)

  // sort paintings randomly
  const randomPaintings = paintings.sort(() => Math.random() - 0.5)

  return {
    props: {
      paintings: randomPaintings,
      tags: alltags
    },
    revalidate: 7200 // 120  min
  }
}
