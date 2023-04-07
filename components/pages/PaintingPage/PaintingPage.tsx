import clsx from "clsx"
const Chip = dynamic(() => import("components/atoms/Chip/Chip"))
const RedbubbleLink = dynamic(
  () => import("components/atoms/RedbubbleLink/RedbubbleLink")
)
const Society6Link = dynamic(
  () => import("components/atoms/Society6Link/Society6link")
)
import { AnimatePresence, m } from "framer-motion"
import { iSanityPainting } from "lib/models/objects/sanityPainting"
import { imageBuilder } from "lib/sanity"
import dynamic from "next/dynamic"
import Link from "next/link"
import { useRouter } from "next/router"
import { IoArrowBackSharp } from "react-icons/io5"
import { LazyLoadImage } from "react-lazy-load-image-component"

const ReactPlayer = dynamic(() => import("react-player"), {
  suspense: true,
  ssr: false,
})

interface iPaintingPageProps {
  painting: iSanityPainting
}

const PaintingPage = ({ painting }: iPaintingPageProps) => {
  const router = useRouter()

  const {
    // _id,
    images = [],
    title = "",
    description = "",
    image,
    format = "square",
    // tagCount = 0,
    redbubbleUrl = "",
    society6Url = "",
    tagsV2 = [],
    video = "",
  } = painting

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

  const handleGoBack = () => {
    router.back()
  }

  return (
    <AnimatePresence>
      <m.div
        className="fixed z-10 top-20 left-6 "
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ type: "spring", delay: 0.2, duration: 0.5 }}
        key="backbutton"
      >
        <button
          onClick={handleGoBack}
          className="flex items-center justify-center gap-2 px-4 py-2 text-xl text-white transition-all duration-200 ease-in-out shadow-lg bg-primary hover:ring hover:shadow-lg active:bg-highlight focus:outline-none focus:ring focus:ring-highlight "
        >
          <IoArrowBackSharp /> Back
        </button>
      </m.div>

      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: "spring", delay: 0.2, duration: 0.5 }}
        key="MainPainting"
        layoutId={title}
        className={clsx(
          "flex relative flex-col h-fit col-span-full w-full xl:col-span-8 pb-4",
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
      </m.div>

      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: "spring", delay: 0.2, duration: 0.5 }}
        key="text-section"
        className="relative justify-between p-0 transition-all xl:sticky xl:top-4 xl:z-10 col-span-full h-fit xl:bg-white xl:p-6 xl:col-span-4"
      >
        <div className="space-y-4">
          <h1>
            <strong>{title}</strong>
          </h1>

          <div className="flex flex-wrap gap-1">
            {tagsV2?.map((tag) => {
              const { name = "" } = tag
              const tagSlug = name.toLowerCase().replace(" ", "-")
              return (
                <Link key={name} href={`/paintings/${tagSlug}`}>
                  <Chip>{name}</Chip>
                </Link>
              )
            })}
          </div>
          <p className="">{description && description}</p>

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
        </div>
      </m.div>

      {images?.map((image, index) => {
        return (
          <div
            key={`picture-${index}`}
            className={clsx(
              "bg-white relative col-span-full w-full xl:col-span-8",
              imageAspectStyle[format]
            )}
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
        <div className="mb-20 col-span-full xl:col-span-5 xl:col-start-3">
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
    </AnimatePresence>
  )
}

export default PaintingPage