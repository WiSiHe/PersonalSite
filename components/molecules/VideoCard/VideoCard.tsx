/* eslint-disable @next/next/no-img-element */
import Chip from "components/atoms/Chip/Chip"
import { AnimatePresence, m } from "framer-motion"
import { iSanityVideo } from "lib/models/objects/sanityVideo"
import { imageBuilder } from "lib/sanity"
import dynamic from "next/dynamic"
import { useState } from "react"
import { isNotEmptyArray } from "utils/array"
import { isNotEmptyObject } from "utils/object"

const ReactPlayer = dynamic(() => import("react-player"), {
  suspense: true,
  ssr: false,
})

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

interface VideoCardProps {
  video: iSanityVideo
}

const VideoCard = ({ video }: VideoCardProps) => {
  const [displayTags, setDisplayTags] = useState(true)
  const {
    title = "",
    description = "",
    videoUrl = "",
    tags = [],
    thumbnail = {},
  } = video

  const hasThumbnail = isNotEmptyObject(thumbnail)

  return (
    <AnimatePresence>
      <m.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true }}
        variants={cardVariants}
        className="relative flex flex-col justify-between h-full bg-white rounded-lg shadow-xl col-span-full xl:col-span-4 overflow-clip"
      >
        <div className="p-4">
          <h2 className="">
            <strong>{title}</strong>
          </h2>
          <p>{description}</p>
          {isNotEmptyArray(tags) && displayTags && (
            <div className="absolute bottom-0 left-0 right-0 flex flex-wrap gap-2 p-4 pointer-events-none">
              {tags.map((tag) => {
                const { name = "" } = tag
                return <Chip key={name}>{name}</Chip>
              })}
            </div>
          )}
        </div>

        <ReactPlayer
          url={videoUrl}
          loop
          width="100%"
          height="100%"
          onStart={() => setDisplayTags(false)}
          className="aspect-video"
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
              className="object-cover bg-primary"
            />
          }
        />
      </m.div>
    </AnimatePresence>
  )
}

export default VideoCard
