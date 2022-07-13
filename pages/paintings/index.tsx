import Filters from "components/Filters"
import Main from "components/Main"
import Meta from "components/Meta"
import Navigation from "components/Navigation"
import NavigationDrawer from "components/NavigationDrawer"
import PaintingGrid from "components/PaintingGrid"
// import SideMenu from "components/SideMenu"
import { getAllTagsAndPaintings } from "lib/api"
import React from "react"
import { PaintingsPageProps } from "./[slug]"
import useScrollPosition from "hooks/useScrollPosition"
import { motion } from "framer-motion"
import { IoArrowUpSharp } from "react-icons/io5"

const PaintingsPage = ({ paintings, tags, slug = "all" }: PaintingsPageProps) => {
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
      <NavigationDrawer />
      <Main noTopPadding>
        <section className="relative grid flex-1 flex-grow h-full min-h-screen grid-cols-12">
          {/* <section className="relative hidden h-full col-span-2 bg-stone-100 xl:block">
            <div className="sticky  top-0 w-full h-[fit-content]">
              <SideMenu />
            </div>
          </section> */}
          <section className="col-span-full">
            <div className="sticky top-0 z-10 bg-stone-200 bg-opacity-30 backdrop-blur-lg">
              <Filters filteredTags={tags} activeFilter={slug} />
            </div>
            <PaintingGrid paintings={paintings} filterTag={slug} />
          </section>
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
    </>
  )
}

export default PaintingsPage

export async function getStaticProps({ preview = false }) {
  const data = await getAllTagsAndPaintings(preview)

  if (data.length < 1) {
    return { props: {} }
  }

  const paintings = data.paintings

  const flattenedTags = data.tags.filter(tag => tag !== null).flat()
  const tagValues = flattenedTags.map(tag => tag.label)

  const result = {}

  for (let i = 0; i < tagValues.length; ++i) {
    if (!result[tagValues[i]]) result[tagValues[i]] = 0
    ++result[tagValues[i]]
  }

  // convert result to object with name and count

  const convertedResult = Object.entries(result).map(w => {
    return {
      label: w[0],
      count: w[1]
    }
  })

  const allTag = { label: "all", count: paintings.length }

  const alltags = [allTag, ...convertedResult]
    .filter(t => t.count > 5)
    .sort((a, b) => b.count - a.count)

  // sort paintings randomly
  const randomPaintings = paintings.sort(() => Math.random() - 0.5)

  return {
    props: {
      paintings: randomPaintings,
      tags: alltags
    },
    revalidate: 7200 // 120  min
  }
}
