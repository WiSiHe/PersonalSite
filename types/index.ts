import { PortableTextBlockComponent } from "@portabletext/react"
import type { Image, TypedObject } from "sanity"

import { iSanityPainting } from "@/lib/models/objects/sanityPainting"

export type paintingAspectRatio = "square" | "landscape" | "portrait"

export type Painting = {
    _id: string
    format: paintingAspectRatio
    description?: string
    image: Image
    images?: Image[] | null
    imagesCount: number | null
    seoDescription?: string
    likes?: number
    paintedAt: string
    slug: string
    tagsV2: Tag[]
    tagCount: number | null
    title: string
    video?: string | null
    altText?: string
    redbubbleUrl?: string | null
    society6Url?: string | null
    artstationUrl?: string | null
    inPrintUrl?: string | null
}

export type Tag = {
    name: string
}

export interface MenuItem {
    _type: string
    slug?: string
    title?: string
}

export interface ShowcaseProject {
    _type: string
    image: Image
    slug: string
    tags?: Tag[]
    title: string
    status?: string
    description: string
}

// Page payloads

export interface HomePagePayload {
    title?: string
    paintingsTitle?: string
    projectsTitle?: string
    paintingsCount?: number
    projectsDescription?: TypedObject[]
    paintingsDescription?: TypedObject[]
    showcasePaintings?: iSanityPainting[]
    showcaseProjects?: ShowcaseProject[]
}

export interface PagePayload {
    // body?: PortableTextBlock[]
    name?: string
    // overview?: PortableTextBlock[]
    title?: string
    slug?: string
}

export interface ProjectPayload {
    client?: string
    coverImage?: Image
    // description?: PortableTextBlock[]
    duration?: {
        start?: string
        end?: string
    }
    // overview?: PortableTextBlock[]
    site?: string
    slug: string
    tags?: string[]
    title?: string
}

export interface SettingsPayload {
    // footer?: PortableTextBlock[]
    menuItems?: MenuItem[]
    ogImage?: Image
}
