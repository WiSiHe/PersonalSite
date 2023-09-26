import { SanityAsset } from "../utils"

export interface Image {
    _type: "mainImage"
    _key: string
    alt: string
    caption: string
    asset: SanityAsset
}
