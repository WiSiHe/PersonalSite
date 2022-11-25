import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"

import Link from "next/link"

import { BsChevronDown, BsChevronLeft, BsChevronRight } from "react-icons/bs"

import Meta from "components/Meta"
import Main from "components/Main"
import Navigation from "components/Navigation"

import Footer from "components/Footer"
import { getAllTagsAndPaintings } from "../lib/api"
import { imageBuilder } from "lib/sanity"

import useWindowDimensions from "hooks/useWindowDimension"

import clsx from "clsx"
import { motion } from "framer-motion"
import Image from "next/image"

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

// const sphereColor = {
//   0: "bg-yellow-300",
//   1: "bg-purple-300",
//   2: "bg-cyan-300"
// }

// const desktopWallpaperPositionStyle = {
//   1: "object-top",
//   2: "object-bottom"
// }

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
  const [desktopIndex, setDesktopIndex] = useState(0)
  const [mobileIndex, setMobileIndex] = useState(0)
  const { width = 0 } = useWindowDimensions()

  const currentWallpaper = desktopWallpaper[desktopIndex]
  const currentMobileWallpaper = mobileWallpaper[mobileIndex]

  const handleGoLeft = ({ isMobile = false }) => {
    // setIsRestartingAnimation(true)
    if (isMobile) {
      if (mobileIndex === 0) {
        return setMobileIndex(mobileWallpaper.length - 1)
      } else {
        return setMobileIndex(mobileIndex - 1)
      }
    }
    if (desktopIndex === 0) {
      return setDesktopIndex(desktopWallpaper.length - 1)
    }

    return setDesktopIndex(desktopIndex - 1)
  }

  const handleGoRight = ({ isMobile = false }) => {
    if (isMobile) {
      if (mobileIndex === mobileWallpaper.length - 1) {
        return setMobileIndex(0)
      }
      return setMobileIndex(mobileIndex + 1)
    }
    if (desktopIndex === desktopWallpaper.length - 1) {
      return setDesktopIndex(0)
    }

    return setDesktopIndex(desktopIndex + 1)
  }

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
          <div className="relative h-full overflow-clip bg-slate-800" key="desktop">
            <div className="relative hidden w-full h-full xl:block">
              <Image
                src={currentWallpaper.imageUrl}
                blurDataURL={currentWallpaper.lowResImageUrl}
                sizes="(min-width: 1024px) 1024px, 100vw"
                priority
                fill
                placeholder="blur"
                className={clsx(
                  "object-cover w-full h-full transition-all duration-[3000ms] delay-500 ease-in-out transform bg-center bg-cover md:block bg-gray-50"
                )}
                alt="headerImage"
              />
            </div>
            <div className="relative block w-full h-full xl:hidden">
              <Image
                src={currentMobileWallpaper.imageUrl}
                blurDataURL={currentMobileWallpaper.lowResImageUrl}
                sizes="(max-width: 640px) 640px, 100vw"
                priority
                fill
                placeholder="blur"
                className="object-cover w-full h-full transition-all duration-[3000ms] delay-500 ease-in-out transform bg-center bg-cover md:block bg-gray-50"
                alt="headerImage"
              />
            </div>

            <div
              className={`absolute inset-0 w-full flex items-center mix-blend-overlay justify-center h-full bg-gradient-to-r from-blue-200 to-orange-500 via-purple-500 animate-gradient-xy`}
            />

            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center h-full gap-4 ring">
              <div className="flex items-center justify-between w-full gap-6 p-10">
                <motion.button
                  // onMouseOver={() => setIsPaused(true)}
                  // onMouseOut={() => setIsPaused(false)}
                  whileHover={{ scale: 1.2 }}
                  onClick={() => handleGoLeft({ isMobile: width < 764 ? false : true })}
                  className="flex-shrink-0 rounded-lg fl w-fit hover:ring focus:outline-none focus:ring ring-highlight focus:border-transparent"
                  aria-label="Go to previous painting">
                  <BsChevronLeft
                    aria-label="Left"
                    className="p-2 text-4xl text-center text-black transition bg-white rounded-lg hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  />
                </motion.button>
                <div className="relative ">
                  <div className="absolute -inset-0.5 w-full animate-tilt transition-all duration-500 h-full rounded mix-blend-overlay blur from-pink-600 to-purple-400 hover:to-purple-200 bg-gradient-to-r" />

                  <Link href="/paintings">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      // whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", duration: 0.5 }}
                      className="relative py-4 text-center text-black transition rounded bg-highlight px-7 hover:ring focus:outline-none focus:outline-highlight focus:border-transparent">
                      <b>Go to gallery</b>
                    </motion.div>
                  </Link>
                </div>
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  // onMouseOver={() => setIsPaused(true)}
                  // onMouseOut={() => setIsPaused(false)}
                  onClick={() => handleGoRight({ isMobile: width < 764 ? false : true })}
                  className="z-10 rounded-lg focus:outline-none hover:ring focus:ring ring-highlight focus:border-transparent"
                  aria-label="Go to next painting">
                  <BsChevronRight
                    aria-label="Right"
                    className="p-2 text-4xl text-center text-black transition bg-white rounded-lg hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  />
                </motion.button>
              </div>
            </div>
            <div className="absolute left-0 right-0 z-10 flex items-center justify-center p-4 bottom-4">
              <motion.a
                initial={{ y: 0, scale: 1.0 }}
                animate={{ y: -10, scale: 1.0 }}
                // whileHover={{ scale: 1.2 }}
                transition={{
                  repeat: Infinity,
                  // repeatDelay: 2,

                  repeatType: "reverse",
                  // duration: 0.5,
                  type: "spring",
                  bounce: 0.5
                }}
                className="p-4 bg-white rounded-lg focus:outline-none hover:ring focus:ring ring-highlight focus:border-transparent"
                href="#main">
                <BsChevronDown />
              </motion.a>
            </div>
          </div>

          {/* <section className="relative w-full h-full lg:hidden" key="mobile">
            <Image
              src={currentMobileWallpaper.imageUrl}
              blurDataURL={currentMobileWallpaper.lowResImageUrl}
              layout="fill"
              placeholder="blur"
              priority
              objectFit="cover"
              className="w-full h-full transition-all duration-1000 ease-in-out transform bg-center bg-cover object-fit md:block bg-gray-50 "
              alt="headerImage"
            />
            <div
              className={clsx(
                `absolute w-full flex items-center mix-blend-overlay justify-center opacity-80 h-full bg-gradient-to-r from-blue-200 to-orange-500 via-purple-500 animate-gradient-xy`
              )}
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
          </section> */}
        </section>
        <div id="main" />
        <section className="grid w-full h-full grid-cols-12 p-10 min-h-96 ">
          <section className="col-span-full xl:col-span-4">
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
    lowResImageUrl: imageBuilder(wallpaper.image).width(20).height(20).quality(10).url(),
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
    // revalidate every hour
    revalidate: 60 * 60
  }
}
