import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"

import Link from "next/link"
import Image from "next/legacy/image"

import { BsChevronLeft, BsChevronRight } from "react-icons/bs"

import Meta from "components/Meta"
import Main from "components/Main"
import Navigation from "components/Navigation"

import Footer from "components/Footer"
import { getAllTagsAndPaintings } from "../lib/api"
import { imageBuilder } from "lib/sanity"

import { LazyLoadImage } from "react-lazy-load-image-component"
import clsx from "clsx"

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min
}

const gradientPositionStyle = {
  0: "bg-gradient-to-tr from-cyan-300 via-purple-300/40 to-red-500",
  1: "bg-gradient-to-b from-blue-300 via-purple-300 to-orange-500",
  2: "bg-gradient-to-bl from-orange-300 via-purple-300 to-yellow-500",
  3: "bg-gradient-to-tr from-purple-300 via-purple-300 to-blue-500",
  4: "bg-gradient-to-bl from-red-300 via-purple-300 to-red-500",
  5: "bg-gradient-to-tl from-teal-300 via-purple-300 to-purple-500"
}

const sphereColor = {
  0: "cyan-300",
  1: "blue-300",
  2: "orange-300",
  3: "purple-300",
  4: "red-300",
  5: "teal-300"
}

const xPositions = {
  1: "translate-x-1",
  2: "translate-x-2",
  3: "translate-x-3",
  4: "translate-x-4",
  5: "translate-x-5",
  6: "translate-x-6",
  7: "translate-x-7",
  8: "translate-x-8",
  9: "translate-x-9",
  10: "translate-x-10",
  11: "translate-x-11",
  12: "translate-x-12",
  13: "translate-x-13",
  14: "translate-x-14",
  15: "translate-x-15",
  16: "translate-x-16",
  17: "translate-x-17",
  18: "translate-x-18",
  19: "translate-x-19",
  20: "translate-x-20",
  21: "translate-x-21",
  22: "translate-x-22",
  23: "translate-x-23",
  24: "translate-x-24",
  25: "translate-x-25",
  26: "translate-x-26",
  27: "translate-x-27",
  28: "translate-x-28",
  29: "translate-x-29",
  30: "translate-x-30",
  31: "translate-x-31",
  32: "translate-x-32",
  33: "translate-x-33",
  34: "translate-x-34",
  35: "translate-x-35",
  36: "translate-x-36",
  37: "translate-x-37",
  38: "translate-x-38",
  39: "translate-x-39",
  40: "translate-x-40",
  41: "translate-x-41",
  42: "translate-x-42"
}

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

  const [color, setColor] = useState(sphereColor[0])

  const currentWallpaper = desktopWallpaper[desktopIndex]
  const currentMobileWallpaper = mobileWallpaper[mobileIndex]

  const [positionX, setPositionX] = useState(0)
  const [positionY, setPositionY] = useState(0)
  const [positionXString, setPositionXString] = useState("translate-x-16")
  const [sphereSize, setSphereSize] = useState("128px")

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

  const [backgroundGradient, setBackgroundGradient] = useState(gradientPositionStyle[0])
  // const timer that starts on mount and changes wallpaper every 10 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      // setBackgroundGradient(gradientPositionStyle[Math.floor(getRandomArbitrary(0, 5))])
      // set random color for background
      setColor(sphereColor[Math.floor(getRandomArbitrary(0, 5))])
      setPositionX(getRandomArbitrary(-100, 100))
      setPositionY(getRandomArbitrary(-100, 100))

      const randomNumber = Math.floor(getRandomArbitrary(0, 100))

      // setPositionXString(`translate-x-$[{randomNumber}]`)
      setPositionXString(xPositions[Math.floor(getRandomArbitrary(1, 42))])
      setSphereSize(`${getRandomArbitrary(256, 1024)}px`)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

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
          <div className="relative overflow-clip hidden h-full lg:block" key="desktop">
            {/* <Image
              // loader={({ src }) => src}
              src={imageBuilder(currentWallpaper.image).width(1200).height(1200).quality(75).url()}
              blurDataURL={imageBuilder(currentWallpaper.image)
                .width(20)
                .height(20)
                .quality(10)
                .url()}
              layout="fill"
              placeholder="blur"
              priority
              objectFit="cover"
              className="object-cover object-center w-full h-full transition-all duration-1000 ease-in-out transform bg-center bg-cover md:block bg-gray-50 "
              alt="headerImage"
            /> */}

            <LazyLoadImage
              src={imageBuilder(currentWallpaper.image).width(1200).height(1200).quality(75).url()}
              className="w-full h-full object-cover absolute inset-0"
            />
            <div className="absolute inset-0 w-full h-full flex items-center justify-center mix-blend-overlay">
              <div
                style={{
                  width: sphereSize,
                  height: sphereSize,
                  transform: `translate(${positionX}%, ${positionY}%)`
                }}
                className={clsx(
                  `transition-all ease-in-out rounded-full z-10 duration-[3000ms]`,
                  color ? `bg-${color}` : "bg-purple-300"
                )}
              />
              {/* <div className="w-96 h-96 rounded-full z-10 bg-purple-500/50 animate-blob animation-delay-3000  " />
              <div className="w-96 h-96 rounded-full z-10 bg-yellow-500/50 animate-blob animation-delay-4000 " /> */}
            </div>

            {/* <div className="absolute inset-0 transition-all ease-in-out bg-gradient-to-tr from-cyan-300/40 via-purple-300/40 to-red-500/40 bg-opacity-40 " /> */}
            {/* <div
              className={clsx(
                "absolute inset-0 transition-color duration-500 ease-in-out opacity-90",
                backgroundGradient
              )}
            /> */}

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
                  className="relative px-4 py-2 text-center text-black ring transition rounded hover:ring ring-highlight hover:shadow-lg focus:outline-none focus:ring focus:ring-highlight focus:border-transparent">
                  <div className=" px-4 py-2 z-10 bg-highlight ">
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
          </div>

          <section className="relative w-full h-full lg:hidden" key="mobile">
            <Image
              // loader={({ src }) => src}
              src={imageBuilder(currentMobileWallpaper.image)
                .width(764)
                .height(800)
                .quality(75)
                .url()}
              blurDataURL={imageBuilder(currentMobileWallpaper.image)
                .width(20)
                .height(20)
                .quality(10)
                .url()}
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
        <section className="block w-full p-4 h-96">
          <h1>
            <b>Henrik Wilhelm Sissener</b>
          </h1>
          <p>
            Short story: Im a digital artist / web developer / hobby designer who has been drawing
            my whole life. I mostly do character designs, but I try to step into the big world of
            landscape every now and then, I spend my free time making digital paintings paintings
            and do some tinkering with new Frontend technologies.
          </p>
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

  const nsfwDesktopWallpaper = wallpaperPaintings.filter(
    p => p.tagsV2?.length > 1 && p.tagsV2.find(t => t.name.toLowerCase() !== "nsfw")
  )

  const mobileWallpaper = nsfwDesktopWallpaper.filter(p => p.format === "landscape") || []
  const desktopWallpaper = nsfwDesktopWallpaper.filter(w => w.format === "landscape") || []

  const flattenedTags = data.tags.filter(tag => tag !== null).flat()
  const tagValues = flattenedTags.map(tag => tag.label)

  const result = {}

  for (let i = 0; i < tagValues.length; ++i) {
    if (!result[tagValues[i]]) result[tagValues[i]] = 0
    ++result[tagValues[i]]
  }

  return {
    props: {
      desktopWallpaper,
      mobileWallpaper
    },
    revalidate: 600 // 10 min
  }
}
