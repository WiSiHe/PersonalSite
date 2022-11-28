import PropTypes from "prop-types"

import dynamic from "next/dynamic"

const ReactPlayer = dynamic(() => import("react-player"), {
  suspense: true
})

import Main from "components/Main"
import Meta from "components/Meta"
import Navigation from "components/Navigation"

import { getAllVideos } from "lib/api"
import React, { Suspense } from "react"
// import ReactPlayer from "react-player"
// const ReactPlayer = React.lazy(() => import("react-player"))

import useScrollPosition from "hooks/useScrollPosition"
import { m } from "framer-motion"
import { IoArrowUpSharp } from "react-icons/io5"
import Footer from "components/Footer"
import clsx from "clsx"

const cardVariants = {
  offscreen: {
    y: 200,
    opacity: 0
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring"
    }
  }
}

const PaintingsPage = ({ videos = [] }) => {
  const scrollPosition = useScrollPosition()

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    })
  }
  return (
    <>
      <Meta
        title="Gallery"
        url="https://wisihe.no/gallery"
        description="A gallery of some of my paintings"
      />
      <Navigation />
      <Main noTopPadding className="p-4">
        <section className="grid w-full grid-cols-12 gap-10 mx-auto max-w-screen-2xl">
          {videos.map((v, i) => {
            const { _id = "", title = "", description = "", video = "" } = v

            // every other card is on the other side
            const isEven = i % 2 === 0

            return (
              <m.div
                key={_id}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.05 }}
                variants={cardVariants}
                className={clsx(
                  "col-span-8 p-4 bg-white rounded shadow-xl h-fit",
                  !isEven && "col-start-5"
                )}
              >
                <div className="pb-4">
                  <h2>
                    <b>{title}</b>
                  </h2>
                  <p>{description}</p>
                </div>
                <div className="aspect-video">
                  <Suspense fallback={<div>Loading...</div>}>
                    <ReactPlayer url={video} loop width="100%" height="100%" />
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
              className="flex items-center justify-center p-2 text-2xl transition-all duration-200 ease-in-out bg-white rounded-lg shadow active:bg-highlight focus:outline-none focus:ring focus:ring-highlight"
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

PaintingsPage.propTypes = {
  videos: PropTypes.array
}

export default PaintingsPage

export async function getStaticProps({ preview = false }) {
  const data = await getAllVideos(preview)

  if (data.length < 1) {
    return { props: {} }
  }

  return {
    props: {
      videos: data || []
    },
    revalidate: 7200 // 120  min
  }
}
