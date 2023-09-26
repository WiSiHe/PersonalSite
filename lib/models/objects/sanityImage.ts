export interface iSanityImageAsset {
    _ref: string
    _type: string
}

export interface iSanityImageCrop {
    _type: string
    bottom: number
    left: number
    right: number
    top: number
}
export interface iSanityImageHotspot {
    _type: string
    height: number
    width: number
    x: number
    y: number
}

export interface iSanityImage {
    _type: string
    _key?: string
    asset: iSanityImageAsset
    crop?: iSanityImageCrop
    hotspot?: iSanityImageHotspot
    lqip?: string
}
