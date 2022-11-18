import React from "react"
import PropTypes from "prop-types"
import { motion } from "framer-motion"

// import Link from "next/link"
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
import { getPaintingDetails, getAllPaintingSlugs } from "lib/api"
import SocialLinks from "components/SocialLinks"
import { AnimatePresence } from "framer-motion"
import clsx from "clsx"
import Image from "next/image"
import ReactPlayer from "react-player"
import { useRouter } from "next/router"
import Navigation from "../../components/Navigation"
import { LazyLoadImage } from "react-lazy-load-image-component"

// const SocialLinks = dynamic(() => import('components/SocialLinks'));

export default function Gallery({ painting = {}, slug = {} }) {
  const router = useRouter()

  const {
    // _id,
    images = [],
    imagesCount = 0,
    title = "",
    description = "",
    image,
    format = "square",
    // tagCount = 0,
    redbubbleUrl = "",
    tagsV2 = [],
    video = ""
  } = painting
  console.log("painting", painting)
  const { current = "" } = slug

  // const uniqueTags = [...new Set(tags)]
  const hasRedBubleLink = redbubbleUrl !== ""

  const hasStoreLinks = hasRedBubleLink

  const imageAspectStyle = {
    square: "aspect-square",
    landscape: "aspect-video",
    portrait: "aspect-[9/16]"
  }

  const imageHeight = {
    square: 1200,
    landscape: 820,
    portrait: 1200
  }
  const imageWidth = {
    square: 1200,
    landscape: 1200,
    portrait: 650
  }

  const handleGoBack = () => {
    router.back()
  }

  return (
    <>
      <Meta
        title={title}
        description={description}
        image={imageBuilder(image).width(128).height(128).quality(75).url()}
        jsonLd={generatePaintingJsonLd(painting)}
        url={`https://wisihe.no/painting/${current}`}
      />
      <Navigation />
      <Main noTopPadding className="grid flex-col w-full flex-1 grid-cols-12 p-4 gap-10 xl:p-20 ">
        <AnimatePresence>
          <motion.div
            className="fixed z-10 bottom-4 left-4 xl:top-20 xl:left-6"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ type: "spring" }}
            key="backbutton">
            <button
              onClick={handleGoBack}
              className="flex items-center justify-center py-2 px-4 text-xl gap-2 transition-all duration-200 ease-in-out bg-white rounded-lg hover:ring hover:shadow-lg active:bg-highlight focus:outline-none focus:ring focus:ring-highlight ">
              <IoArrowBackSharp /> Back
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", delay: 0.2, duration: 0.5 }}
            key="MainPainting"
            className={clsx(
              "flex relative flex-col col-span-full w-full xl:col-span-5 xl:col-start-3",
              imageAspectStyle[format]
            )}>
            <LazyLoadImage
              alt={title}
              src={imageBuilder(image)
                .width(imageWidth[format])
                .height(imageHeight[format])
                .quality(75)
                .url()}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", delay: 0.2, duration: 0.5 }}
            key="text-section"
            className="relative flex xl:sticky xl:top-4 flex-col xl:z-10 col-span-full h-fit justify-between transition-all bg-stone-300 xl:bg-white xl:p-6 xl:col-span-4 w-full">
            <div>
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
              <p className="py-2 rounded-sm">
                {description
                  ? description
                  : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum facilisis, augue eu mattis ultrices, ipsum metus porttitor turpis, et convallis lorem tortor nec erat."}
              </p>
              {hasStoreLinks && (
                <h3>
                  <b>Store links:</b>
                </h3>
              )}
              {hasRedBubleLink && (
                <RedbubbleLink hasRedBubleLink={hasRedBubleLink} redbubbleUrl={redbubbleUrl} />
              )}
            </div>
            <div className="pt-10">
              <SocialLinks />
            </div>
          </motion.div>

          {imagesCount > 0 && (
            <>
              {images.map((image, index) => {
                return (
                  <div
                    key={`picture-${index}`}
                    className={clsx(
                      "bg-white relative ring col-span-full xl:col-span-5 xl:col-start-3",
                      imageAspectStyle[format]
                    )}>
                    <LazyLoadImage
                      alt={title}
                      src={imageBuilder(image)
                        .width(imageWidth[format])
                        .height(imageHeight[format])
                        .quality(75)
                        .url()}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )
              })}
            </>
          )}
          {video && (
            <div className="col-span-full xl:col-span-5 xl:col-start-3 mb-20">
              <div className="aspect-video w-full">
                <ReactPlayer url={video} loop muted playing width="100%" height="100%" />
              </div>
            </div>
          )}
        </AnimatePresence>
      </Main>
    </>
  )
}

Gallery.propTypes = {
  painting: PropTypes.object,
  slug: PropTypes.object
}

export async function getStaticProps({ params, preview = false }) {
  const { slug = "" } = params
  const data = await getPaintingDetails(slug, preview)

  if (data.length < 1) {
    return { props: {} }
  }

  const painting = data[0] || {}

  return {
    props: {
      painting
    },
    //  revalidate evry 3 hour
    revalidate: 60 * 60 * 3
  }
}

export async function getStaticPaths() {
  const allPaintings = await getAllPaintingSlugs()

  return {
    paths:
      allPaintings?.map(painting => ({
        params: {
          slug: painting.slug
        }
      })) || [],
    fallback: false
  }
}
