"use client"
import { paintingDetailsQuery } from "lib/api"
import { iSanityPainting } from "lib/models/objects/sanityPainting"
import { useLiveQuery } from "next-sanity/preview"
import { isEmptyObject } from "utils/object"

import PaintingPage from "../PaintingPage/PaintingPage"

interface iPaintingPageProps {
  initialPainting: iSanityPainting
}

const PaintingPagePreview = ({ initialPainting }: iPaintingPageProps) => {
  const { slug = "" } = initialPainting

  const [data, loadingPainting] = useLiveQuery(
    initialPainting,
    paintingDetailsQuery,
    { slug },
  )

  if (loadingPainting) return <div>Loading...</div>

  if (!data || isEmptyObject(data)) {
    return <div>Not found</div>
  }
  return <PaintingPage painting={data} />
}

export default PaintingPagePreview
