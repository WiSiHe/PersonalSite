import React from "react"
import PropTypes from "prop-types"
import { motion } from "framer-motion"

import Link from "next/link"
// import dynamic from 'next/dynamic';

import { IoArrowBackSharp } from "react-icons/io5"

// Helpers
import generatePaintingJsonLd from "helpers/jsonLdHelpers"

// Components
import Main from "components/Main"
import Meta from "components/Meta"
import RedbubbleLink from "components/RedbubbleLink"

// Libs
import { imageBuilder } from "lib/sanity"
import { getAllPaintings, getPaintingDetails } from "lib/api"
import Footer from "components/Footer"
import { AnimatePresence } from "framer-motion"
import clsx from "clsx"
import Image from "next/image"

// const SocialLinks = dynamic(() => import('components/SocialLinks'));

export default function Gallery({
  painting = {},

  slug = {},
  smallImage,
  largeImage,
  xlImage,
  extraImageUrls = []
}) {
  const {
    _id,
    images = [],
    imagesCount = 0,
    title = "",
    description = "",
    format = "square",
    tagCount = 0,
    redbubbleUrl = "",
    tagsV2 = []
  } = painting
  const { current = "" } = slug
  // const uniqueTags = [...new Set(tags)]
  const hasRedBubleLink = redbubbleUrl !== ""

  const hasStoreLinks = hasRedBubleLink

  const imageHeightStyle = {
    square: "aspect-square",
    landscape: "aspect-video",
    portrait: "aspect-[9/16]"
  }

  return (
    <>
      <Meta
        title={title}
        description={description}
        image={smallImage}
        jsonLd={generatePaintingJsonLd(painting)}
        url={`https://wisihe.no/painting/${current}`}
      />

      <Main noTopPadding className="grid flex-col flex-1 grid-cols-12 p-4 overflow-hidden xl:p-20 ">
        <AnimatePresence>
          <motion.div
            className="fixed z-10 top-6 left-6"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ type: "spring" }}
            key="backbutton">
            <Link
              href="/paintings"
              shallow={true}
              scroll={false}
              className="flex items-center justify-center p-2 text-xl gap-2 transition-all duration-200 ease-in-out bg-white rounded-lg hover:shadow-lg active:bg-highlight focus:outline-none focus:ring focus:ring-highlight ">
              <IoArrowBackSharp /> Back
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring" }}
            className={clsx(
              "flex relative flex-col col-span-full xl:col-span-8",
              imageHeightStyle[format]
            )}>
            <Image
              src={largeImage}
              alt="Picture of the author"
              sizes="(max-width: 768px) 100vw,
                (max-width: 1200px) 50vw,
                33vw"
              fill
              className="object-cover"
              blurDataURL={smallImage}
              placeholder="blur"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring" }}
            key="text-section"
            className="relative xl:z-10 flex flex-col col-span-full p-4 transition-all xl:p-8 bg-stone-300 xl:bg-white/40 xl:right-20 xl:top-20 xl:backdrop-blur-lg xl:rounded-lg xl:fixed xl:shadow-xl xl:max-w-lg w-full">
            <h1 className="pb-2 text-2xl lg:text-4xl">
              <strong>{title}</strong>
            </h1>
            <div className="flex flex-wrap gap-2">
              {tagsV2?.map(tag => {
                const { name = "" } = tag
                return (
                  <p
                    className="px-2 py-1 text-xs text-white capitalize rounded-lg bg-primary"
                    key={name}>
                    {name}
                  </p>
                )
              })}
            </div>
            <div className="pb-10">
              <p className="py-2 rounded-sm">
                {description
                  ? description
                  : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum facilisis, augue eu mattis ultrices, ipsum metus porttitor turpis, et convallis lorem tortor nec erat."}
              </p>
            </div>
            {hasStoreLinks && (
              <h3>
                <b>Store links:</b>
              </h3>
            )}
            {hasRedBubleLink && (
              <RedbubbleLink hasRedBubleLink={hasRedBubleLink} redbubbleUrl={redbubbleUrl} />
            )}
          </motion.div>

          {imagesCount > 0 && (
            <section className="col-span-full gap-4 xl:gap-20 grid grid-cols-12 mb-20">
              <div className="py-4 col-span-full">
                <h2 className="text-2xl font-bold">More paintings</h2>
              </div>

              {extraImageUrls.map((url, index) => {
                const isEven = index % 2 === 0
                return (
                  <div
                    key={`picture-${index}`}
                    className={clsx(
                      imageHeightStyle[format],
                      "bg-white relative w-full h-full col-span-full",
                      isEven ? "xl:col-span-6 xl:col-start-6" : "xl:col-span-6 xl:col-start-0"
                    )}>
                    <Image
                      src={largeImage}
                      alt="Picture of the author"
                      sizes="(max-width: 768px) 100vw,
                          (max-width: 1200px) 50vw,
                            33vw"
                      fill
                      className="object-cover"
                      blurDataURL={url}
                      placeholder="blur"
                    />
                  </div>
                )
              })}
            </section>
          )}
        </AnimatePresence>
      </Main>

      <Footer fixed />
    </>
  )
}

Gallery.propTypes = {
  description: PropTypes.string,
  image: PropTypes.object,
  largeImage: PropTypes.any,
  lgImage: PropTypes.string,
  painting: PropTypes.object,
  redbubbleUrl: PropTypes.string,
  slug: PropTypes.object,
  smImage: PropTypes.string,
  smallImage: PropTypes.any,
  tags: PropTypes.array,
  title: PropTypes.string,
  xlImage: PropTypes.string,
  extraImageUrls: PropTypes.array,
  tagsV2: PropTypes.array
}

export async function getStaticProps({ params, preview = false }) {
  const { slug = "" } = params
  const data = await getPaintingDetails(slug, preview)

  if (data.length < 1) {
    return { props: {} }
  }

  const painting = data[0] || {}

  const {
    image = {},
    title = "",
    tags = [],
    description = "",
    redbubbleUrl = "",
    _id = "",
    images = [],
    tagsV2 = []
  } = painting

  const smallImage = imageBuilder(image).width(400).height(400).quality(75).url()
  const largeImage = imageBuilder(image).width(1200).height(1200).quality(75).url()
  const xlImage = imageBuilder(image).width(1660).height(1660).quality(75).url()

  // iterate through images and get the url
  const extraImageUrls =
    images?.map(image => {
      const url = imageBuilder(image).width(1200).height(1200).quality(75).url()
      return url
    }) || []

  return {
    props: {
      painting,
      smallImage,
      largeImage,
      xlImage,
      extraImageUrls
    },
    //  revalidate evry 3 hour
    revalidate: 60 * 60 * 3
  }
}

export async function getStaticPaths() {
  const allPaintings = await getAllPaintings()

  return {
    paths:
      allPaintings?.map(painting => ({
        params: {
          painting,
          slug: painting.slug.current
        }
      })) || [],
    fallback: false
  }
}
