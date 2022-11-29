import Main from "components/Main"
import Meta from "components/Meta"
import Navigation from "components/Navigation"
import { getAllTags, getAllTagsAndPaintingsLight } from "lib/api"

import React from "react"

// import PaintingGrid from "components/PaintingGrid"

import Filters from "components/Filters"
import Footer from "components/Footer"
import { Painting } from "components"
import { imageBuilder } from "lib/sanity"

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
  title: string
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
  tagsV2: {
    name: string
  }
}

export interface PaintingsPageProps {
  slug: string
  paintings: iPainting[]
  tags: iTag[]
}

const PaintingsPage = ({ slug = "", paintings = [], tags = [] }: PaintingsPageProps) => {
  const tagsWithAll = [{ name: "All" }, ...tags]
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
            <div className="sticky top-0 z-20 p-4 bg-stone-200 bg-opacity-10 backdrop-blur-lg">
              <Filters filteredTags={tagsWithAll} activeFilter={slug} />
            </div>
            {/* <PaintingGrid paintings={paintings} filterTag={slug} /> */}
            <div className="p-4 columns-1 sm:columns-2 md:columns-3 lg:columns-5">
              {paintings
                // .filter(p => p.tags?.find(t => t.name.toLowerCase() === slug || slug === "all"))
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

export async function getStaticProps({ params }) {
  const { slug = "" } = params

  const data = await getAllTagsAndPaintingsLight()

  if (data.length < 1) {
    return { props: {} }
  }

  const imageWidth = {
    square: 400,
    landscape: 800,
    portrait: 400
  }

  const imageHeight = {
    square: 400,
    landscape: 400,
    portrait: 800
  }

  const { paintings = [], tags = [] } = data
  const filteredPaintings =
    paintings.filter(p => p.tagsV2?.find(t => t.name?.toLowerCase() === slug)) || []

  const paintingsWithPriority = filteredPaintings.map(p => {
    const { format = "square", image = {} } = p
    const fetchedPainting = imageBuilder(image)
      .width(imageWidth[format])
      .height(imageHeight[format])
      .quality(45)
      .url()

    return { ...p, fetchedPainting }
  })

  return {
    props: {
      paintings: paintingsWithPriority,
      slug: slug,
      tags
    },
    revalidate: 7200 // 120  min
  }
}

export async function getStaticPaths() {
  const allTags = await getAllTags()

  const paths = allTags.map(tag => {
    const { name = "" } = tag
    if (!name) return
    return {
      params: { slug: tag.name.toLowerCase() }
    }
  })

  return {
    paths,
    fallback: true
  }
}
