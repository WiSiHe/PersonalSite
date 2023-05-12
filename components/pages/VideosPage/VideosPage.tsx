"use client"
import Chip from "components/atoms/Chip/Chip"
import Main from "components/atoms/Main/Main"
import ScrollToTopButton from "components/atoms/ScrollToTopButton/ScrollToTopButton"
import VideoCard from "components/molecules/VideoCard/VideoCard"
import { iSanityVideoTag } from "lib/models/objects/SanityTag"
import { iSanityVideo } from "lib/models/objects/sanityVideo"
import { useState } from "react"

interface VideosPage {
  videos: iSanityVideo[]
  tags: iSanityVideoTag[]
}

const VideosPage = ({ videos = [], tags = [] }: VideosPage) => {
  const [selectedTag, setSelectedTag] = useState("All")

  const allTags = [{ name: "All", videoCount: videos.length }, ...tags]

  const handleSelectTag = (tag: string) => {
    setSelectedTag(tag)
  }

  return (
    <>
      <section className="max-w-2xl">
        <h1>Videos</h1>
        <p>
          Find my diverse videos: painting time-lapses, game dev, and hand-drawn
          animations. A chance to learn new skills and experiment creatively.
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
    </>
  )
}

export default VideosPage
