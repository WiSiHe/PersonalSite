import Main from "components/Main"
import Meta from "components/Meta"
import Navigation from "components/Navigation"
import NavigationDrawer from "components/NavigationDrawer"
import { getAllTagsAndPaintings } from "lib/api"
import React from "react"

const Paintings = () => {
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
        okowwwww
      </Main>
    </>
  )
}

export default Paintings

export async function getStaticProps({ preview = false }) {
  const data = await getAllTagsAndPaintings(preview)

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

  const filteredTags = Object.entries(result).filter(w => w[1] > 10)

  const paintings = data.paintings

  // sort paintings randomly
  const randomPaintings = paintings.sort(() => Math.random() - 0.5)

  return {
    props: {
      paintings: randomPaintings,
      tags: filteredTags
    },
    revalidate: 7200 // 120  min
  }
}
