/* eslint-disable @next/next/no-img-element */
import Chip from "components/atoms/Chip/Chip"
import Main from "components/atoms/Main/Main"
import Meta from "components/atoms/Meta/Meta"
import ScrollToTopButton from "components/atoms/ScrollToTopButton/ScrollToTopButton"
import Footer from "components/molecules/Footer/Footer"
import VideoCard from "components/molecules/VideoCard/VideoCard"
import { getAllVideosAndTags } from "lib/api"
import { iSanityTag } from "lib/models/objects/SanityTag"
import { iSanityVideo } from "lib/models/objects/sanityVideo"
import React, { useState } from "react"

interface iSanityVideoProps {
  videos: iSanityVideo[]
  tags: iSanityTag[]
}

const PaintingsPage = ({ videos = [], tags = [] }: iSanityVideoProps) => {
  const [selectedTag, setSelectedTag] = useState("All")

  const allTags = [{ name: "All", videoCount: videos.length }, ...tags]

  const handleSelectTag = (tag: string) => {
    setSelectedTag(tag)
  }

  return (
    <>
      <Meta
        title="Gallery"
        url="https://wisihe.no/videos"
        description="A gallery of some of my videos"
      />
      <Main className="flex-col min-h-screen p-4 mx-auto max-w-screen-2xl">
        <section className="max-w-2xl">
          <h1>Videos</h1>
          <p>
            Find my diverse videos: painting time-lapses, game dev, and
            hand-drawn animations. A chance to learn new skills and experiment
            creatively.
          </p>
        </section>
        <section className="flex gap-1 pt-4 overflow-x-scroll">
          {allTags.map((tag, i) => {
            const { name = "", videoCount = 0 } = tag

            const isSelected = name === selectedTag

            return (
              <>
                <button onClick={() => handleSelectTag(name)} key={i}>
                  <Chip
                    key={name}
                    hasStatus={isSelected ? "selected" : "notSelected"}
                  >
                    {name}({videoCount})
                  </Chip>
                </button>
              </>
            )
          })}
        </section>
        <section className="grid grid-cols-12 gap-4 pt-4">
          {videos
            .filter((video) => {
              const { tags = [] } = video

              if (selectedTag === "All") {
                return true
              }

              return tags.some((tag) => {
                const { name = "" } = tag

                return name === selectedTag
              })
            })
            .map((video) => {
              return <VideoCard video={video} key={video._id} />
            })}
        </section>

        <ScrollToTopButton />
      </Main>
      <Footer />
    </>
  )
}

export default PaintingsPage

export async function getStaticProps() {
  const data = await getAllVideosAndTags()

  if (data.length < 1) {
    return { props: {} }
  }

  const {
    videos = [],
    tags = [],
  }: {
    videos: iSanityVideo[]
    tags: iSanityTag[]
  } = data

  const filteredTags = tags.filter((tag) => {
    const { name = "", videoCount = 0 } = tag

    return name !== "All" && videoCount > 0
  })

  const sortedTags = filteredTags.sort((a, b) => {
    const { videoCount: aVideoCount = 0 } = a
    const { videoCount: bVideoCount = 0 } = b

    return bVideoCount - aVideoCount
  })

  return {
    props: {
      videos: videos,
      tags: sortedTags,
    },
    revalidate: 7200, // 120  min
  }
}
