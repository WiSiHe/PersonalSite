import clsx from "clsx"
import { Footer, HeroSection } from "components"
import Main from "components/Main"
import Meta from "components/Meta"
import Navigation from "components/Navigation"
import { m } from "framer-motion"
import LogoQR from "icons/LogoQR"
// import LogoQR from "icons/LogoQR"
// import useWindowDimensions from "hooks/useWindowDimension"
import { imageBuilder } from "lib/sanity"
import Image from "next/image"
import Link from "next/link"
import PropTypes from "prop-types"
import portrait from "public/images/selfPortrait.png"
import woods from "public/images/woods.png"
import React from "react"

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
  return (
    <>
      <Meta url="https://wisihe.no" />
      <Navigation isAbsolute />
      <Main noTopPadding className="flex-col">
        <HeroSection paintings={desktopWallpaper} />

        {/* Personal Description Section */}
        <section
          className="max-w-screen-xl xl:items-center mx-auto grid relative w-full grid-cols-12 py-10 gap-4 xl:gap-10 px-4"
          id="main"
        >
          <section className="col-span-9 pb-4 xl:col-start-3 xl:col-span-5 order-2 xl:order-1 text-xs xl:text-base">
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
          </section>
          <div
            // initial={{ opacity: 0, y: 20, x: 100 }}
            // transition={{ type: "spring", duration: 0.5, delay: 0.5 }}
            // whileInView={{ opacity: 1, y: 0, x: 0 }}
            // viewport={{ once: true, amount: 0.5 }}
            className="relative col-span-3 xl:col-span-3 aspect-square order-1 xl:order-2 xl:block"
          >
            <Image
              src={portrait}
              alt="portrait of Henrik Sissener"
              className="object-cover w-full h-full rounded-full"
            />
          </div>
        </section>

        <section className="grid grid-cols-12 gap-4 xl:gap-10 py-10 px-4  relative ">
          <div className="absolute from-dark/20 inset-0 bg-gradient-to-t pointer-events-none" />
          <div className="col-span-full xl:col-span-6 xl:col-start-2  p-4">
            <h2>
              <strong>Paintings</strong>
            </h2>
            <p>Coming soon</p>
            <Link href="/paintings">
              <strong>Take a look at my paintings</strong>
            </Link>
          </div>
          <div className="col-span-full xl:col-span-6 xl:col-start-7  p-4">
            <h2>
              <strong>Projects</strong>
            </h2>
            <p>Coming soon</p>
            <Link href="/projects">
              <strong>Take a look at my projects</strong>
            </Link>
          </div>
          <div className="col-span-full xl:col-span-6 xl:col-start-2  p-4">
            <h2>
              <strong>Videos</strong>
            </h2>
            <p>Coming soon</p>
            <Link href="/videos" className="hover:underline">
              <strong>Take a look at my videos</strong>
            </Link>
          </div>
          <m.div
            className="absolute left-10 top-0 bottom-0 flex justify-center items-center pointer-events-none"
            initial={{ opacity: 0, rotate: -180, x: -200, scale: 0.5 }}
            whileInView={{ opacity: 1, rotate: 45, x: 50, scale: 1 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ type: "spring", duration: 0.5, delay: 0.5 }}
          >
            <LogoQR className="opacity-5" width="20rem" height="20rem" />
          </m.div>
        </section>
        <section className="relative h-full flex justify-center items-center">
          <Image src={woods} alt="test" className="object-cover w-full" />
          <div className="absolute inset-0 h-fit w-fit text-white  my-auto p-4 mx-auto">
            <div className="text-xs">
              <h2>
                <strong>Still not convinced?</strong>
              </h2>
              <div className="pb-4">
                Come on, just a little peak, I dare you!
              </div>
            </div>
            <Link href="/paintings" className="">
              <div className="relative py-2 text-center text-black transition rounded bg-highlight px-7 hover:ring focus:outline-none focus:outline-highlight focus:border-transparent">
                <b>Go to gallery</b>
              </div>
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
              className="object-cover w-full h-full rounded-full"
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
