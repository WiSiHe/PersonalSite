import clsx from "clsx"
import { Footer, HeroSection, Main, Meta, Navigation } from "components"
import { m } from "framer-motion"
import { ILandingPage } from "lib/models/landingPage"
// import LogoQR from "icons/LogoQR"
// import LogoQR from "icons/LogoQR"
// import useWindowDimensions from "hooks/useWindowDimension"
import { imageBuilder } from "lib/sanity"
import Image from "next/image"
import Link from "next/link"
import PropTypes from "prop-types"
import portrait from "public/images/selfPortrait.png"
import woods from "public/images/woods.png"
import React from "react"

// import { FaFolder, FaPaintBrush, FaVideo } from "react-icons/fa"
import { getAllTagsAndPaintings } from "../lib/api"

export default function Home({
  desktopWallpaper = [],
}: {
  desktopWallpaper: ILandingPage[]
}) {
  return (
    <>
      <Meta url="https://wisihe.no" />
      <Navigation isAbsolute />
      <Main noTopPadding className="flex-col overflow-clip">
        <HeroSection paintings={desktopWallpaper} />

        <section
          className="max-w-screen-xl xl:items-center mx-auto grid relative w-full grid-cols-12 py-10 xl:py-24 gap-4 xl:gap-16 px-4"
          id="main"
        >
          <m.div
            initial={{ opacity: 0, x: -100 }}
            transition={{ type: "spring", duration: 0.5, delay: 0.5 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            className="col-span-9 xl:col-start-3 xl:col-span-5 order-2 xl:order-1 text-xs xl:text-base"
          >
            <h1>
              <strong>
                Hi there! My name is <span className="text-primary">He</span>
                nrik <span className="text-primary">Wi</span>
                lhelm <span className="text-primary">Si</span>ssener
              </strong>
            </h1>
            <p>
              I&#39;m a digital artist / web developer / hobby designer who has
              been drawing my whole life. I mostly do character designs, but I
              try to step into the big world of landscape paintings every now
              and then. I spend my free time making digital paintings and
              tinkering with programming, game development and new frontend
              technologies.
            </p>
          </m.div>
          <m.div
            initial={{ opacity: 0, x: 100 }}
            transition={{ type: "spring", duration: 0.5, delay: 0.5 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            className="relative col-span-3 xl:col-span-3 order-1 xl:order-2 xl:block"
          >
            <Image
              src={portrait}
              alt="portrait of Henrik Sissener"
              className="object-cover w-full h-full aspect-square xl:rounded-full"
            />
          </m.div>
        </section>

        {/* <section className="relative py-20">
          <div className="absolute from-dark/10 inset-0 bg-gradient-to-t pointer-events-none" />
          <div className="grid-cols-12 grid gap-4 xl:gap-10 ">
            <div className="p-4 col-span-full xl:col-span-3 xl:col-start-3 flex gap-4 items-center text-sm">
              <div className="w-16 h-16 bg-primary shrink-0 flex justify-center items-center text-white">
                <FaPaintBrush />
              </div>
              <div>
                <h2>
                  <strong>Paintings</strong>
                </h2>
                <p>A collection of my paintings, </p>
                <Link
                  href="/paintings"
                  className="underline underline-offset-2"
                >
                  <strong>Take a look at my paintings</strong>
                </Link>
              </div>
            </div>
            <div className="p-4 col-span-full xl:col-span-3 flex gap-4 items-center text-sm">
              <div className="w-16 h-16 bg-primary shrink-0 flex justify-center items-center text-white">
                <FaFolder />
              </div>
              <div>
                <h2>
                  <strong>Projects</strong>
                </h2>
                <p>Some of my old, ongoing or future projects.</p>
                <Link href="/projects" className="underline underline-offset-2">
                  <strong>Take a look at my projects</strong>
                </Link>
              </div>
            </div>
            <div className="p-4 col-span-full xl:col-span-3 flex gap-4 items-center text-sm">
              <div className="w-16 h-16 bg-primary shrink-0 flex justify-center items-center text-white">
                <FaVideo />
              </div>
              <div>
                <h2>
                  <strong>Videos</strong>
                </h2>
                <p>
                  A collection of some stuff I&#39;ve published to YouTube over
                  the years, some of it is associated with music, some of it is
                  animations and Game Dev stuff.
                </p>
                <Link href="/videos" className="underline underline-offset-2">
                  <strong>Take a look at my videos</strong>
                </Link>
              </div>
            </div>
          </div>
        </section> */}

        <section className="relative h-full flex justify-center items-center">
          <Image src={woods} alt="test" className="object-cover w-full" />
          <div className="absolute inset-0 h-fit w-fit text-white flex items-center flex-col text-center  my-auto p-4 mx-auto">
            <div className="text-xs">
              <h2>
                <strong>Still not convinced?</strong>
              </h2>
              <div className="pb-4">
                Come on, just a little peak, I dare you!
              </div>
            </div>
            <Link
              href="/paintings"
              className="relative py-2 text-center text-white text-white transition bg-primary px-7 hover:ring focus:outline-none focus:ring-highlight focus:ring-2 focus:border-transparent"
            >
              <b>Go to gallery</b>
            </Link>
          </div>
        </section>

        <section className="col-span-full">
          <div className="relative w-full h-full xl:block">
            <Image
              src={woods}
              fill
              className={clsx(
                "object-cover w-full h-full transition-all duration-[3000ms] delay-500 ease-in-out transform bg-center bg-cover md:block bg-gray-50"
              )}
              alt="headerImage"
            />
          </div>
        </section>
        <section className="text-center flex justify-center flex-col items-center gap-4 py-10 px-4">
          <div className="">
            <h2>Still scrolling, huh?</h2>
            <b>Here, have a picture of a cute dog</b>
          </div>

          <div className="relative aspect-square w-full xl:w-96">
            <Image
              src="https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=962&q=80"
              fill
              alt="cute dog"
              className="object-cover w-full h-full"
            />
          </div>
        </section>
      </Main>
      <Footer />
    </>
  )
}

Home.propTypes = {
  headerImage: PropTypes.any,
  paintings: PropTypes.array,
  tags: PropTypes.array,
  thumbnailImage: PropTypes.any,
  wallpaperPaintings: PropTypes.any,
  desktopWallpaper: PropTypes.array,
}

export async function getStaticProps() {
  const data = await getAllTagsAndPaintings()

  if (data.length < 1) {
    return { props: {} }
  }

  const { paintings = [] } = data

  const wallpaperPaintings = paintings.filter(
    (p) =>
      p.tagsV2?.length > 1 &&
      p.tagsV2.find((t) => t.name.toLowerCase() === "wallpaper")
  )

  const desktopWallpapersWithFetchedImages = wallpaperPaintings.map(
    (wallpaper) => ({
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
