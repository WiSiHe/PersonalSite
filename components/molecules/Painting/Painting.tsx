import clsx from "clsx"
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
    format,
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

  // const formatStyle = {
  //   square: "aspect-square",
  //   landscape: "aspect-video",
  //   portrait: "aspect-[12/16]",
  // }[format]

  // const colStyle = {
  //   square: "col-span-6 lg:col-span-2 xl:col-span-2",
  //   landscape: "col-span-6 lg:col-span-2 xl:col-span-4",
  //   portrait: "col-span-6 lg:col-span-2 xl:col-span-1",
  // }[format]

  // const rowStyle = {
  //   square: "row-span-1  lg:row-span-1 xl:row-span-2",
  //   landscape: "row-span-1  lg:row-span-1 xl:row-span-2",
  //   portrait: "row-span-1 lg:row-span-2 xl:row-span-4",
  // }[format]

  const sanityWidth = {
    square: 400,
    landscape: 400,
    portrait: 400,
  }[format]

  const sanityHeight = {
    square: 600,
    landscape: 600,
    portrait: 600,
  }[format]

  return (
    <Link
      href={linkString}
      className="aspect-[12/16] rounded-lg overflow-clip col-span-6 xl:col-span-3 drop-shadow-lg hover:ring active:ring ring-primary "
    >
      <article
        className={clsx(
          "relative @container w-full h-full group hover:z-10 overflow-clip bg-white "

          // formatStyle
          // colStyle,
          // rowStyle
        )}
      >
        <Image
          src={urlForImage(image)
            .width(sanityWidth)
            .height(sanityHeight)
            .quality(70)
            .url()}
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
            "object-cover w-full h-full transition-all duration-[2000ms] ease-in-out transform bg-center bg-cover lg:aspect-[12/16] aspect-square"
          )}
        />

        {isNsfw && !isNsfwUrl && (
          <div className="absolute inset-0 backdrop-blur-xl" />
        )}
        {hasStoreLinks && (
          <div className="absolute flex items-center flex-shrink-0 gap-2 p-2 text-xs left-2 top-2 bg-highlight">
            <div className="relative w-2 h-2 rounded-full bg-dark">
              <span className="absolute inset-0 inline-flex w-full h-full rounded-full opacity-100 bg-dark animate-ping"></span>
            </div>
            <strong>For sale</strong>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between gap-2 p-4 text-xs bg-primary border-t-primary ">
          <h2 className="text-base text-white capitalize font-inter line-clamp-1">
            <strong>{title}</strong>
          </h2>
          <div className="flex items-center justify-center gap-4 text-lg text-white">
            {video && <BsYoutube />}
            {imagesCount && imagesCount > 0 && <TbBoxMultiple />}
            {isNsfw && <FaExclamation />}
          </div>
        </div>
      </article>
    </Link>
  )
}

export default Painting
