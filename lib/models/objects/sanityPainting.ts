import { iSanityImage } from "./sanityImage"

export interface iSanityPainting {
  _id: string
  format: "square" | "landscape" | "portrait"
  image: iSanityImage | string | null
  images?: iSanityImage[] | null
  imagesCount: number | null
  redbubbleUrl: string | null
  society6Url: string | null
  description: string
  likes: number
  paintedAt: string
  slug: string
  tagsV2: {
    name: string
  }[]
  tagCount: number
  title: string
  video?: string | null
}
