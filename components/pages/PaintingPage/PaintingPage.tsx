"use client"
import clsx from "clsx"
import BackButton from "components/atoms/BackButton/BackButton"
import StoreLinks from "components/molecules/StoreLinks"
import { AnimatePresence, motion } from "framer-motion"
import { iSanityPainting } from "lib/models/objects/sanityPainting"
import { urlForImage } from "lib/sanity.image"
import dynamic from "next/dynamic"
import { notFound } from "next/navigation"
import { FaEye, FaThumbsUp } from "react-icons/fa"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { isEmptyObject } from "utils/object"

const ReactPlayer = dynamic(() => import("react-player"), {
  suspense: true,
  ssr: false,
})

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
    artstationUrl = "",
    inPrintUrl = "",
    tagsV2 = [],
    video = "",
  } = painting

  const formatDate = (date: string) => {
    const d = new Date(date)
    const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d)
    const mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d)
    return `${mo} ${ye}`
  }

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

  const links = {
    redbubbleUrl,
    society6Url,
    artstationUrl,
    inPrintUrl,
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
          "flex relative pb-4 flex-col gap-4 h-fit col-span-full w-full lg:col-span-7 xl:col-span-9",
          imageAspectStyle[format]
        )}
      >
        <LazyLoadImage
          visibleByDefault
          alt={title}
          src={urlForImage(image)
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
                src={urlForImage(image)
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
        <div className="">
          <h1>
            <strong>{title}</strong>
          </h1>
          <section className="flex flex-wrap mt-4 text-xs">
            {tagsV2?.map((tag, i) => {
              const { name = "" } = tag
              const isLastElement = i === tagsV2.length - 1

              return (
                <div
                  key={`tag-${i}`}
                  className={clsx(
                    "flex items-center gap-2",
                    isLastElement ? "" : "mr-2"
                  )}
                >
                  <span>{name}</span>
                  {!isLastElement && <span>&#183;</span>}
                </div>
              )
            })}
          </section>
          <div className="flex justify-between gap-2 py-4 text-sm text-stone-400">
            <div>{paintedAt && formatDate(paintedAt)}</div>
            <div className="flex items-center gap-2">
              Likes:
              <FaThumbsUp /> <span>0</span>
            </div>
            <div className="flex items-center gap-2">
              Views:
              <FaEye /> 0
            </div>
          </div>

          <div>
            <strong>Desciption</strong>
            <p className="whitespace-pre-wrap">{description && description}</p>
          </div>
          <div className="py-6">
            <StoreLinks links={links} />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default PaintingPage
