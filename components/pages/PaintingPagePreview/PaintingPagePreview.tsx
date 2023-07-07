"use client"
import { paintingDetailsQuery } from "lib/api"
import { iSanityPainting } from "lib/models/objects/sanityPainting"
import { useLiveQuery } from "next-sanity/preview"

import PaintingPage from "../PaintingPage/PaintingPage"

interface iPaintingPageProps {
  painting: iSanityPainting
}

const PaintingPagePreview = ({ painting }: iPaintingPageProps) => {
  const { slug = "" } = painting

  const [{ painting: paintingPreview }, loadingPainting] = useLiveQuery<{
    painting: iSanityPainting
  }>({ painting }, paintingDetailsQuery, {
    slug: slug,
    // refreshInterval: 1000,
  })
  console.log({ paintingPreview, loadingPainting })
  console.log({ painting })
  if (loadingPainting) return <div>Loading...</div>
  return <PaintingPage painting={paintingPreview} />
}

export default PaintingPagePreview
