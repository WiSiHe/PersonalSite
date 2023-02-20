import {
  Footer,
  HeroSection,
  Main,
  Meta,
  SalesPointsSection,
  ScrollSection,
} from "components"
import { m } from "framer-motion"
import { iSanityImage } from "lib/models/objects/sanityImage"
import { iSanityPainting } from "lib/models/objects/sanityPainting"
// import useWindowDimensions from "hooks/useWindowDimension"
import { imageBuilder } from "lib/sanity"
import Image from "next/image"
import portrait from "public/images/selfPortrait.png"
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
        <HeroSection paintings={desktopWallpaper} />

        <section
          className="relative w-full max-w-screen-xl px-4 py-4 mx-auto xl:py-10"
          id="main"
        >
          <m.div
            initial={{ opacity: 0, x: -100 }}
            transition={{ type: "spring", duration: 0.5, delay: 0.5 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            className="order-2 col-span-9 xl:col-start-1 xl:col-span-6"
          >
            <h1>
              <strong>
                Hi there!
                <br /> My name is <span className="text-primary">He</span>
                nrik <span className="text-primary">Wi</span>
                lhelm <span className="text-primary">Si</span>ssener
              </strong>
            </h1>
            <div className="pt-2">
              <p>
                I&#39;m a digital artist and web developer who enjoys character
                design and landscape painting. In my free time, I create digital
                art and explore programming, game development, and frontend
                technologies.
              </p>
            </div>
          </m.div>
          {/* <m.div
            initial={{ opacity: 0, x: 100 }}
            transition={{ type: "spring", duration: 0.5, delay: 0.5 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            className="relative order-1 col-span-3 md:col-span-2 xl:col-span-3 xl:order-2 xl:block"
          >
            <Image
              src={portrait}
              alt="portrait of Henrik Sissener"
              className="object-cover w-full h-full aspect-square xl:rounded-full"
              sizes="(max-width: 768px) 100vw,
            (max-width: 1200px) 50vw,
            33vw"
            />
          </m.div> */}
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

  return {
    props: {
      desktopWallpaper: desktopWallpapersWithFetchedImages,
    },
    // revalidate every hour
    revalidate: 60 * 60,
  }
}
