import clsx from "clsx"
import { m } from "framer-motion"
import { imageBuilder } from "lib/sanity"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import PropTypes from "prop-types"
import React from "react"
import { FaExclamation } from "react-icons/fa"
import { GrMultiple } from "react-icons/gr"
import { RiMovieFill } from "react-icons/ri"

const cardVariants = {
  offscreen: {
    y: 100,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      // bounce: 0.4,
      // duration: 1,
    },
  },
}

const Painting = ({ paintingData = {}, isPriority = false }) => {
  const router = useRouter()
  const { slug = "" } = router.query

  const isNsfwUrl = slug === "nsfw"

  const {
    _id = "",
    image = {},
    // fetchedPainting = "",
    title = "",
    format = "square",
    slug: { current = "" } = {},
    images = [],
    video = "",
    tagsV2 = [],
    // className = "",
  } = paintingData

  // filter out null values of tagsV2
  const filteredTags = tagsV2.filter((t) => t !== null)

  const salesTagObj = filteredTags?.find((t) => t.name === "Store") || {}

  // tagsV2 contains NSFW tag
  const nsfwTagObj = filteredTags?.find((t) => t.name === "NSFW") || {}

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
    landscape: 400,
    portrait: 400,
  }

  const imageHeight = {
    square: 400,
    landscape: 400,
    portrait: 400,
  }

  // const imageHeightStyle = {
  //   square: "aspect-square",
  //   landscape: "aspect-video",
  //   portrait: "aspect-[9/16]",
  // }

  // const gridStyle = {
  //   landscape: "col-span-6 xl:col-span-2 xl:row-span-2",
  //   portrait: "col-span-6 xl:col-span-2 xl:row-span-2",
  //   square: "col-span-6 xl:col-span-4 xl:row-span-4",
  // }

  return (
    <m.article
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.4 }}
      variants={cardVariants}
      className={clsx(
        "relative w-full @container h-full overflow-hidden hover:shadow-xl focus:outline-none group hover:ring hover:ring-primary cursor-pointer focus-within:ring focus-within:ring-primary focus-within:z-10",
        // imageHeightStyle[format],
        // gridStyle[format],
        "col-span-6 xl:col-span-3 aspect-square"
      )}
      key={_id}
    >
      <Link href={linkString}>
        <Image
          src={imageBuilder(image)
            .width(imageWidth[format])
            .height(imageHeight[format])
            .quality(45)
            .url()}
          sizes="(max-width: 768px) 50vw,
            25vw"
          // src={fetchedPainting}
          height={imageHeight[format]}
          width={imageWidth[format]}
          // fill
          alt={`painting: ${title}`}
          priority={isPriority}
          className={clsx(
            !isNsfw && !isNsfwUrl && "group-hover:scale-125",
            "object-cover w-full h-full transition-all duration-[2000ms] ease-in-out transform bg-center bg-cover  bg-gray-50 "
          )}
        />
        {isNsfw && !isNsfwUrl && (
          <div
            className={clsx(
              "absolute inset-0 bg-black/10 ",
              "backdrop-blur-2xl"
            )}
          />
        )}

        <div className="absolute inset-0 w-full h-full">
          <div className="flex items-center justify-center w-full h-full">
            <div
              className={clsx(
                !isNsfw && !isNsfwUrl && "backdrop-blur-sm bg-primary/20",
                "transition-all duration-1000 ease-in-out origin-center opacity-0 group-hover:h-full group-hover:w-full group-hover:opacity-100 "
              )}
            />
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center text-center text-white">
          <strong className="text-sm xl:text-xl group-hover:scale-105 drop-shadow-[0_0px_5px_rgba(0,0,0,1)]">
            {title}
          </strong>
        </div>

        {hasStoreLinks && (
          <div className="absolute flex items-center p-2 text-xs top-2 left-2 bg-highlight drop-shadow-md">
            <div className="relative w-2 h-2 mr-2 rounded-full bg-dark">
              <span className="absolute inset-0 inline-flex w-full h-full rounded-full opacity-100 bg-dark animate-ping"></span>
            </div>
            <b>For sale</b>
          </div>
        )}

        <div className="absolute flex items-center gap-2 text-xs bottom-2 right-2 drop-shadow-md">
          {video && (
            <div className="p-2 bg-white">
              <RiMovieFill />
            </div>
          )}
          {amounOfExtraImages > 0 && (
            <div className="p-2 bg-white">
              <GrMultiple />
            </div>
          )}
          {isNsfw && (
            <div className="p-2 bg-white">
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
    title: PropTypes.string,
  }),
}

export default Painting
