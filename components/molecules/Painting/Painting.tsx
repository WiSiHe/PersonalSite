"use client"
import type { iSanityPainting } from "lib/models/objects/sanityPainting"
import { urlForImage } from "lib/sanity.image"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { BsYoutube } from "react-icons/bs"
import { FaExclamation } from "react-icons/fa"
import { TbBoxMultiple } from "react-icons/tb"
import { isEmptyObject } from "sanity"
import { cn } from "utils/utility"

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
    storybook?: boolean
}

const Painting = ({
    paintingData,
    shouldBeLazy = false,
    storybook = false,
}: iProjectProps) => {
    const searchParams = useSearchParams()

    const filters = searchParams?.getAll("filter")

    if (!paintingData || isEmptyObject(paintingData)) {
        return (
            <div className="flex flex-col items-center justify-center w-full h-full">
                <TbBoxMultiple className="w-10 h-10 text-primary" />
                <strong>Could not find </strong>
            </div>
        )
    }

    const isNsfwUrl = filters?.includes("nsfw")

    const {
        image,
        title = "",

        video = "",
        tagsV2 = [],
        imagesCount = 0,
    } = paintingData

    const { lqip } = image

    // filter out null values of tagsV2
    const filteredTags = tagsV2?.filter((t) => t !== null)

    const salesTagObj = filteredTags?.find((t) => t.name === "Store") || {}

    // tagsV2 contains NSFW tag
    const nsfwTagObj = filteredTags?.find((t) => t.name === "NSFW") || {}

    // check if salesTag is empty
    const hasStoreLinks = Object.keys(salesTagObj).length > 0
    // check if nsfwTag is empty
    const isNsfw = Object.keys(nsfwTagObj).length > 0

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

    // const sanityWidth = {
    //     square: 400,
    //     landscape: 400,
    //     portrait: 400,
    // }[format]

    // const sanityHeight = {
    //     square: 600,
    //     landscape: 600,
    //     portrait: 600,
    // }[format]

    return (
        <article
            className={cn(
                "text-white bg-dark aspect-portrait relative overflow-clip",
            )}
        >
            <Image
                sizes="(min-width: 1040px) calc(20.87vw - 20px), calc(50vw - 24px)"
                fill
                priority={shouldBeLazy}
                placeholder="blur"
                blurDataURL={lqip}
                quality={60}
                unoptimized={storybook}
                alt=""
                src={urlForImage(image)
                    .width(400)
                    .height(600)
                    .quality(60)
                    .url()}
                className={cn(
                    !isNsfw && !isNsfwUrl && "group-hover:scale-110",
                    "object-cover w-full h-full transition-all pointer-events-none duration-500 ease-in-out bg-center bg-cover aspect-square",
                )}
            />

            {isNsfw && !isNsfwUrl && (
                <div className="absolute inset-0 backdrop-blur-xl" />
            )}
            {hasStoreLinks && (
                <div className="absolute flex items-center flex-shrink-0 gap-2 p-2 text-xs rounded-lg left-2 top-2 bg-highlight text-dark">
                    <div className="relative w-2 h-2 rounded-full bg-dark">
                        <span className="absolute inset-0 inline-flex w-full h-full rounded-full opacity-100 bg-dark animate-ping"></span>
                    </div>
                    <strong>For sale</strong>
                </div>
            )}

            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between gap-2 p-4 text-xs duration-200 backdrop-blur-sm transition-color group-hover:bg-primary bg-dark/50 border-t-dark ">
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
    )
}

export default Painting
