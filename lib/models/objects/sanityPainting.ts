import { iSanityImage } from "./sanityImage"

export interface iSanityPainting {
  _id: string
  format: "square" | "landscape" | "portrait"
  image: iSanityImage
  images: iSanityImage[] | null
  imagesCount: number | null
  redbubbleUrl: string | null
  society6Url: string | null
  description: string
  likes: number
  paintedAt: string
  slug: {
    _type: "slug"
    current: string
  }
  tagsV2: {
    name: string
  }[]
  title: string
  video: string
}
