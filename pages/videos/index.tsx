/* eslint-disable @next/next/no-img-element */
import Meta from "components/atoms/Meta/Meta"
import VideosPage from "components/pages/VideosPage"
import { getAllVideosAndTags } from "lib/api"
import { iSanityVideoTag } from "lib/models/objects/SanityTag"
import { iSanityVideo } from "lib/models/objects/sanityVideo"
import React from "react"

interface iSanityVideoProps {
  videos: iSanityVideo[]
  tags: iSanityVideoTag[]
}

const PaintingsPage = ({ videos = [], tags = [] }: iSanityVideoProps) => {
  return (
    <>
      <Meta
        title="Gallery"
        url="https://wisihe.no/videos"
        description="A gallery of some of my videos"
      />
      <VideosPage videos={videos} tags={tags} />
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
    tags: iSanityVideoTag[]
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
