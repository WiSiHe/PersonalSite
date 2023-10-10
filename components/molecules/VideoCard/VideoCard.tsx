/* eslint-disable @next/next/no-img-element */
import { AnimatePresence, motion } from "framer-motion"
import { iSanityVideo } from "lib/models/objects/sanityVideo"
import { urlForImage } from "lib/sanity.image"
import dynamic from "next/dynamic"
import { isNotEmptyArray } from "utils/array"
import { isNotEmptyObject } from "utils/object"

const Chip = dynamic(() => import("components/atoms/Chip/Chip"))

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
            <motion.div
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true }}
                variants={cardVariants}
                className="relative bg-white shadow-xl col-span-full xl:col-span-3"
            >
                <div className="relative bg-primary aspect-video">
                    <ReactPlayer
                        url={videoUrl}
                        loop
                        width="100%"
                        height="100%"
                        // className="w-full h-full"
                        light={
                            <img
                                src={
                                    hasThumbnail
                                        ? urlForImage(thumbnail)
                                              .width(650)
                                              .height(380)
                                              .quality(35)
                                              .url()
                                        : "/images/woods.png"
                                }
                                alt={title}
                                className="object-cover w-full h-full bg-primary"
                            />
                        }
                    />
                </div>
                <div className="p-4">
                    <h2 className="line-clamp-1">
                        <strong>{title}</strong>
                    </h2>
                    <p className="line-clamp-2">{description}</p>
                    {isNotEmptyArray(tags) && (
                        <div className="flex flex-wrap gap-2 pt-4 pointer-events-none">
                            {tags.map((tag) => {
                                const { name = "" } = tag
                                return <Chip key={name}>{name}</Chip>
                            })}
                        </div>
                    )}
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

export default VideoCard
