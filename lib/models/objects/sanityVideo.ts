import { iSanityTag } from "./SanityTag"

export interface iSanityVideo {
  _id: string
  _type: "video"
  _createdAt: string
  _updatedAt: string
  _rev: string
  title: string
  description: string
  videoUrl: string
  tags: iSanityTag[]
}
