import AboutPage from "components/pages/AboutPage"
import { getAllWallpapers } from "lib/api"
import { imageBuilder } from "lib/sanity"
import { notFound } from "next/navigation"

export const metadata = {
  title: "About - WiSiHe",
  description: "About me",
  locale: "en-US",
  type: "website",
}

async function getWallPapers() {
  const { paintings = [] } = await getAllWallpapers()

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

  return sortedPaintings
}

export default async function Home() {
  const wallpapers = await getWallPapers()

  if (!wallpapers) {
    return notFound()
  }

  return <AboutPage wallpapers={wallpapers} />
}
