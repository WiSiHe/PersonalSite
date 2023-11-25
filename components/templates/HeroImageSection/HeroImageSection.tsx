"use client"
import Chip from "components/atoms/Chip/Chip"
import LinkButton from "components/atoms/LinkButton/LinkButton"
import GreeterCard from "components/molecules/GreeterCard"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"
import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa"
import { cn } from "utils/utility"

import { iSanityPainting } from "@/lib/models/objects/sanityPainting"
import { urlForImage } from "@/lib/sanity.image"

type HeroImageSection = {
    paintings?: iSanityPainting[]
}
const HeroImageSection = ({ paintings = [] }: HeroImageSection) => {
    const [currentPaintingsIndex, setCurrentPaintingsIndex] = useState(0)

    const handleNextBackground = () => {
        const nextIndex = currentPaintingsIndex + 1
        if (nextIndex > paintings.length - 1) {
            setCurrentPaintingsIndex(0)
        } else {
            setCurrentPaintingsIndex(nextIndex)
        }
    }

    const handlePreviousBackground = () => {
        const previousIndex = currentPaintingsIndex - 1
        if (previousIndex < 0) {
            setCurrentPaintingsIndex(paintings.length - 1)
        } else {
            setCurrentPaintingsIndex(previousIndex)
        }
    }

    const currentBackground =
        paintings.at(currentPaintingsIndex) || paintings[0] || {}

    const { image, altText = "", _id } = currentBackground
    const { lqip } = image

    const sanityWidth = 1280
    const sanityHeight = 720

    return (
        <section
            key="hero"
            className="relative w-full min-h-[600px] bg-dark flex flex-col justify-center px-4 py-10 h-fit xl:min-h-screen overflow-clip"
        >
            <Image
                src={urlForImage(currentBackground.image)
                    .width(sanityWidth)
                    .height(sanityHeight)
                    .quality(70)
                    .url()}
                fill
                alt=""
                placeholder={lqip ? "blur" : "empty"}
                blurDataURL={lqip ? lqip : undefined}
                quality={1}
                priority
                sizes="100vw"
                className="object-cover xl:scale-150 blur-xl"
            />
            <div className="relative z-10 flex flex-col items-center w-full gap-8 mx-auto max-w-screen-2xl xl:grid xl:grid-cols-12 xl:pt-32 xl:gap-10 xl:items-center">
                <section className="z-10 w-full pt-24 col-span-full xl:col-span-4 xl:pt-0">
                    <GreeterCard />
                </section>
                <section className="relative z-10 w-full col-span-full xl:col-span-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentPaintingsIndex}
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1.0 }}
                            exit={{ scale: 0.9 }}
                            transition={{ type: "spring", duration: 1 }}
                            className="relative w-full h-full aspect-video rounded-2xl bg-dark/20"
                        >
                            <div className="absolute left-0 right-0 z-10 flex items-center justify-center rounded-full -top-2 drop-shadow-xl">
                                <Chip hasStatus="selected">
                                    <FaStar /> Featured
                                </Chip>
                            </div>
                            <Image
                                key={_id + "hero"}
                                src={urlForImage(currentBackground.image)
                                    .width(sanityWidth)
                                    .height(sanityHeight)
                                    .quality(70)
                                    .url()}
                                alt={altText}
                                placeholder={lqip ? "blur" : "empty"}
                                blurDataURL={lqip ? lqip : undefined}
                                quality={40}
                                fill
                                priority
                                sizes="(min-width: 2080px) 1267px, (min-width: 1280px) calc(57.44vw + 84px), calc(100vw - 32px)"
                                className={cn(
                                    "object-cover w-10 rounded-2xl bg-tertiary",
                                )}
                            />
                        </motion.div>
                    </AnimatePresence>

                    <section className="z-10 flex items-center justify-between w-full gap-4 pt-6 pb-10 capitalize xl:col-start-5 col-span-full xl:justify-center xl:gap-6">
                        <button
                            className="p-3 text-white rounded-lg bg-primary"
                            onClick={handlePreviousBackground}
                            aria-label="Previous painting"
                        >
                            <FaChevronLeft />
                        </button>
                        <LinkButton href="/paintings" hasIcon={false}>
                            <span className="hidden">Check out the</span>{" "}
                            painting gallery
                        </LinkButton>
                        <button
                            className="p-3 text-white rounded-lg bg-primary"
                            onClick={handleNextBackground}
                            aria-label="Next painting"
                        >
                            <FaChevronRight />
                        </button>
                    </section>
                </section>
            </div>
        </section>
    )
}

export default HeroImageSection
