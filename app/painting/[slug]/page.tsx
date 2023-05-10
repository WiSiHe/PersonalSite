import clsx from "clsx"
import Main from "components/atoms/Main/Main"
import PaintingPage from "components/pages/PaintingPage"
import { getAllPaintingSlugs, getPaintingDetails } from "lib/api"
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

  const { title = "Not found" } = painting

  const combinedTitle = clsx(title, " | WiSiHe")

  return {
    title: combinedTitle,
    description: painting.description,
    openGraph: {
      title: "Acme",
      description: "Acme is a...",
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

  //   if (isEmptyObject(painting)) {
  //     return notFound()
  //   }

  return (
    <Main
      noTopPadding
      className="flex flex-col min-h-screen p-4 pt-20 mx-auto xl:grid xl:grid-cols-12 xl:gap-4 overflow-clip bg-tertiary max-w-screen-2xl"
    >
      <PaintingPage painting={painting} />
    </Main>
  )
}
