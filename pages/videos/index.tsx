import dynamic from "next/dynamic"

const ReactPlayer = dynamic(() => import("react-player"), {
  suspense: true,
})

import { Chip, Footer, Main, Meta } from "components"
import { m } from "framer-motion"
// import ReactPlayer from "react-player"
// const ReactPlayer = React.lazy(() => import("react-player"))
import useScrollPosition from "hooks/useScrollPosition"
import { getAllVideos } from "lib/api"
import { iSanityVideo } from "lib/models/objects/sanityVideo"
import React, { Suspense } from "react"
import { IoArrowUpSharp } from "react-icons/io5"
import { isNotEmptyArray } from "utils/array"

const cardVariants = {
  offscreen: {
    y: 200,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
    },
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
        url="https://wisihe.no/gallery"
        description="A gallery of some of my paintings"
      />
      <Main className="py-4 xl:py-10" noTopPadding>
        <section className="grid w-full max-w-screen-xl grid-cols-12 gap-4 p-4 mx-auto space-y-4">
          <section className="col-span-full">
            <h1 className="text-4xl">Videos</h1>
            <p>Here you can find some of my videos.</p>
          </section>
          {videos.map((video) => {
            const {
              _id = "",
              title = "",
              description = "",
              videoUrl = "",
              tags = [],
            } = video

            return (
              <m.div
                key={_id}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.1 }}
                variants={cardVariants}
                className="p-4 bg-white shadow-xl col-span-full aspect-video"
              >
                <div className="pb-8">
                  <h2 className="text-lg">
                    <strong>{title}</strong>
                  </h2>
                  <div>{description}</div>
                  {isNotEmptyArray(tags) && (
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => {
                        return (
                          <div key={tag.name}>
                            <Chip>{tag.name}</Chip>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>

                <Suspense fallback={<div>Loading...</div>}>
                  <ReactPlayer url={videoUrl} loop width="100%" height="100%" />
                </Suspense>
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
