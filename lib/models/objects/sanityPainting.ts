import { iSanityImage } from "./sanityImage"

interface iTag {
  name: string
}

type iPaintingFormat = "square" | "landscape" | "portrait"

export interface iSanityPainting {
  _id: string
  format: iPaintingFormat
  image: iSanityImage | string
  images?: iSanityImage[] | null
  imagesCount: number | null
  redbubbleUrl: string | null
  society6Url: string | null
  description: string
  paintedAt: string
  slug: string
  tagsV2: iTag[]
  tagCount: number | null
  title: string
  video?: string | null
}
