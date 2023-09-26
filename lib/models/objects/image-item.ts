import { SanityAsset } from "@sanity/asset-utils"

export interface ImageItem {
    _type: "imageItem"
    _key: string
    alt: string
    caption: string
    asset: SanityAsset
}
