import { ISanityImage } from "../landingPage"
import { iSanityTag } from "./SanityTag"
import { iSanityImage } from "./sanityImage"
import { iSanityPainting } from "./sanityPainting"
import { iSanityVideo } from "./sanityVideo"

interface iSanitySlug {
  _type: string
  current: string
}

export interface iSanityProject {
  _id: string
  title: string
  description: string
  slug: iSanitySlug
  tags: iSanityTag[]
  status: "onHold" | "inProgress" | "completed" | "cancelled" | "abandoned"
  projectStart: string
  projectEnd: string
  content: any
  connectedPaintings: iSanityPainting[]
  image: iSanityImage
  extraImages: ISanityImage[]
  connectedVideo: iSanityVideo
}

export interface iSanityProjectLight {
  slug: string
}
