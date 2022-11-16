import PropTypes from "prop-types"
import Main from "components/Main"
import Meta from "components/Meta"
import Navigation from "components/Navigation"

// import PaintingGrid from "components/PaintingGrid"
// import SideMenu from "components/SideMenu"
import { getAllTagsAndPaintings } from "lib/api"
import React from "react"

import useScrollPosition from "hooks/useScrollPosition"
import { motion } from "framer-motion"
import { IoArrowUpSharp } from "react-icons/io5"
import Footer from "components/Footer"

const PaintingsPage = ({ videos = [] }) => {
  const scrollPosition = useScrollPosition()
  console.log({ videos })

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
      <Main noTopPadding className="overflow-clip">
        <section className="relative grid flex-1 flex-grow w-full h-full min-h-screen grid-cols-12 ring">
          <section className="col-span-full">videos go here</section>
        </section>

        {scrollPosition > 400 && (
          <motion.div
            className="fixed z-10 bottom-8 right-8"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: "spring" }}
            key="backbutton">
            <button
              onClick={handleClick}
              className="flex items-center justify-center p-2 text-2xl transition-all duration-200 ease-in-out bg-white rounded-lg shadow active:bg-highlight focus:outline-none focus:ring focus:ring-highlight">
              <IoArrowUpSharp />
            </button>
          </motion.div>
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
  const data = await getAllTagsAndPaintings(preview)

  if (data.length < 1) {
    return { props: {} }
  }

  //   const { paintings = [], tags = [] } = data

  return {
    props: {
      videos: []
    },
    revalidate: 7200 // 120  min
  }
}
