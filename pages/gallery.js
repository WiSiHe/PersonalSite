import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { IoArrowUpSharp } from "react-icons/io5"
import useScrollPosition from "hooks/useScrollPosition"
import { useRouter } from "next/router"

import { motion } from "framer-motion"
import clsx from "clsx"

import Meta from "components/Meta"
import Main from "components/Main"

import Navigation from "components/Navigation"

import SideMenu from "components/SideMenu"
import NavigationDrawer from "components/NavigationDrawer"
import Carousel from "components/Carousel"

import { getAllTagsAndPaintings } from "../lib/api"

import PaintingGrid from "components/PaintingGrid"
import Filters from "components/Filters"
import Link from "next/link"
import { BiChevronRight } from "react-icons/bi"

const cardVariants = {
  offscreen: {
    y: 100,
    opacity: 0
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 1
    }
  }
}

export default function Home({ paintings = [], tags = [] }) {
  const router = useRouter()
  const { query = {} } = router
  const { filter = "" } = query

  const [filterTag, setFilterTag] = useState(filter)

  const paintingsAmount = paintings.length
  const allTag = ["all", paintingsAmount]

  // const scrollPosition = useScrollPosition()
  console.log(tags)
  const allTags = [allTag, ...tags]

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    })
  }

  // handle filter change and update url
  const handleChangeFilter = value => {
    setFilterTag(value)
    if (value === "") {
      router.push("/gallery")
    } else {
      router.push(`/gallery?filter=${value}`)
    }
  }

  useEffect(() => {
    if (!filter) return
    setFilterTag(filter.toLowerCase())
  }, [filter])

  return (
    <>
      <Meta
        title="Gallery"
        url="https://wisihe.no/gallery"
        description="A gallery of some of my paintings"
      />
      <Navigation hideOnDesktop darkMode />
      <NavigationDrawer />
      <Main noTopPadding>
        <section className="relative grid flex-1 flex-grow h-full min-h-screen grid-cols-12">
          <section className="relative hidden h-full col-span-2 bg-stone-100 xl:block">
            <div className="sticky  top-0 w-full h-[fit-content]">
              <SideMenu />
            </div>
          </section>
          <section className="relative col-span-12 xl:col-span-10">
            <div className="p-4 pt-10 xl:items-start ">
              <h1 className="text-4xl">My Gallery</h1>
              <p className="max-w-2xl pt-4">
                My little gallery of digital paintings that I have made over the years. Some of
                these are for sale, if you find one you like, and it&apos;s not for sale, feel free
                to contact me, and I&apos;m sure that I can fix something :)
              </p>
            </div>

            <section className="hidden lg:block">
              <Filters
                activeFilter={filterTag}
                setFilterTag={handleChangeFilter}
                paintingsAmount={paintingsAmount}
                filteredTags={allTags}
              />
            </section>
            <section className="space-y-4">
              {allTags.map(tag => {
                const tagFilter = tag[0].toLowerCase()
                const tagCount = tag[1]

                const linkUrl = tagFilter === "all" ? "/paintings" : `/paintings/${tagFilter}`

                return (
                  <div key={tagFilter}>
                    <motion.div
                      className="relative"
                      initial="offscreen"
                      whileInView="onscreen"
                      viewport={{ once: true, amount: 0.1 }}
                      variants={cardVariants}>
                      <div className="relative flex items-center justify-between px-4 mb-2">
                        <div className="flex items-start">
                          <h2 className="text-2xl capitalize">
                            <strong>{tagFilter}</strong>
                          </h2>
                          <span className="text-xs">({tagCount})</span>
                        </div>
                        <Link href={linkUrl} passHref>
                          <a className="flex items-center">
                            <strong>See all</strong>
                            <BiChevronRight />
                          </a>
                        </Link>
                      </div>

                      <Carousel paintings={paintings} filterTag={tagFilter} />
                    </motion.div>
                  </div>
                )
              })}
            </section>

            {/* <section className="hidden lg:block">
              <PaintingGrid paintings={paintings} filterTag={filterTag} />
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
            </section> */}
          </section>
        </section>
      </Main>
    </>
  )
}

Home.propTypes = {
  headerImage: PropTypes.any,
  paintings: PropTypes.array,
  tags: PropTypes.array,
  thumbnailImage: PropTypes.any,
  wallpaperPaintings: PropTypes.any
}

export async function getStaticProps({ preview = false }) {
  const data = await getAllTagsAndPaintings(preview)

  if (data.length < 1) {
    return { props: {} }
  }

  const flattenedTags = data.tags.filter(tag => tag !== null).flat()

  const tagValues = flattenedTags.map(tag => tag.label)

  const result = {}

  for (let i = 0; i < tagValues.length; ++i) {
    if (!result[tagValues[i]]) result[tagValues[i]] = 0
    ++result[tagValues[i]]
  }

  const filteredTags = Object.entries(result).filter(w => w[1] > 10)

  const paintings = data.paintings

  // sort paintings randomly
  const randomPaintings = paintings.sort(() => Math.random() - 0.5)

  return {
    props: {
      paintings: randomPaintings,
      tags: filteredTags
    },
    revalidate: 7200 // 120  min
  }
}
