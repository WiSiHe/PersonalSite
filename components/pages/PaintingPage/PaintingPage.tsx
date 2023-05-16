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

  // function to open email client with pre-filled subject and body

  // const emailLink = `mailto:hws902@gmail.com?subject=I%20want%20a%20print%20of%20this%20painting:%20${title}&body=Hi%20Henrik,%0D%0A%0D%0AI%20would%20like%20to%20buy%20a%20print%20of%20this%20painting:%20${title}%0D%0A%0D%0A`

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
          "flex relative pb-4 flex-col gap-4 h-fit col-span-full w-full lg:col-span-7 xl:col-span-9",
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
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: "spring", delay: 0.2, duration: 0.5 }}
        key="text-section"
        className="relative justify-between p-0 transition-all lg:sticky lg:col-span-5 lg:top-4 xl:z-10 col-span-full h-fit lg:bg-white lg:p-4 xl:p-6 xl:col-span-3"
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

          <div className="bg-white ">
            <h2>
              <strong>Store links:</strong>
            </h2>
            <p>
              Beyond my original art, I offer prints, posters, and merchandise
              in various formats, including framed or canvas prints and artful
              phone cases.
            </p>
            <div className="flex flex-col gap-4 pt-4">
              {hasRedBubleLink && (
                <div>
                  <RedbubbleLink href={redbubbleUrl} />
                  <p className="pt-2 text-xs">
                    Redbubble is a vibrant online marketplace where I sell my
                    unique art as prints, posters, and merchandise.
                  </p>
                </div>
              )}

              {hasSociety6Link && (
                <div>
                  <Society6Link href={society6Url} />
                  <p className="pt-2 text-xs">
                    Society6 is a creative platform where I feature my art on
                    prints, posters, and a variety of high-quality products.
                  </p>
                </div>
              )}
              <div>
                <strong>Do you need a custom print?</strong>
                <div>
                  <Link href="/contact">Contact</Link>
                  {/* <a className="underline" href={emailLink}>
                    Contact me
                  </a> */}
                </div>
              </div>
            </div>
          </div>
          <h2>Desciption</h2>
          <p className="whitespace-pre-wrap">{description && description}</p>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default PaintingPage
