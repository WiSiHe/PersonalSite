import { iSanityTag } from "./SanityTag"
import { iSanityImage } from "./sanityImage"

type iPaintingFormat = "square" | "landscape" | "portrait"

export interface iSanityPainting {
    _id: string
    format: iPaintingFormat
    image: iSanityImage
    images?: iSanityImage[] | null
    imagesCount: number | null
    redbubbleUrl?: string | null
    society6Url?: string | null
    artstationUrl?: string | null
    inPrintUrl?: string | null
    description?: string
    seoDescription?: string
    likes?: number
    paintedAt: string
    slug: string
    tagsV2: iSanityTag[]
    tagCount?: number | null
    title: string
    video?: string | null
    altText?: string
}

export interface iSanityWallpaperPaintings {
    image: iSanityImage
    _id: string
    lowResImageUrl: string
    imageUrl: string
}
