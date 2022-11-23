import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"

import Link from "next/link"
import Image from "next/legacy/image"

import {
  BsArrowDown,
  BsChevronDown,
  BsChevronLeft,
  BsChevronRight,
  BsFileArrowDown
} from "react-icons/bs"

import Meta from "components/Meta"
import Main from "components/Main"
import Navigation from "components/Navigation"

import Footer from "components/Footer"
import { getAllTagsAndPaintings } from "../lib/api"
import { imageBuilder } from "lib/sanity"

import { LazyLoadImage } from "react-lazy-load-image-component"
import clsx from "clsx"
import { motion } from "framer-motion"

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min
}

// const gradientPositionStyle = {
//   0: "bg-gradient-to-tr from-cyan-300 via-purple-300/40 to-red-500",
//   1: "bg-gradient-to-b from-blue-300 via-purple-300 to-orange-500",
//   2: "bg-gradient-to-bl from-orange-300 via-purple-300 to-yellow-500",
//   3: "bg-gradient-to-tr from-purple-300 via-purple-300 to-blue-500",
//   4: "bg-gradient-to-bl from-red-300 via-purple-300 to-red-500",
//   5: "bg-gradient-to-tl from-teal-300 via-purple-300 to-purple-500"
// }

const sphereColor = {
  0: "bg-blue-300",
  1: "bg-red-300",
  2: "bg-yellow-300",
  3: "bg-purple-300",
  4: "bg-cyan-300"
}

const desktopWallpaperPositionStyle = {
  1: "object-top",
  2: "object-bottom"
}

// const desktopWallpaperSizeStyle = {
//   0: "100% 100%",
//   1: "120% 120%",
//   2: "150% 150%",
//   3: "200% 200%"
// }

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
  mobileWallpaper = []
}: {
  desktopWallpaper: RootObject[]
  mobileWallpaper: RootObject[]
}) {
  //  ref of div

  const [desktopIndex, setDesktopIndex] = useState(0)
  const [mobileIndex, setMobileIndex] = useState(0)

  const currentWallpaper = desktopWallpaper[desktopIndex]

  const currentMobileWallpaper = mobileWallpaper[mobileIndex]

  // const [sphereOffset, setSphereOffset] = useState(0)
  // const [desktopWallpaperPosition, setDesktopWallpaperPosition] = useState(
  //   desktopWallpaperPositionStyle[0]
  // )
  // const [desktopWallpaperSize, setDesktopWallpaperSize] = useState(desktopWallpaperSizeStyle[0])

  // const [positionX, setPositionX] = useState(0)
  // const [positionY, setPositionY] = useState(0)

  // const [sphereSize, setSphereSize] = useState(256)

  const handleGoLeft = ({ isMobile = false }) => {
    if (isMobile) {
      if (mobileIndex === 0) {
        setMobileIndex(mobileWallpaper.length - 1)
      } else {
        setMobileIndex(mobileIndex - 1)
      }
    } else {
      if (desktopIndex === 0) {
        return setDesktopIndex(desktopWallpaper.length - 1)
      }
      return setDesktopIndex(desktopIndex - 1)
    }
  }

  const handleGoRight = ({ isMobile = false }) => {
    if (isMobile) {
      if (mobileIndex === mobileWallpaper.length - 1) {
        return setMobileIndex(0)
      }
      return setMobileIndex(mobileIndex + 1)
    } else {
      if (desktopIndex === desktopWallpaper.length - 1) {
        return setDesktopIndex(0)
      }
      return setDesktopIndex(desktopIndex + 1)
    }
  }

  // const timer that starts on mount and changes wallpaper every 10 seconds
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     // setBackgroundGradient(gradientPositionStyle[Math.floor(getRandomArbitrary(0, 5))])
  //     // set random color for background
  //     setSphereSize(getRandomArbitrary(256, 1024))
  //     setSphereOffset(getRandomArbitrary(0, 100))
  //   }, 5000)
  //   return () => clearInterval(timer)
  // }, [])

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     if (desktopWallpaperPosition === desktopWallpaperPositionStyle[1]) {
  //       setDesktopWallpaperPosition(desktopWallpaperPositionStyle[0])
  //     } else {
  //       setDesktopWallpaperPosition(desktopWallpaperPositionStyle[1])
  //     }
  //   }, 12000)
  //   return () => clearInterval(timer)
  // }, [])

  // every 10 seconds change the wallpaper
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     handleGoRight({ isMobile: false })
  //   }, 10000)
  //   return () => clearInterval(interval)
  // }, [desktopIndex])

  useEffect(() => {
    setDesktopIndex(parseInt(getRandomArbitrary(0, desktopWallpaper.length)))
    setMobileIndex(parseInt(getRandomArbitrary(0, mobileWallpaper.length)))
  }, [desktopWallpaper, mobileWallpaper])

  return (
    <>
      <Meta url="https://wisihe.no" />
      <Navigation isAbsolute />

      <Main noTopPadding className="flex-col">
        <section className="w-full h-screen">
          <div className="relative overflow-clip hidden bg-slate-200 h-full lg:block" key="desktop">
            <Image
              // loader={({ src }) => src}
              src={currentWallpaper.imageUrl}
              // blurDataURL={imageBuilder(currentWallpaper.image)
              //   .width(20)
              //   .height(20)
              //   .quality(10)
              //   .url()}
              blurDataURL={currentWallpaper.lowResImageUrl}
              layout="fill"
              placeholder="blur"
              priority
              objectFit="cover"
              className={clsx(
                "object-cover w-full h-full transition-all duration-[3000ms] delay-500 ease-in-out transform bg-center bg-cover md:block bg-gray-50"
              )}
              alt="headerImage"
            />

            {/* <LazyLoadImage
              // src={imageBuilder(currentWallpaper.image)
              //   .width(1400)
              //   .height(900)
              //   // .auto("format")
              //   // .fit("scale")
              //   .quality(75)
              //   .url()}
              src={currentWallpaper.imageUrl}
              placeholderSrc={currentWallpaper.lowResImageUrl}
              alt="headerImage"
              // effect="blur"
              // placeholderSrc={imageBuilder(currentWallpaper.image)
              //   // .width(1200)
              //   // .height(1200)
              //   // .auto("format")
              //   .fit("scale")
              //   .quality(5)
              //   .url()}
              className={clsx(
                "w-full h-full object-cover object-center absolute inset-0 transition-all duration-[12000ms] ease-in-out"
                // desktopWallpaperPosition
              )}
            /> */}

            {/* <div
              className={clsx(
                `absolute w-full flex items-center justify-center opacity-60 h-full bg-gradient-to-r from-blue-200 to-orange-500 via-purple-500 animate-gradient-xy`
              )}
            /> */}

            {/* <div className="absolute inset-0 grid grid-cols-6 p-4 gap-4 w-full h-full">
              {[...Array(24)].map((_, i) => {
                // round size
                const baseSize = sphereSize * Math.floor(getRandomArbitrary(0.8, 5))

                const roundedSize = Math.round(baseSize / 256) * 256

                // get screenwidth
                // const screenWidth = window.innerWidth

                const xPosition = getRandomArbitrary(-100, 100) * (sphereOffset / 100)
                const yPosition = getRandomArbitrary(-100, 100) * (sphereOffset / 100)

                const sphereColorz = sphereColor[Math.floor(getRandomArbitrary(0, 5))]

                return (
                  <div
                    style={{
                      width: `${roundedSize}px`,
                      height: `${roundedSize}px`,
                      transform: `translate(${xPosition}%, ${yPosition}%)`,
                      transitionTimingFunction: "cubic-bezier(0.65, 0.0, 0.35, 1)"
                    }}
                    key={i}
                    className={clsx(
                      `transition-all col-span-1 shrink-0  z-10 duration-[5000ms]`,
                      "rounded-full",
                      sphereColorz ? sphereColorz : "bg-red-500"
                    )}
                  />
                )
              })}
            </div> */}

            <div className="relative h-full inset-0 flex flex-col items-center justify-center gap-4 z-10">
              <div className="flex items-center justify-between w-full gap-6 p-10">
                <button
                  onClick={() => handleGoLeft({ isMobile: false })}
                  className="flex-shrink-0 rounded-lg fl w-fit hover:ring focus:outline-none focus:ring ring-highlight focus:border-transparent"
                  aria-label="Go to previous painting">
                  <BsChevronLeft
                    aria-label="Left"
                    className="p-2 text-4xl text-center text-black transition bg-white rounded-lg hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  />
                </button>

                <Link
                  href="/paintings"
                  className="relative px-4 py-2 text-center text-black transition rounded hover:ring ring-highlight hover:shadow-lg focus:outline-none focus:ring focus:ring-highlight focus:border-transparent">
                  <div className=" px-4 py-2 z-10 bg-highlight rounded ">
                    <b>Go to gallery</b>
                  </div>
                </Link>
                <button
                  onClick={() => handleGoRight({ isMobile: false })}
                  className="rounded-lg focus:outline-none hover:ring focus:ring ring-highlight focus:border-transparent"
                  aria-label="Go to next painting">
                  <BsChevronRight
                    aria-label="Right"
                    className="p-2 text-4xl text-center text-black transition bg-white rounded-lg hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  />
                </button>
              </div>
            </div>
            <div className="absolute left-0 flex justify-center items-center p-4 right-0 bottom-0 z-10">
              <motion.a
                initial={{ y: 0 }}
                animate={{ y: -10 }}
                whileHover={{ scale: 1.2 }}
                transition={{
                  repeat: Infinity,
                  // repeatDelay: 2,

                  repeatType: "reverse",
                  // duration: 0.5,
                  type: "spring",
                  bounce: 0.5
                }}
                className="bg-white p-4 rounded-lg focus:outline-none hover:ring focus:ring ring-highlight focus:border-transparent"
                href="#main">
                <BsChevronDown />
              </motion.a>
            </div>
          </div>

          <section className="relative w-full h-full lg:hidden" key="mobile">
            <Image
              // loader={({ src }) => src}
              src={currentMobileWallpaper.imageUrl}
              blurDataURL={currentMobileWallpaper.lowResImageUrl}
              // src={imageBuilder(currentMobileWallpaper.image)
              //   .width(764)
              //   .height(800)
              //   .quality(75)
              //   .fit("scale")
              //   .url()}
              // blurDataURL={imageBuilder(currentMobileWallpaper.image)
              //   .width(20)
              //   .height(20)
              //   .quality(10)
              //   .url()}
              layout="fill"
              placeholder="blur"
              priority
              objectFit="cover"
              className="w-full h-full transition-all duration-1000 ease-in-out transform bg-center bg-cover object-fit md:block bg-gray-50 "
              alt="headerImage"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <div className="flex items-center justify-between w-full gap-6 p-10">
                <button
                  onClick={() => handleGoLeft({ isMobile: true })}
                  className="flex-shrink-0 rounded-lg w-fit hover:ring focus:outline-none focus:ring ring-highlight focus:border-transparent"
                  aria-label="Go to previous painting">
                  <BsChevronLeft
                    aria-label="Left"
                    className="p-2 text-4xl text-center text-black transition bg-white rounded-lg hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  />
                </button>
                <Link
                  href="/paintings"
                  className="relative flex-shrink-0 px-4 py-2 text-center text-black transition rounded hover:ring w-fit bg-highlight hover:shadow-lg focus:outline-none focus:ring focus:ring-highlight focus:border-transparent">
                  <strong>Go to gallery</strong>
                </Link>
                <button
                  onClick={() => handleGoRight({ isMobile: true })}
                  className="rounded-lg focus:outline-none hover:ring focus:ring ring-highlight focus:border-transparent"
                  aria-label="Go to next painting">
                  <BsChevronRight
                    aria-label="Right"
                    className="p-2 text-4xl text-center text-black transition bg-white rounded-lg hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  />
                </button>
              </div>
            </div>
          </section>
        </section>
        <div id="main" />
        <section className="w-full p-10 min-h-96 h-full grid grid-cols-12 ">
          <section className="col-span-4">
            <h1>
              <b>Henrik Wilhelm Sissener</b>
            </h1>
            <p className="">
              Short story: Im a digital artist / web developer / hobby designer who has been drawing
              my whole life. I mostly do character designs, but I try to step into the big world of
              landscape every now and then, I spend my free time making digital paintings paintings
              and do some tinkering with new Frontend technologies.
            </p>
          </section>
        </section>
        <section>
          <div
            className={clsx(
              `absolute w-full flex items-center justify-center h-96 bg-gradient-to-r from-blue-200 to-orange-500 via-purple-500 animate-gradient-xy`
            )}
          />
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
  desktopWallpaper: PropTypes.array
}

export async function getStaticProps({ preview = false }) {
  const data = await getAllTagsAndPaintings(preview)

  if (data.length < 1) {
    return { props: {} }
  }

  const { paintings = [] } = data

  const wallpaperPaintings = paintings.filter(
    p => p.tagsV2?.length > 1 && p.tagsV2.find(t => t.name.toLowerCase() === "wallpaper")
  )

  const mobileWallpaper = wallpaperPaintings.filter(p => p.format === "portrait") || []

  const mobileWallpapersWithFetchedImages = mobileWallpaper.map(wallpaper => ({
    ...wallpaper,
    lowResImage: imageBuilder(wallpaper.image).width(20).height(20).quality(10).url(),
    imageUrl: imageBuilder(wallpaper.image).width(764).height(800).quality(75).url()
  }))

  const desktopWallpaper = wallpaperPaintings.filter(w => w.format === "landscape") || []

  const desktopWallpapersWithFetchedImages = desktopWallpaper.map(wallpaper => ({
    ...wallpaper,
    lowResImageUrl: imageBuilder(wallpaper.image).width(20).height(20).quality(10).url(),
    imageUrl: imageBuilder(wallpaper.image).width(1400).height(900).quality(75).url()
  }))

  return {
    props: {
      desktopWallpaper: desktopWallpapersWithFetchedImages,
      mobileWallpaper: mobileWallpapersWithFetchedImages
    },
    revalidate: 600 // 10 min
  }
}
