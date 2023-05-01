export interface iSanityTag {
  _id?: string
  name: string
  description?: string | null
}

export interface iSanityPaintingTag extends iSanityTag {
  paintingsCount: number
}

export interface iSanityVideoTag extends iSanityTag {
  videoCount: number
}

export interface iSanityProjectTag extends iSanityTag {
  projectCount: number
}

export interface iSanityTagV2 {
  _id?: string
  name: string
}
