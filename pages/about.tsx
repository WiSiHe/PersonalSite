import Meta from "components/atoms/Meta/Meta"
import AboutPage from "components/pages/AboutPage"
import { iSanityWallpaperPaintings } from "lib/models/objects/sanityPainting"
import { imageBuilder } from "lib/sanity"
import React from "react"
import { isEmptyArray } from "utils/array"

import { getAllWallpapers } from "../lib/api"

export default function Home({
  wallpapers = [],
}: {
  wallpapers: iSanityWallpaperPaintings[]
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
  const { paintings = [] } = await getAllWallpapers()

  if (isEmptyArray(paintings)) {
    return {
      notFound: true,
    }
  }

  // sort paintings randomly
  paintings.sort(() => Math.random() - 0.5)

  const desktopWallpapersWithFetchedImages = paintings.map((wallpaper) => ({
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
  }))

  // sort paintings randomly
  const sortedPaintings = desktopWallpapersWithFetchedImages.sort(
    () => Math.random() - 0.5
  )

  return {
    props: {
      wallpapers: sortedPaintings,
    },
    // revalidate every four hours
    revalidate: 60 * 60 * 4,
  }
}
