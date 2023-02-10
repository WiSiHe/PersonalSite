export interface iSanityImageAsset {
  _ref: string
  _type: "sanity.imageAsset"
}

export interface iSanityImageCrop {
  _type: "sanity.imageHotspot"
  bottom: number
  left: number
  right: number
  top: number
}
export interface iSanityImageHotspot {
  _type: "sanity.imageHotspot"
  height: number
  width: number
  x: number
  y: number
}

export interface iSanityImage {
  _type: "image"
  asset: iSanityImageAsset
  crop: iSanityImageCrop
  hotspot: iSanityImageHotspot
}
