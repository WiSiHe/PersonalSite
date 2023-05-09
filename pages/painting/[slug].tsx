import Main from "components/atoms/Main/Main"
import Meta from "components/atoms/Meta/Meta"
import PaintingPage from "components/pages/PaintingPage"
import generatePaintingJsonLd from "helpers/jsonLdHelpers"
import { getAllPaintingSlugs, getPaintingDetails } from "lib/api"
import { iSanityPainting } from "lib/models/objects/sanityPainting"
import { imageBuilder } from "lib/sanity"
import { GetStaticProps } from "next"
import React from "react"
import { isEmptyObject } from "sanity"

interface PreviewData {
  token?: string
}
interface PageProps {
  painting: iSanityPainting
  slug: string
}

// params: { slug: 'full-metal-alchemist-arm' }

interface Query {
  [key: string]: string
}

export default function Gallery({ painting, slug }: PageProps) {
  const { title = "", seoDescription = "", image } = painting

  return (
    <>
      <Meta
        title={title}
        description={seoDescription}
        image={imageBuilder(image).width(128).height(128).quality(75).url()}
        jsonLd={generatePaintingJsonLd(painting)}
        url={`https://wisihe.no/painting/${slug}`}
      />

      <Main
        noTopPadding
        className="flex flex-col min-h-screen p-4 pt-20 mx-auto xl:grid xl:grid-cols-12 xl:gap-4 overflow-clip bg-tertiary max-w-screen-2xl"
      >
        <PaintingPage painting={painting} />
      </Main>
    </>
  )
}

export const getStaticProps: GetStaticProps<
  PageProps,
  Query,
  PreviewData
> = async (ctx) => {
  const { preview = false, previewData = {}, params = {} } = ctx

  if (!params.slug) {
    return {
      notFound: true,
    }
  }

  const token = previewData.token

  const painting = await getPaintingDetails(params.slug, token)

  if (isEmptyObject(painting)) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      painting,
      slug: params.slug,
      preview,
      token: previewData.token ?? null,
    },
    //  revalidate evry 3 hour
    revalidate: 60 * 60 * 3,
  }
}

export async function getStaticPaths() {
  const allPaintings = await getAllPaintingSlugs()

  const paths = allPaintings?.map((painting) => ({
    params: {
      slug: painting.slug,
    },
  }))

  return {
    paths,
    // fallback: "blocking",
    fallback: false,
  }
}
