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

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min
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

  const currentWallpaper = desktopWallpaper[desktopIndex]
  const currentMobileWallpaper = mobileWallpaper[mobileIndex]

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

  useEffect(() => {
    setDesktopIndex(parseInt(getRandomArbitrary(0, desktopWallpaper.length)))
    setMobileIndex(parseInt(getRandomArbitrary(0, mobileWallpaper.length)))
  }, [desktopWallpaper, mobileWallpaper])

  return (
    <>
      <Meta url="https://wisihe.no" />
      <Navigation isAbsolute />

      <Main noTopPadding>
        <section className="w-full min-h-screen overflow-x-clip">
          <div className="relative hidden h-full lg:block" key="desktop">
            <Image
              loader={({ src }) => src}
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
              className="object-cover w-full h-full transition-all duration-1000 ease-in-out transform bg-center bg-cover md:block bg-gray-50 "
              alt="headerImage"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
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
                  className="relative px-4 py-2 text-center text-black transition rounded hover:ring w-fit animate-pulse bg-highlight hover:shadow-lg focus:outline-none focus:ring focus:ring-highlight focus:border-transparent">
                  <div className="bg-highlight">
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
              loader={({ src }) => src}
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
        </section>
      </Main>
      <Footer fixed />
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

  const wallpaperPaintings =
    data.paintings.filter(p => p.tags?.length > 1 && p.tags.find(t => t.value === "wallpaper")) ||
    []

  const mobileWallpaper = wallpaperPaintings.filter(p => p.format === "landscape") || []
  const desktopWallpaper = wallpaperPaintings.filter(w => w.format === "landscape") || []

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
