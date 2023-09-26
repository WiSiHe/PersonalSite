export declare type ImageLoader = (resolverProps: ImageLoaderProps) => string

export declare type ImageLoaderProps = {
    src: string
    width: number
    quality?: number
}

export interface painting {
    blurDataURL: string
    placeholder: "blur" | "empty"
    height: number
    width: number
    src: string
    loader: ImageLoader
}

export interface ISanityImage {
    painting: painting | null
}

export interface Asset {
    _ref: string
    _type: string
}

export interface Image {
    _type: string
    asset: Asset
}

export interface Slug {
    _type: string
    current: string
}

export interface Tag {
    label: string
    value: string
}

export interface ILandingPage {
    _createdAt: Date
    _id: string
    _rev: string
    _type: string
    _updatedAt: Date
    aspectRatio: string
    description: string
    imageUrl: string
    lowResImageUrl: string
    image: Image
    slug: Slug
    tags: Tag[]
    title: string
}
