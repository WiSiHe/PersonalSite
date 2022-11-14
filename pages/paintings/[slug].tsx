import Main from "components/Main"
import Meta from "components/Meta"
import Navigation from "components/Navigation"
import { getAllTagsAndPaintings } from "lib/api"
import React from "react"

// import PaintingGrid from "components/PaintingGrid"

import Filters from "components/Filters"
import Footer from "components/Footer"
import Painting from "components/PaintingV3"

export interface iTag {
  label: string
  count: number
}
export interface iPaintingTag {
  label: string
  value: string
}

export interface iPainting {
  _id: string
  _type: string
  _rev: string
  _createdAt: string
  _updatedAt: string
  aspectRatio?: string
  redbubbleUrl?: string
  slug: {
    current: string
    _type: string
  }
  image: {
    _type: string
    asset: {
      _ref: string
      _type: string
    }
  }
  tags: iPaintingTag[]
}

export interface PaintingsPageProps {
  slug: string
  paintings: iPainting[]
  tags: iTag[]
}

const PaintingsPage = ({ slug = "", paintings = [], tags = [] }: PaintingsPageProps) => {
  return (
    <>
      <Meta
        title="Gallery"
        url="https://wisihe.no/gallery"
        description="A gallery of some of my paintings"
      />
      <Navigation />

      <Main noTopPadding>
        <section className="relative grid flex-1 flex-grow h-full min-h-screen grid-cols-12 overflow-clip">
          <section className="col-span-full">
            <div className="sticky top-0 z-10 p-4 bg-stone-200 bg-opacity-10 backdrop-blur-lg">
              <Filters filteredTags={tags} activeFilter={slug} />
            </div>
            {/* <PaintingGrid paintings={paintings} filterTag={slug} /> */}
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

export async function getStaticProps({ params, preview = false }) {
  const { slug = "" } = params

  const data = await getAllTagsAndPaintings(preview)

  if (data.length < 1) {
    return { props: {} }
  }

  const paintings = data.paintings
  const filteredPaintings = paintings.filter(p => p.tags?.find(t => t.value.toLowerCase() === slug))

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
  const randomPaintings = filteredPaintings.sort(() => Math.random() - 0.5)

  return {
    props: {
      paintings: randomPaintings,
      slug: slug,
      tags: alltags
    },
    revalidate: 7200 // 120  min
  }
}

export async function getStaticPaths() {
  const data = await getAllTagsAndPaintings()

  if (data.length < 1) {
    return { props: {} }
  }

  const flattenedTags = data.tags.filter(tag => tag !== null).flat()

  const tagValues = flattenedTags.map(tag => tag.label)

  const result = {}

  for (let i = 0; i < tagValues.length; ++i) {
    if (!result[tagValues[i]]) result[tagValues[i]] = 0
    ++result[tagValues[i]]
  }

  const convertedResult = Object.entries(result).map(w => {
    return {
      label: w[0],
      count: w[1]
    }
  })

  const paintings = data.paintings
  const allTag = { label: "all", count: paintings.length }

  const alltags = [allTag, ...convertedResult]

  const paths = alltags.map(tag => {
    return {
      params: {
        slug: tag.label.toLocaleLowerCase(),
        tags: alltags
      }
    }
  })

  return {
    paths: paths,
    fallback: true
  }
}
