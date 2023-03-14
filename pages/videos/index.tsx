/* eslint-disable @next/next/no-img-element */
import dynamic from "next/dynamic"

const ReactPlayer = dynamic(() => import("react-player"), {
  suspense: true,
  ssr: false,
})

import { Chip, Footer, Main, Meta } from "components"
import { m } from "framer-motion"
// import ReactPlayer from "react-player"
// const ReactPlayer = React.lazy(() => import("react-player"))
import useScrollPosition from "hooks/useScrollPosition"
import { getAllVideos } from "lib/api"
import { iSanityVideo } from "lib/models/objects/sanityVideo"
import { imageBuilder } from "lib/sanity"
import React, { Suspense } from "react"
import { IoArrowUpSharp } from "react-icons/io5"
import { isNotEmptyArray } from "utils/array"
import { isNotEmptyObject } from "utils/object"

const cardVariants = {
  offscreen: {
    y: 100,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
  },
}

interface iSanityVideoProps {
  videos: iSanityVideo[]
}

const PaintingsPage = ({ videos = [] }: iSanityVideoProps) => {
  const scrollPosition = useScrollPosition()

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    })
  }
  return (
    <>
      <Meta
        title="Gallery"
        url="https://wisihe.no/videos"
        description="A gallery of some of my videos"
      />
      <Main className="py-4 xl:py-10" noTopPadding>
        <section className="grid w-full max-w-screen-xl grid-cols-12 gap-4 p-4 mx-auto space-y-4">
          <section className="col-span-full xl:col-span-8">
            <h1 className="text-4xl">Videos</h1>
            <p>
              Explore a collection of my diverse videos, ranging from painting
              time-lapses and game development to hand-drawn animations. My
              videos are a creative outlet that showcase my passions and
              interests, allowing me to experiment with various techniques and
              technologies. Each video project represents a unique opportunity
              to challenge myself and learn new skills, whether it&lsquo;s
              through the creative process or technical execution.
            </p>
          </section>
          {videos.map((video) => {
            const {
              _id = "",
              title = "",
              description = "",
              videoUrl = "",
              tags = [],
              thumbnail = {},
            } = video

            const hasThumbnail = isNotEmptyObject(thumbnail)

            return (
              <m.div
                key={_id}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true }}
                variants={cardVariants}
                className="relative flex flex-col justify-between h-full bg-white shadow-xl col-span-full xl:col-span-6"
              >
                <div className="p-4">
                  <h2 className="text-3xl">
                    <strong>{title}</strong>
                  </h2>
                  <div>{description}</div>
                  {isNotEmptyArray(tags) && (
                    <div className="absolute bottom-0 left-0 right-0 flex flex-wrap gap-2 p-4 pointer-events-none">
                      {tags.map((tag) => {
                        return (
                          <div key={tag.name} className="text-xs">
                            <Chip>{tag.name}</Chip>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>

                <div className="aspect-video">
                  <Suspense fallback={<div>Loading...</div>}>
                    <ReactPlayer
                      url={videoUrl}
                      loop
                      width="100%"
                      height="100%"
                      light={
                        <img
                          src={
                            hasThumbnail
                              ? imageBuilder(thumbnail)
                                  .width(650)
                                  .height(380)
                                  .quality(35)
                                  .url()
                              : "/images/woods.png"
                          }
                          alt={title}
                          className="object-cover w-full h-full aspect-video bg-primary"
                        />
                      }
                    />
                  </Suspense>
                </div>
              </m.div>
            )
          })}
        </section>

        {scrollPosition > 400 && (
          <m.div
            className="fixed z-10 bottom-8 right-8"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: "spring" }}
            key="backbutton"
          >
            <button
              onClick={handleClick}
              className="flex items-center justify-center p-2 text-2xl transition-all duration-200 ease-in-out bg-white shadow active:bg-highlight focus:outline-none focus:ring focus:ring-highlight"
            >
              <IoArrowUpSharp />
            </button>
          </m.div>
        )}
      </Main>
      <Footer />
    </>
  )
}

export default PaintingsPage

export async function getStaticProps() {
  const data = await getAllVideos()

  if (data.length < 1) {
    return { props: {} }
  }

  return {
    props: {
      videos: data || [],
    },
    revalidate: 7200, // 120  min
  }
}
