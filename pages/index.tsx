import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"

import Link from "next/link"
import Image from "next/image"

import { BsChevronLeft, BsChevronRight } from "react-icons/bs"
import { useNextSanityImage } from "next-sanity-image"

import Meta from "components/Meta"
import Main from "components/Main"
import { configuredSanityClient } from "helpers/sanityHelpers"
import Navigation from "components/Navigation"

import SideMenu from "components/SideMenu"
import NavigationDrawer from "components/NavigationDrawer"
import { getAllTagsAndPaintings } from "../lib/api"

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

export default function Home({ desktopWallpaper }) {
  const [desktopIndex, setDesktopIndex] = useState(0)

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
  }, [desktopWallpaper.length])

  const currentWallpaper = desktopWallpaper[desktopIndex]

  const imageProps: painting = useNextSanityImage(
    configuredSanityClient,
    desktopWallpaper[desktopIndex].image,
    {
      blurUpImageWidth: 124,
      blurUpImageQuality: 40,
      blurUpAmount: 24
    }
  )

  console.log({ imageProps })

  const { src = "", loader, placeholder = "blur" } = imageProps

  return (
    <>
      <Meta url="https://wisihe.no" />
      <Navigation hideOnDesktop isAbsolute />
      <NavigationDrawer />
      <Main noTopPadding>
        <section className="relative grid flex-1 min-h-full grid-cols-12">
          <section className="sticky hidden h-full col-span-2 bg-stone-100 xl:block">
            <SideMenu />
          </section>
          <div className="relative h-full col-span-12 xl:col-span-10">
            <Image
              layout="fill"
              objectFit="cover"
              className="hidden object-cover w-full h-full transition-all duration-1000 ease-in-out transform bg-center bg-cover md:block bg-gray-50 "
              alt="headerImage"
              src={src}
              loader={loader}
              placeholder={placeholder}
              blurDataURL={imageProps.blurDataURL}
            />
            <div className="absolute top-0 bottom-0 flex items-center justify-between text-2xl left-5 right-5">
              <button
                onClick={handleGoLeft}
                className="rounded-lg focus:outline-none focus:ring ring-highlight focus:border-transparent">
                <BsChevronLeft
                  aria-label="Left"
                  className="p-2 text-4xl text-center text-black transition-all bg-white rounded-lg hover:shadow-lg "
                />
              </button>
              <button
                onClick={handleGoRight}
                className="rounded-lg focus:outline-none focus:ring ring-highlight focus:border-transparent">
                <BsChevronRight
                  aria-label="Right"
                  className="p-2 text-4xl text-center text-black transition bg-white rounded-lg hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </button>
            </div>
            <div className="absolute left-0 right-0 flex justify-center bottom-20">
              <Link href="/gallery" passHref>
                <a className="px-4 py-2 text-center text-black transition bg-white rounded-lg hover:shadow-lg focus:outline-none focus:ring focus:ring-highlight focus:border-transparent">
                  Go to gallery!
                </a>
              </Link>
            </div>
            <div className="absolute justify-center hidden right-5 top-10 xl:flex">
              <div className="p-4 capitalize bg-opacity-50 rounded-lg bg-stone-100">
                {currentWallpaper.title}
              </div>
            </div>
          </div>
        </section>
      </Main>
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

  const desktopWallpaper = wallpaperPaintings.filter(w => w.aspectRatio === "16:9") || []

  const flattenedTags = data.tags.filter(tag => tag !== null).flat()
  const tagValues = flattenedTags.map(tag => tag.label)

  const result = {}

  for (let i = 0; i < tagValues.length; ++i) {
    if (!result[tagValues[i]]) result[tagValues[i]] = 0
    ++result[tagValues[i]]
  }

  return {
    props: {
      desktopWallpaper
    },
    revalidate: 600 // 10 min
  }
}
