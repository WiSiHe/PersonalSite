import Image from "next/image"
import Link from "next/link"
import PropTypes from "prop-types"
import React from "react"
import clsx from "clsx"

import { m } from "framer-motion"

import { imageBuilder } from "lib/sanity"

import { GrMultiple } from "react-icons/gr"
import { RiMovieFill } from "react-icons/ri"
import { FaExclamation } from "react-icons/fa"
import { useRouter } from "next/router"

const cardVariants = {
  offscreen: {
    y: 100,
    opacity: 0
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 1
    }
  }
}

const Painting = ({ paintingData = {}, isPriority = false }) => {
  const router = useRouter()
  const { slug = "" } = router.query

  const isNsfwUrl = slug === "nsfw"

  const {
    _id = "",
    image = {},
    fetchedPainting = "",
    title = "",
    format = "square",
    slug: { current = "" } = {},
    images = [],
    video = "",
    tagsV2 = []
  } = paintingData

  const salesTagObj = tagsV2?.find(t => t.name === "Store") || {}

  // tagsV2 contains NSFW tag
  const nsfwTagObj = tagsV2?.find(t => t.name === "NSFW") || {}

  // check if salesTag is empty
  const hasStoreLinks = Object.keys(salesTagObj).length > 0
  // check if nsfwTag is empty
  const isNsfw = Object.keys(nsfwTagObj).length > 0

  const amounOfExtraImages = images?.length

  const linkString = `/painting/${current}`

  // const isHighlighted = index % 12 === 4

  // const imageWidth = isHighlighted ? 800 : 400
  // const imageHeight = isHighlighted ? 800 : 400

  const imageWidth = {
    square: 400,
    landscape: 800,
    portrait: 400
  }

  const imageHeight = {
    square: 400,
    landscape: 400,
    portrait: 800
  }

  const imageHeightStyle = {
    square: "aspect-square",
    landscape: "aspect-video",
    portrait: "aspect-[9/16]"
  }

  return (
    <m.article
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.1 }}
      variants={cardVariants}
      className={clsx(
        "relative w-full rounded overflow-hidden hover:shadow-xl focus:outline-none group hover:ring hover:ring-highlight cursor-pointer focus-within:ring focus-within:ring-highlight focus-within:z-10"
      )}
      key={_id}
    >
      <Link href={linkString}>
        <div className={clsx("relative w-full", imageHeightStyle[format])}>
          <Image
            // src={imageBuilder(image)
            //   .width(imageWidth[format])
            //   .height(imageHeight[format])
            //   .quality(45)
            //   .url()}
            src={fetchedPainting}
            height={imageHeight[format]}
            width={imageWidth[format]}
            alt={`painting: ${title}`}
            priority={isPriority}
            className="object-cover w-full h-full transition-all duration-[2000ms] ease-in-out transform bg-center bg-cover group-hover:scale-125 bg-gray-50 "
          />
          {isNsfw && !isNsfwUrl && (
            <div className="absolute inset-0 bg-black/20 backdrop-blur-2xl" />
          )}
        </div>
        {/* <div className="absolute inset-0 w-full h-full">
          <div className="flex items-center justify-center w-full h-full">
            <div className="w-0 h-0 transition-all duration-1000 ease-in-out origin-center bg-black rounded-full opacity-0 group-hover:rounded-none group-hover:h-full group-hover:w-full group-hover:opacity-100 bg-opacity-40 backdrop-blur-sm" />
          </div>
        </div> */}

        <div className="absolute inset-0 flex items-center drop-shadow-3xl justify-center text-white ">
          <b className="text-xl group-hover:scale-105">{title}</b>
        </div>
        {hasStoreLinks && (
          <div className="absolute flex items-center p-2 text-xs rounded-sm top-2 left-2 bg-highlight drop-shadow-md">
            <div className="relative w-2 h-2 mr-2 bg-white rounded-full">
              <span className="absolute inset-0 inline-flex w-full h-full bg-white rounded-full opacity-100 animate-ping"></span>
            </div>
            <b>For sale</b>
          </div>
        )}

        <div className="absolute flex items-center gap-2 text-xs rounded-sm bottom-2 right-2 drop-shadow-md">
          {video && (
            <div className="p-2 bg-white rounded-sm">
              <RiMovieFill />
            </div>
          )}
          {amounOfExtraImages > 0 && (
            <div className="p-2 bg-white rounded-sm">
              <GrMultiple />
            </div>
          )}
          {isNsfw && (
            <div className="p-2 bg-white rounded-sm">
              <FaExclamation />
            </div>
          )}
        </div>
      </Link>
    </m.article>
  )
}

Painting.propTypes = {
  index: PropTypes.number,
  isPriority: PropTypes.bool,
  paintingData: PropTypes.shape({
    _id: PropTypes.any,
    image: PropTypes.object,
    tags: PropTypes.array,
    title: PropTypes.string
  })
}

export default Painting
