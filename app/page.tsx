import GalleryPage from "components/pages/GalleryPage"
import { getAllTagsAndPaintingsLight } from "lib/api"
import { notFound } from "next/navigation"

export const metadata = {
  title: "My Gallery",
  description: "A gallery of some of my paintings",
  locale: "en-US",
  type: "website",
}

export const revalidate = 60 * 60 * 3 // 3 hours

async function getAllPaintings() {
  const { paintings = [], tags = [] } = await getAllTagsAndPaintingsLight()

  const sortedTags = tags
    .filter((tag) => tag.paintingsCount > 2)
    .sort((a, b) => {
      // Put the "Store" tag first
      if (a.name === "Store") return -1
      if (b.name === "Store") return 1

      // Sort by paintingsCount in descending order
      if (b.paintingsCount !== a.paintingsCount) {
        return b.paintingsCount - a.paintingsCount
      }

      // Sort by name if paintingsCount is the same
      return a.name.localeCompare(b.name)
    })

  const randomPaintings = paintings.sort(() => Math.random() - 0.5)

  return { randomPaintings, tags: sortedTags }
}

export default async function Home() {
  const paintings = await getAllPaintings()

  if (!paintings) {
    return notFound()
  }

  const { randomPaintings, tags } = paintings

  return (
    <>
      <GalleryPage paintings={randomPaintings} tags={tags} />
    </>
  )
}
