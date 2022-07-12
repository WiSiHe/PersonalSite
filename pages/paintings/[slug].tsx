import Main from "components/Main"
import Meta from "components/Meta"
import Navigation from "components/Navigation"
import NavigationDrawer from "components/NavigationDrawer"
import { getAllPaintings, getAllTagsAndPaintings } from "lib/api"
import React from "react"

import PaintingGrid from "components/PaintingGrid"

export interface iTag {
  label: string
  count: number
}

const Paintings = ({ slug, paintings }) => {
  return (
    <>
      <Meta
        title="Gallery"
        url="https://wisihe.no/gallery"
        description="A gallery of some of my paintings"
      />
      <Navigation hideOnDesktop darkMode />
      <NavigationDrawer />
      <Main noTopPadding className="flex flex-col flex-1 overflow-hidden">
        <h1>Slug: {slug}</h1>
        <PaintingGrid paintings={paintings} filterTag={slug} />
      </Main>
    </>
  )
}

export default Paintings

export async function getStaticProps({ params, preview = false }) {
  const { slug = "" } = params
  const data = await getAllPaintings(preview)

  if (data.length < 1) {
    return { props: {} }
  }

  const paintings = data
  console.log("paintings", data)

  const filteredPaintings = paintings.filter(p => p.tags?.find(t => t.value.toLowerCase() === slug))
  console.log("filteredPaintings", filteredPaintings)

  // sort paintings randomly
  // const randomPaintings = paintings.sort(() => Math.random() - 0.5)

  return {
    props: {
      paintings: filteredPaintings,
      slug: slug
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

  // convert result to object with name and count

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
        slug: tag.label
      }
    }
  })

  return {
    paths: paths,
    fallback: true
  }
}
