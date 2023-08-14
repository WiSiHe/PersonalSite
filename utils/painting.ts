import { iSanityPainting } from "lib/models/objects/sanityPainting"

type iSort = "likes" | "newest" | "oldest" | "default" | "random"

type imageFormat = "square" | "landscape" | "portrait"

const imageFormatStyle = {
  square: "aspect-square",
  landscape: "aspect-video",
  portrait: "aspect-[9/16]",
}

export const sortPaintings = (paintings: iSanityPainting[], sort: iSort) => {
  switch (sort) {
    // case "likes":
    //   return paintings.sort((a, b) => b.likes - a.likes)
    case "newest":
      return paintings.sort((a, b) => {
        const dateA = new Date(a.paintedAt)
        const dateB = new Date(b.paintedAt)
        return dateB.getTime() - dateA.getTime()
      })
    case "oldest":
      return paintings.sort((a, b) => {
        const dateA = new Date(a.paintedAt)
        const dateB = new Date(b.paintedAt)
        return dateA.getTime() - dateB.getTime()
      })
    case "random":
      return paintings.sort(() => Math.random() - 0.5)
    // return paintings
    default:
      return paintings
  }
}

export const paintingAspectRatio = (format: imageFormat) => {
  return imageFormatStyle[format]
}

export const paintingImageWidth = (format: imageFormat) => {
  return imageWidth[format]
}

export const paintingImageHeight = (format: imageFormat) => {
  return imageHeight[format]
}

const imageWidth = {
  square: 400,
  landscape: 600,
  portrait: 400,
}

const imageHeight = {
  square: 400,
  landscape: 450,
  portrait: 600,
}
