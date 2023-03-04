import { iSanityPainting } from "lib/models/objects/sanityPainting"

type iSort = "likes" | "newest" | "oldest" | "default" | "random"

export const sortPaintings = (paintings: iSanityPainting[], sort: iSort) => {
  switch (sort) {
    case "likes":
      return paintings.sort((a, b) => b.likes - a.likes)
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
      // return paintings.sort(() => Math.random() - 0.5)
      return paintings
    default:
      return paintings
  }
}
