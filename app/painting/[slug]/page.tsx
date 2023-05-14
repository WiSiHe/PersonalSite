import clsx from "clsx"
import Main from "components/atoms/Main/Main"
import PaintingPage from "components/pages/PaintingPage"
import { getAllPaintingSlugs, getPaintingDetails } from "lib/api"
import { imageBuilder } from "lib/sanity"
import { notFound } from "next/navigation"

export const revalidate = 3600 // every hour

export async function generateStaticParams() {
  const allPaintings = await getAllPaintingSlugs()

  const paths = allPaintings?.map((painting) => ({
    slug: painting.slug,
  }))

  return [paths]
}

// SEO
export async function generateMetadata({ params }: { params: Params }) {
  const painting = await getData(params.slug)

  if (!painting) return null

  const { title = "Not found", seoDescription, image } = painting

  const cleanSEODescription = seoDescription?.replace(/(<([^>]+)>)/gi, "")

  const paintingImageUrl = imageBuilder(image)
    .width(400)
    .height(400)
    .quality(75)
    .url()

  const combinedTitle = clsx(title, " | WiSiHe")

  return {
    title: combinedTitle,
    description: painting.description,
    openGraph: {
      title: combinedTitle,
      description: cleanSEODescription,
      image: paintingImageUrl,
    },
  }
}

async function getData(slug: string) {
  const painting = await getPaintingDetails(slug)
  return painting
}

interface Params {
  slug: string
}

export default async function LandingPage({ params }: { params: Params }) {
  const painting = await getData(params.slug)

  if (!painting) {
    return notFound()
  }

  const {
    title = "Not found",
    seoDescription = "placeholder",
    slug = "",
    image,
    paintedAt,
  } = painting

  const cleanSEODescription = seoDescription?.replace(/(<([^>]+)>)/gi, "")

  const paintingUrl = `https://wisihe.no/painting/${slug}`

  const paintingImageUrl = imageBuilder(image)
    .width(400)
    .height(400)
    .quality(75)
    .url()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VisualArtwork",
    name: title,
    url: paintingUrl,
    image: paintingImageUrl,
    creator: {
      "@type": "Person",
      name: "Henrik Wilhelm Sissener",
      url: "https://wisihe.no/about",
    },
    artform: "Digital Painting",
    dateCreated: paintedAt,
    description: cleanSEODescription,
    artMedium: "Digital",
    // width: "1920",
    // height: "1080",
    inLanguage: "en",
    // copyrightHolder: {
    //   "@type": "Person",
    //   name: "Jane Doe",
    // },
    // offers: {
    //   "@type": "Offer",
    //   availability: "https://schema.org/InStock",
    //   price: "250",
    //   priceCurrency: "USD",
    //   url: "https://example.com/gallery/the-digital-sunrise/order",
    // },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Main
        noTopPadding
        className="flex flex-col min-h-screen p-4 pt-20 mx-auto xl:grid xl:grid-cols-12 xl:gap-4 overflow-clip"
      >
        <PaintingPage painting={painting} />
      </Main>
    </>
  )
}
