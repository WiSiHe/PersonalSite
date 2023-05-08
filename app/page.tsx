import GalleryPage from "components/pages/GalleryPage"
import { getAllTagsAndPaintingsLight } from "lib/api"
import { notFound } from "next/navigation"

export const metadata = {
  title: "My Gallery",
  description: "A gallery of some of my paintings",
  locale: "en-US",
  type: "website",
}

// default SEO
// export const metadata = {
// 	title: {
// 		default: "Home",
// 		template: "%s | (TR) Next App dir",
// 	},
// 	openGraph: {
// 		title: "(TR) Next App dir",
// 		locale: "en-US",
// 		type: "website",
// 	},
// };

export const revalidate = 3600 // every hour

async function getAllPaintings() {
  const { paintings = [], tags = [] } = await getAllTagsAndPaintingsLight()

  // define tags as iSanityTag

  const sortedTags = tags
    .filter((p) => p.paintingsCount > 2)
    .sort((a, b) => b.paintingsCount - a.paintingsCount)

    // sort tags so that the tag with Store is first
    .sort((a, b) => {
      if (a.name === "Store") {
        return -1
      }
      if (b.name === "Store") {
        return 1
      }
      return 0
    })

  const randomPaintings = paintings.sort(() => Math.random() - 0.5)

  return { randomPaintings, tags: sortedTags }
}

export default async function Home() {
  // revalidate every 3 hour
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
