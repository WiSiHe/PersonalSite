import Meta from "components/atoms/Meta/Meta"
import GalleryPage from "components/pages/GalleryPage"
import { getAllTagsAndPaintingsLight } from "lib/api"
import { iSanityPainting } from "lib/models/objects/sanityPainting"
import { iSanityPaintingTag } from "lib/models/objects/SanityTag"
import React from "react"

interface iPaintingsPageProps {
  paintings: iSanityPainting[]
  tags: iSanityPaintingTag[]
}

const PaintingsPage = ({ paintings = [], tags = [] }: iPaintingsPageProps) => {
  return (
    <>
      <Meta
        title="Gallery"
        url="https://wisihe.no/gallery"
        description="A gallery of some of my paintings"
      />
      <GalleryPage paintings={paintings} tags={tags} />
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
  }: { paintings: iSanityPainting[]; tags: iSanityPaintingTag[] } = data
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
