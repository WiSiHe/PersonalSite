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

export default function Home({ desktopWallpaper = [] }) {
  const [desktopIndex, setDesktopIndex] = useState(0)

  //   const currentWallpaper = desktopWallpaper.get(desktopIndex)
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
      {/* <Navigation isAbsolute /> */}

      <Main noTopPadding className="flex-col">
        <div
          className="relative h-full min-h-screen overflow-clip bg-slate-200 lg:block"
          key="desktop">
          <LazyLoadImage
            src={currentWallpaper.imageUrl}
            alt="headerImage"
            className={clsx(
              "w-full h-full object-cover object-center absolute inset-0 transition-all duration-[12000ms] ease-in-out"
            )}
          />
        </div>
        <div className="inset-0 z-10 flex items-center justify-center gap-4 p-4 ">
          <button onClick={() => handleGoLeft()} className="p-4 bg-highlight">
            left
          </button>
          <button onClick={() => handleGoRight()} className="p-4 bg-highlight">
            Right
          </button>
        </div>
        <div
          className="relative h-full min-h-screen overflow-clip bg-slate-200 lg:block"
          key="desktop">
          <Image
            src={currentWallpaper.imageUrl}
            layout="fill"
            priority
            objectFit="cover"
            className={clsx(
              "object-cover w-full h-full transition-all duration-[3000ms] delay-500 ease-in-out transform bg-center bg-cover md:block bg-gray-50 "
            )}
            alt="headerImage"
          />
        </div>
      </Main>
      <Footer />
    </>
  )
}

Home.propTypes = {
  desktopWallpaper: PropTypes.array,
  headerImage: PropTypes.any,
  mobileWallpaper: PropTypes.array,
  paintings: PropTypes.array,
  tags: PropTypes.array,
  thumbnailImage: PropTypes.any,
  wallpaperPaintings: PropTypes.any
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

  // iterate through desktopWallpapers

  const desktopWallpaper = nsfwDesktopWallpaper.filter(w => w.format === "landscape") || []

  const desktopWallpapersWithFetchedImages = desktopWallpaper.map(wallpaper => ({
    ...wallpaper,
    imageUrl: imageBuilder(wallpaper.image)
      .width(1400)
      .height(900)
      // .auto("format")
      // .fit("scale")
      .quality(75)
      .url()
  }))

  return {
    props: {
      desktopWallpaper: desktopWallpapersWithFetchedImages
    },
    revalidate: 600 // 10 min
  }
}
