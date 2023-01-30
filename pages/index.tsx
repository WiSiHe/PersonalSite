import clsx from "clsx"
import Footer from "components/Footer"
import Main from "components/Main"
import Meta from "components/Meta"
import Navigation from "components/Navigation"
import { m } from "framer-motion"
import LogoQR from "icons/LogoQR"
// import useWindowDimensions from "hooks/useWindowDimension"
import { imageBuilder } from "lib/sanity"
import Image from "next/image"
import Link from "next/link"
import PropTypes from "prop-types"
import portrait from "public/images/selfPortrait.png"
import woods from "public/images/woods.png"
import React, { useEffect, useState } from "react"
import { BsChevronLeft, BsChevronRight } from "react-icons/bs"
import { getRandomArbitrary } from "utils/numbers"

import { getAllTagsAndPaintings } from "../lib/api"

export declare type ImageLoader = (resolverProps: ImageLoaderProps) => string
export declare type ImageLoaderProps = {
  src: string
  width: number
  quality?: number
}

export interface painting {
  blurDataURL: string
  placeholder: "blur" | "empty"
  height: number
  width: number
  src: string
  loader: ImageLoader
}

export interface ISanityImage {
  painting: painting | null
}

export interface Asset {
  _ref: string
  _type: string
}

export interface Image {
  _type: string
  asset: Asset
}

export interface Slug {
  _type: string
  current: string
}

export interface Tag {
  label: string
  value: string
}

export interface RootObject {
  _createdAt: Date
  _id: string
  _rev: string
  _type: string
  _updatedAt: Date
  aspectRatio: string
  description: string
  imageUrl: string
  lowResImageUrl: string
  image: Image
  slug: Slug
  tags: Tag[]
  title: string
}

export default function Home({
  desktopWallpaper = [],
}: {
  desktopWallpaper: RootObject[]
}) {
  const [desktopIndex, setDesktopIndex] = useState(0)
  // const { width = 0 } = useWindowDimensions()

  const currentWallpaper = desktopWallpaper[desktopIndex]

  const handleGoLeft = () => {
    if (desktopIndex === 0) {
      return setDesktopIndex(desktopWallpaper.length - 1)
    }

    return setDesktopIndex(desktopIndex - 1)
  }

  const handleGoRight = () => {
    if (desktopIndex === desktopWallpaper.length - 1) {
      return setDesktopIndex(0)
    }

    return setDesktopIndex(desktopIndex + 1)
  }

  useEffect(() => {
    setDesktopIndex(parseInt(getRandomArbitrary(0, desktopWallpaper.length)))
  }, [desktopWallpaper])

  return (
    <>
      <Meta url="https://wisihe.no" />
      <Navigation isAbsolute />

      <Main noTopPadding className="flex-col">
        <section className="w-full h-[80lvh]">
          <div className="relative h-full bg-slate-800">
            <div className="relative w-full h-full">
              <Image
                src={currentWallpaper.imageUrl}
                blurDataURL={currentWallpaper.lowResImageUrl}
                sizes="(max-width: 768px) 100vw,
                (max-width: 1200px) 50vw,
                33vw"
                priority
                fill
                placeholder="blur"
                className={clsx(
                  "object-cover w-full h-full transition-all duration-[3000ms] delay-500 ease-in-out transform bg-center bg-cover md:block bg-gray-50"
                )}
                alt="headerImage"
              />
            </div>
            <div
              className={`absolute inset-0 w-full flex items-center mix-blend-overlay justify-center h-full bg-gradient-to-r from-blue-200 to-orange-500 via-purple-500 animate-gradient-xy`}
            />
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center h-full gap-4">
              <div className="flex items-center justify-between w-full gap-6 p-4">
                <m.button
                  // onMouseOver={() => setIsPaused(true)}
                  // onMouseOut={() => setIsPaused(false)}
                  whileHover={{ scale: 1.2 }}
                  onClick={() => handleGoLeft()}
                  className="flex-shrink-0 rounded-lg fl w-fit hover:ring focus:outline-none focus:ring ring-highlight focus:border-transparent"
                  aria-label="Go to previous painting"
                >
                  <BsChevronLeft
                    aria-label="Left"
                    className="p-2 text-3xl text-center text-black transition bg-white rounded-lg hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  />
                </m.button>
                <div className="relative ">
                  <div className="absolute -inset-0.5 w-full animate-tilt transition-all duration-500 h-full rounded mix-blend-overlay blur from-pink-600 to-purple-400 hover:to-purple-200 bg-gradient-to-r" />

                  <Link href="/paintings">
                    <m.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      // whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", duration: 0.5 }}
                      className="relative py-2 text-center text-black transition rounded bg-highlight px-7 hover:ring focus:outline-none focus:outline-highlight focus:border-transparent"
                    >
                      <b>Go to gallery</b>
                    </m.div>
                  </Link>
                </div>
                <m.button
                  whileHover={{ scale: 1.2 }}
                  // onMouseOver={() => setIsPaused(true)}
                  // onMouseOut={() => setIsPaused(false)}
                  onClick={handleGoRight}
                  className="z-10 rounded-lg focus:outline-none hover:ring focus:ring ring-highlight focus:border-transparent"
                  aria-label="Go to next painting"
                >
                  <BsChevronRight
                    aria-label="Right"
                    className="p-2 text-3xl text-center text-black transition bg-white rounded-lg hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  />
                </m.button>
              </div>
            </div>
            {/* <div className="absolute left-0 right-0 z-10 flex items-center justify-center bottom-2">
              <m.a
                initial={{ y: 0, scale: 1.0 }}
                animate={{ y: -10, scale: 1.0 }}
                transition={{
                  repeat: Infinity,
                  repeatType: "reverse",
                  type: "spring",
                  bounce: 0.5,
                }}
                className="p-2 bg-white rounded-lg focus:outline-none hover:ring focus:ring ring-highlight focus:border-transparent"
                href="#main"
              >
                <BsChevronDown />
              </m.a>
            </div> */}
          </div>
        </section>
        <section
          className=" max-w-7xl items-center mx-auto grid w-full overflow-clip h-full grid-cols-12 py-10 gap-4 xl:gap-10 px-4"
          id="main"
        >
          <section className="col-span-8 pb-4 xl:col-start-3 xl:col-span-5 order-2 xl:order-1">
            <h1>
              <strong>Henrik Wilhelm Sissener</strong>
            </h1>
            <p>
              I&#39;m a digital artist / web developer / hobby designer who has
              been drawing my whole life. I mostly do character designs, but I
              try to step into the big world of landscape every now and then, I
              spend my free time making digital paintings paintings and do some
              tinkering with new Frontend technologies.
            </p>
          </section>
          <div
            // initial={{ opacity: 0, y: 20, x: 100 }}
            // transition={{ type: "spring", duration: 0.5, delay: 0.5 }}
            // whileInView={{ opacity: 1, y: 0, x: 0 }}
            // viewport={{ once: true, amount: 0.5 }}
            className="relative col-span-4 xl:col-span-3 aspect-square order-1 xl:order-2 xl:block"
          >
            <Image
              src={portrait}
              alt="portrait of Henrik Sissener"
              className="object-cover w-full h-full rounded-full"
            />
          </div>
        </section>
        <div className="absolute">
          <LogoQR className="opacity-5" width="10rem" height="10rem" />
        </div>
        <section className="relative max-h-screen h-full overflow-clip flex justify-center items-center">
          <Image src={woods} alt="test" className="object-cover w-full" />
          <div className="absolute inset-0 h-fit w-fit text-white  my-auto p-4 mx-auto">
            <h2>
              <b>Still not convinced?</b>
            </h2>
            <div className="pb-4">Come on, just a little peak, I dare you!</div>
            <Link href="/paintings">
              <div className="relative py-2 text-center text-black transition rounded bg-highlight px-7 hover:ring focus:outline-none focus:outline-highlight focus:border-transparent">
                <b>Go to gallery</b>
              </div>
            </Link>
            <div></div>
          </div>
        </section>

        <section className="col-span-full">
          <div className="relative w-full h-full xl:block">
            <Image
              src={currentWallpaper.imageUrl}
              blurDataURL={currentWallpaper.lowResImageUrl}
              sizes="(max-width: 768px) 100vw,
                (max-width: 1200px) 50vw,
                33vw"
              priority
              fill
              placeholder="blur"
              className={clsx(
                "object-cover w-full h-full transition-all duration-[3000ms] delay-500 ease-in-out transform bg-center bg-cover md:block bg-gray-50"
              )}
              alt="headerImage"
            />
          </div>
        </section>
        <section className="text-center flex justify-center flex-col items-center gap-4 py-10">
          <div className="">
            <h2>Still scrolling, huh?</h2>
            <b>Here, have a picture of a cute dog</b>
          </div>

          <div className="relative aspect-square w-96">
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
        .width(1400)
        .height(900)
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
