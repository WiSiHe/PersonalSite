import { iSanityImage } from "./sanityImage"

export interface iSanityPainting {
  _id: string
  format: "square" | "landscape" | "portrait"
  image: iSanityImage
  images: iSanityImage[] | null
  imagesCount: number | null
  redbubbleUrl: string | null
  likes: number
  _createdAt: string
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
