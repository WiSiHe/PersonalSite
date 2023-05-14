"use client"
import clsx from "clsx"
import BackButton from "components/atoms/BackButton/BackButton"
const Chip = dynamic(() => import("components/atoms/Chip/Chip"))

import { AnimatePresence, motion } from "framer-motion"
import { iSanityPainting } from "lib/models/objects/sanityPainting"
import { imageBuilder } from "lib/sanity"
import dynamic from "next/dynamic"
import Link from "next/link"
import { notFound } from "next/navigation"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { isEmptyObject } from "utils/object"
import { slugify } from "utils/string"

const ReactPlayer = dynamic(() => import("react-player"), {
  suspense: true,
  ssr: false,
})
const RedbubbleLink = dynamic(
  () => import("components/atoms/RedbubbleLink/RedbubbleLink"),
  { suspense: true, ssr: false }
)
const Society6Link = dynamic(
  () => import("components/atoms/Society6Link/Society6link"),
  { suspense: true, ssr: false }
)

interface iPaintingPageProps {
  painting: iSanityPainting
}

const PaintingPage = ({ painting }: iPaintingPageProps) => {
  if (isEmptyObject(painting)) return notFound()

  const {
    images,
    title = "",
    description = "",
    image,
    format = "square",
    paintedAt,
    redbubbleUrl = "",
    society6Url = "",
    tagsV2 = [],
    video = "",
  } = painting

  const formatDate = (date: string) => {
    const d = new Date(date)
    const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d)
    const mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d)
    return `${mo} ${ye}`
  }

  const hasRedBubleLink = redbubbleUrl !== "" && redbubbleUrl !== null
  const hasSociety6Link = society6Url !== "" && society6Url !== null

  const hasStoreLinks = hasRedBubleLink || hasSociety6Link

  const imageAspectStyle = {
    square: "aspect-square",
    landscape: "aspect-video",
    portrait: "aspect-[9/16]",
  }

  const imageHeight = {
    square: 1200,
    landscape: 820,
    portrait: 1200,
  }
  const imageWidth = {
    square: 1200,
    landscape: 1200,
    portrait: 650,
  }

  return (
    <AnimatePresence>
      <BackButton />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: "spring", delay: 0.5, duration: 0.5 }}
        key="MainPainting"
        layoutId={title}
        className={clsx(
          "flex relative flex-col gap-4 h-fit col-span-full w-full xl:col-span-9 pb-4",
          imageAspectStyle[format]
        )}
      >
        <LazyLoadImage
          visibleByDefault
          alt={title}
          src={imageBuilder(image)
            .width(imageWidth[format])
            .height(imageHeight[format])
            .quality(75)
            .url()}
          className="h-fit"
        />
        {images?.map((image, index) => {
          return (
            <div
              key={`picture-${index}`}
              className={clsx("", imageAspectStyle[format])}
            >
              <LazyLoadImage
                alt={title}
                src={imageBuilder(image)
                  .width(imageWidth[format])
                  .height(imageHeight[format])
                  .quality(75)
                  .url()}
                className="object-cover w-full h-full"
              />
            </div>
          )
        })}
        {video && (
          <div className="col-span-full xl:col-span-5 xl:col-start-3">
            <div className="w-full aspect-video">
              <ReactPlayer
                url={video}
                loop
                muted
                playing
                width="100%"
                height="100%"
              />
            </div>
          </div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: "spring", delay: 0.2, duration: 0.5 }}
        key="text-section"
        className="relative justify-between p-0 transition-all xl:sticky xl:top-4 xl:z-10 col-span-full h-fit xl:bg-white xl:p-6 xl:col-span-3"
      >
        <div className="space-y-4">
          <h1>
            <strong>{title}</strong>
          </h1>
          <p className="text-sm text-gray-500">
            {paintedAt && formatDate(paintedAt)}
          </p>

          <div className="flex flex-wrap gap-1">
            {tagsV2?.map((tag) => {
              const { name = "" } = tag
              const tagSlug = slugify(name)
              return (
                <Link key={name} href={`/?filter=${tagSlug}`}>
                  <Chip>{name}</Chip>
                </Link>
              )
            })}
          </div>
          {hasStoreLinks && (
            <div className="p-4 bg-highlight">
              <h3>
                <strong>Store links</strong>
              </h3>
              <p>
                I also sell prints, posters, and other products of my artwork,
                available in various formats like framed prints, canvas prints,
                and phone cases.
              </p>
              <div className="flex items-center gap-4 pt-4">
                <RedbubbleLink href={redbubbleUrl} />
                <Society6Link href={society6Url} />
              </div>
            </div>
          )}
          <p className="whitespace-pre-wrap">{description && description}</p>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default PaintingPage
