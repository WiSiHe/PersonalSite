import Meta from "components/atoms/Meta/Meta"
import { iSanityImage } from "lib/models/objects/sanityImage"
import { iSanityPainting } from "lib/models/objects/sanityPainting"
import { imageBuilder } from "lib/sanity"
import React from "react"

import { getAllWallpapers } from "../lib/api"
import AboutPage from "components/pages/AboutPage"

export default function Home({
  wallpapers = [],
}: {
  wallpapers: iSanityPainting[]
}) {
  return (
    <>
      <Meta url="https://wisihe.no" />
      <AboutPage wallpapers={wallpapers} />
    </>
  )
}

export async function getStaticProps() {
  // const data = await getAllTagsAndPaintings()
  const data = await getAllWallpapers()

  if (data.length < 1) {
    return { props: {} }
  }

  const { paintings = [] } = data

  // sort paintings randomly
  paintings.sort(() => Math.random() - 0.5)

  const desktopWallpapersWithFetchedImages = paintings.map(
    (wallpaper: { image: iSanityImage }) => ({
      ...wallpaper,
      lowResImageUrl: imageBuilder(wallpaper.image)
        .width(20)
        .height(20)
        .quality(10)
        .url(),
      imageUrl: imageBuilder(wallpaper.image)
        .width(1920)
        .height(1080)
        .quality(75)
        .url(),
    })
  )

  // sort paintings randomly
  const sortedPaintings = desktopWallpapersWithFetchedImages.sort(
    () => Math.random() - 0.5
  )

  return {
    props: {
      desktopWallpaper: sortedPaintings,
    },
    // revalidate every hour
    revalidate: 60 * 60,
  }
}
