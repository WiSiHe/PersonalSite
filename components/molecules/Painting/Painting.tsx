import clsx from "clsx"
import { motion } from "framer-motion"
import { iSanityPainting } from "lib/models/objects/sanityPainting"
import { urlForImage } from "lib/sanity.image"
import { useCombinedStore } from "lib/store"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { BsYoutube } from "react-icons/bs"
import { FaExclamation } from "react-icons/fa"
import { TbBoxMultiple } from "react-icons/tb"

// const cardVariants = {
//   offscreen: {
//     y: 100,
//     opacity: 0,
//   },
//   onscreen: {
//     y: 0,
//     opacity: 1,
//   },
//   transition: {
//     type: "spring",
//     // bounce: 0.2,
//     // duration: 1,
//   },
// }

interface iProjectProps {
  paintingData: iSanityPainting
  shouldBeLazy?: boolean
}

const Painting = ({ paintingData, shouldBeLazy = false }: iProjectProps) => {
  const filterList = useCombinedStore((state) => state.filterList)

  if (!paintingData) {
    return <div>No painting data</div>
  }

  const isNsfwUrl = filterList.includes("nsfw")

  const {
    image = {},
    title = "",
    // format = "square",
    slug = "",
    video = "",
    tagsV2 = [],
    imagesCount = 0,
  } = paintingData

  // filter out null values of tagsV2
  const filteredTags = tagsV2?.filter((t) => t !== null)

  const salesTagObj = filteredTags?.find((t) => t.name === "Store") || {}

  // tagsV2 contains NSFW tag
  const nsfwTagObj = filteredTags?.find((t) => t.name === "NSFW") || {}

  // check if salesTag is empty
  const hasStoreLinks = Object.keys(salesTagObj).length > 0
  // check if nsfwTag is empty
  const isNsfw = Object.keys(nsfwTagObj).length > 0

  const linkString = `/painting/${slug}`

  return (
    <Link href={linkString}>
      <motion.article
        layout
        layoutId={title}
        // initial="offscreen"
        // whileInView="onscreen"
        // viewport={{ once: true, amount: 0.1 }}
        // variants={cardVariants}
        // transition={{ duration: 0.5, type: "spring", bounce: 0.2 }}
        className="relative w-full h-full @container group aspect-square hover:z-10 overflow-clip hover:ring hover:ring-primary drop-shadow-xl"
      >
        {/* <div className="relative aspect-square bg-primary"> */}
        <Image
          src={urlForImage(image).width(400).height(400).quality(70).url()}
          blurDataURL={urlForImage(image)
            .width(20)
            .height(20)
            .quality(10)
            .url()}
          placeholder="blur"
          sizes="(max-width: 640px) 100vw,
              (max-width: 1280px) 50vw,
              (max-width: 1536px) 33vw,
              25vw"
          fill
          alt=""
          priority={!shouldBeLazy}
          className={clsx(
            !isNsfw && !isNsfwUrl && "group-hover:scale-110",
            "object-cover w-full h-full transition-all duration-[2000ms] ease-in-out transform bg-center bg-cover "
          )}
        />

        {isNsfw && !isNsfwUrl && (
          <div className="absolute inset-0 rounded-lg backdrop-blur-xl" />
        )}
        {hasStoreLinks && (
          <div className="absolute flex items-center flex-shrink-0 gap-2 p-2 text-xs rounded-lg left-2 top-2 bg-highlight">
            <div className="relative w-2 h-2 rounded-full bg-dark">
              <span className="absolute inset-0 inline-flex w-full h-full rounded-full opacity-100 bg-dark animate-ping"></span>
            </div>
            <strong>For sale</strong>
          </div>
        )}
        {/* </div> */}

        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between gap-2 p-4 text-xs backdrop-blur bg-primary/40 border-t-primary ">
          <h2 className="text-base text-white capitalize font-inter line-clamp-1">
            <strong>{title}</strong>
          </h2>
          <div className="flex items-center justify-center gap-4 text-lg text-white">
            {video && <BsYoutube />}
            {imagesCount && imagesCount > 0 && <TbBoxMultiple />}
            {isNsfw && <FaExclamation />}
          </div>
        </div>
      </motion.article>
    </Link>
  )
}

export default Painting
