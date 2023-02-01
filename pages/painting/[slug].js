import clsx from "clsx"
// Components
import { Main, Meta, Navigation, RedbubbleLink, SocialLinks } from "components"
import { m } from "framer-motion"
// Helpers
import generatePaintingJsonLd from "helpers/jsonLdHelpers"
import { getAllPaintingSlugs, getPaintingDetails } from "lib/api"
// Libs
import { imageBuilder } from "lib/sanity"
import dynamic from "next/dynamic"
import Link from "next/link"
import { useRouter } from "next/router"
import PropTypes from "prop-types"
import React from "react"
import { Suspense } from "react"
import { IoArrowBackSharp } from "react-icons/io5"
import { LazyLoadImage } from "react-lazy-load-image-component"

const ReactPlayer = dynamic(() => import("react-player"), {
  suspense: true,
})

export default function Gallery({ painting = {}, slug = {} }) {
  const router = useRouter()

  const {
    // _id,
    images = [],
    imagesCount = 0,
    title = "",
    description = "",
    image,
    format = "square",
    // tagCount = 0,
    redbubbleUrl = "",
    tagsV2 = [],
    video = "",
  } = painting

  const { current = "" } = slug

  // const uniqueTags = [...new Set(tags)]
  const hasRedBubleLink = redbubbleUrl !== ""

  const hasStoreLinks = hasRedBubleLink

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
    router.back({ scroll: true })
  }

  return (
    <>
      <Meta
        title={title}
        description={description}
        image={imageBuilder(image).width(128).height(128).quality(75).url()}
        jsonLd={generatePaintingJsonLd(painting)}
        url={`https://wisihe.no/painting/${current}`}
      />
      <Navigation />
      <Main
        noTopPadding
        className="flex flex-col xl:grid xl:grid-cols-12 xl:gap-4 xl:p-20 "
      >
        <m.div
          className="fixed z-10 bottom-4 left-4 xl:top-24 xl:left-6 "
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ type: "spring" }}
          key="backbutton"
        >
          <button
            onClick={handleGoBack}
            className="flex items-center justify-center gap-2 px-4 py-2 text-xl shadow-lg transition-all duration-200 ease-in-out bg-primary text-white hover:ring hover:shadow-lg active:bg-highlight focus:outline-none focus:ring focus:ring-highlight "
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
          className={clsx(
            "flex relative flex-col h-fit col-span-full w-full xl:col-span-5 xl:col-start-3",
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
            className={clsx("h-fit")}
          />
        </m.div>

        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: "spring", delay: 0.2, duration: 0.5 }}
          key="text-section"
          className="relative p-4 justify-between transition-all xl:sticky xl:top-4 xl:z-10 col-span-full h-fit xl:bg-white xl:p-6 xl:col-span-4"
        >
          <div>
            <h1 className="pb-2 pt-2 xl:pt-0 text-2xl lg:text-4xl">
              <strong>{title}</strong>
            </h1>
            <div className="flex flex-wrap gap-2">
              {tagsV2?.map((tag) => {
                const { name = "" } = tag
                const tagSlug = name.toLowerCase().replace(" ", "-")
                return (
                  <Link
                    className="px-2 py-1 text-xs text-white capitalize bg-primary"
                    key={name}
                    href={`/paintings/${tagSlug}`}
                  >
                    {name}
                  </Link>
                )
              })}
            </div>
            <p className="py-2">
              {description
                ? description
                : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum facilisis, augue eu mattis ultrices, ipsum metus porttitor turpis, et convallis lorem tortor nec erat."}
            </p>
            {hasStoreLinks && (
              <h3>
                <b>Store links:</b>
              </h3>
            )}
            {hasRedBubleLink && (
              <RedbubbleLink
                hasRedBubleLink={hasRedBubleLink}
                redbubbleUrl={redbubbleUrl}
              />
            )}
          </div>
          <div className="pb-10 pt-10 xl:pt-4 xl:pb-0">
            <SocialLinks />
          </div>
        </m.div>

        {imagesCount > 0 && (
          <>
            {images.map((image, index) => {
              return (
                <div
                  key={`picture-${index}`}
                  className={clsx(
                    "bg-white relative col-span-full xl:col-span-5 xl:col-start-3 pb-4",
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
          </>
        )}
        {video && (
          <div className="mb-20 col-span-full xl:col-span-5 xl:col-start-3">
            <div className="w-full aspect-video">
              <Suspense fallback={<div>Loading...</div>}>
                <ReactPlayer
                  url={video}
                  loop
                  muted
                  playing
                  width="100%"
                  height="100%"
                />
              </Suspense>
            </div>
          </div>
        )}
      </Main>
    </>
  )
}

Gallery.propTypes = {
  painting: PropTypes.object,
  slug: PropTypes.object,
}

export async function getStaticProps({ params }) {
  const { slug = "" } = params
  const data = await getPaintingDetails(slug)

  if (data.length < 1) {
    return { props: {} }
  }

  const painting = data[0] || {}

  return {
    props: {
      painting,
    },
    //  revalidate evry 3 hour
    revalidate: 60 * 60 * 3,
  }
}

export async function getStaticPaths() {
  const allPaintings = await getAllPaintingSlugs()

  return {
    paths:
      allPaintings?.map((painting) => ({
        params: {
          slug: painting.slug,
        },
      })) || [],
    fallback: false,
  }
}
