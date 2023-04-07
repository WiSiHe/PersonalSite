import clsx from "clsx"
import { AnimatePresence, motion } from "framer-motion"
import { iSanityPainting } from "lib/models/objects/sanityPainting"
import { imageBuilder } from "lib/sanity"
import { useCombinedStore } from "lib/store"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import { FaExclamation } from "react-icons/fa"
import { GrMultiple } from "react-icons/gr"
import { RiMovieFill } from "react-icons/ri"

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
//     bounce: 0.2,
//     duration: 1,
//   },
// }

interface iProjectProps {
  paintingData: iSanityPainting
  shouldBeLazy?: boolean
}

const Painting = ({ paintingData, shouldBeLazy = false }: iProjectProps) => {
  const router = useRouter()
  const filterList = useCombinedStore((state) => state.filterList)

  const isNsfwUrl = router.query.slug === "nsfw" || filterList.includes("nsfw")

  const {
    image = {},
    // fetchedPainting = "",
    title = "",
    // format = "square",
    slug = "",
    video = "",
    tagsV2 = [],
    imagesCount = 0,
    // className = "",
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

  // const isHighlighted = index % 12 === 4

  // const imageWidth = isHighlighted ? 800 : 400
  // const imageHeight = isHighlighted ? 800 : 400

  // const imageWidth = {
  //   square: 400,
  //   landscape: 400,
  //   portrait: 400,
  // }

  // const imageHeight = {
  //   square: 400,
  //   landscape: 400,
  //   portrait: 400,
  // }

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
    <AnimatePresence>
      <motion.article
        // layout
        layoutId={title}
        // initial="offscreen"
        // whileInView="onscreen"
        // viewport={{ once: true, amount: 0.4 }}
        // variants={cardVariants}
        transition={{ duration: 0.5, type: "spring", bounce: 0.2 }}
        className={clsx(
          "relative w-full @container rounded-lg hover:z-10 h-full overflow-hidden hover:shadow-xl focus:outline-none group hover:ring hover:ring-primary cursor-pointer focus-within:ring focus-within:ring-primary focus-within:z-10"
        )}
      >
        <Link href={linkString} className="absolute inset-0">
          <Image
            src={imageBuilder(image).width(400).height(400).quality(55).url()}
            blurDataURL={imageBuilder(image)
              .width(20)
              .height(20)
              .quality(1)
              .url()}
            placeholder="blur"
            sizes="(max-width: 768px) 50vw,
            33vw"
            fill
            alt=""
            priority={!shouldBeLazy}
            className={clsx(
              !isNsfw && !isNsfwUrl && "group-hover:scale-110",
              "object-cover w-full h-full transition-all duration-[2000ms] ease-in-out transform bg-center bg-cover bg-gray-50"
            )}
          />

          <div className="absolute z-10 left-4 top-4 right-4">
            <h2>
              <strong className="text-md text-white group-hover:scale-105 drop-shadow-[0_0px_5px_rgba(0,0,0,1)]  @md:text-sm">
                {title}
              </strong>
            </h2>
          </div>

          {isNsfw && !isNsfwUrl && (
            <div className={clsx("absolute inset-0", "backdrop-blur-xl")} />
          )}

          <div className="absolute flex items-center gap-2 text-xs bottom-2 right-2 drop-shadow-md">
            {hasStoreLinks && (
              <div className="flex items-center p-2 text-xs rounded-lg bg-highlight">
                <div className="relative w-2 h-2 mr-2 rounded-full bg-dark">
                  <span className="absolute inset-0 inline-flex w-full h-full rounded-full opacity-100 bg-dark animate-ping"></span>
                </div>
                <strong className="text-xs @xs:text-sm">For sale</strong>
              </div>
            )}
            {video && (
              <div className="p-2 bg-white rounded-lg">
                <RiMovieFill />
              </div>
            )}
            {imagesCount && imagesCount > 0 && (
              <div className="p-2 bg-white rounded-lg">
                <GrMultiple />
              </div>
            )}
            {isNsfw && (
              <div className="p-2 bg-white rounded-lg">
                <FaExclamation />
              </div>
            )}
          </div>
        </Link>
      </motion.article>
    </AnimatePresence>
  )
}

export default Painting
