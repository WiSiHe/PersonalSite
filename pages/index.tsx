import {
  Footer,
  HeroSectionDesktop,
  HeroSectionMobile,
  Main,
  Meta,
  ScrollSection,
} from "components"
import { iSanityImage } from "lib/models/objects/sanityImage"
import { iSanityPainting } from "lib/models/objects/sanityPainting"
import { imageBuilder } from "lib/sanity"
import React from "react"

import { getAllWallpapers } from "../lib/api"

export default function Home({
  desktopWallpaper = [],
}: {
  desktopWallpaper: iSanityPainting[]
}) {
  return (
    <>
      <Meta url="https://wisihe.no" />

      <Main noTopPadding className="flex-col overflow-clip">
        <HeroSectionMobile paintings={desktopWallpaper} />
        <HeroSectionDesktop paintings={desktopWallpaper} />

        <section
          className="relative w-full max-w-screen-xl px-4 py-10 mx-auto xl:hidden"
          id="main"
        >
          <h1>
            <strong>
              Hi there!
              <br /> My name is <span className="text-primary">He</span>
              nrik <span className="text-primary">Wi</span>
              lhelm <span className="text-primary">Si</span>ssener
            </strong>
          </h1>
          <div className="pt-2 xl:max-w-md">
            <p>
              I&#39;m a digital artist and web developer who enjoys character
              design and landscape painting. In my free time, I create digital
              art and explore programming, game development, and frontend
              technologies.
            </p>
          </div>
        </section>

        {/* <section className="relative py-10 xl:py-10">
          <div className="absolute inset-0 pointer-events-none from-dark/5 bg-gradient-to-t" />
          <SalesPointsSection />
        </section> */}
        <ScrollSection />
      </Main>
      <Footer />
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
