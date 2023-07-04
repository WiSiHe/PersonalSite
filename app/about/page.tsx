import AboutPage from "components/pages/AboutPage"
import { getAllWallpapers } from "lib/api"
import { urlForImage } from "lib/sanity.image"
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
    lowResImageUrl: urlForImage(wallpaper.image)
      .width(20)
      .height(20)
      .quality(10)
      .url(),
    imageUrl: urlForImage(wallpaper.image)
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
