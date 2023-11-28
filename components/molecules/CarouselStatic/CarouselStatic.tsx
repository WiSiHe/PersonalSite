"use client"
import Button from "components/atoms/Button"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useRef, useState } from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { isEmptyArray } from "utils/array"

import { iSanityPainting } from "@/lib/models/objects/sanityPainting"
import { urlForImage } from "@/lib/sanity.image"
import { cn } from "@/utils/utility"

const randomSortPaintings = (paintings: iSanityPainting[]) => {
    if (isEmptyArray(paintings)) return paintings
    return paintings.sort(() => 0.5 - Math.random())
}

type CarouselStatic = {
    paintings?: iSanityPainting[]
}
const CarouselStatic = ({ paintings = [] }: CarouselStatic) => {
    const scrollRef = useRef<HTMLUListElement>(null)

    const [sortedPaintings] = useState(randomSortPaintings(paintings))

    const imageWidth = 500 // Replace with your image width

    const handleScrollLeft = () => {
        if (!scrollRef.current) return
        if (scrollRef.current.scrollWidth > scrollRef.current.clientWidth) {
            scrollRef.current.scrollTo({
                left: scrollRef.current.scrollLeft - imageWidth,
                behavior: "smooth",
            })
        } else {
            console.log("Element does not have overflow content")
        }
    }

    const handleScrollRight = () => {
        if (!scrollRef.current) return
        if (scrollRef.current.scrollWidth > scrollRef.current.clientWidth) {
            scrollRef.current.scrollTo({
                left: scrollRef.current.scrollLeft + imageWidth,
                behavior: "smooth",
            })
        } else {
            console.log("Element does not have overflow content")
        }
    }

    return (
        <motion.section
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: "some" }}
            transition={{ type: "spring", delay: 0.5 }}
            className="relative"
        >
            <ul
                ref={scrollRef}
                className="flex items-stretch w-full gap-4 pt-8 pb-16 pl-8 pr-4 h-72 lg:h-[520px] overflow-x-scroll snap-x scroll-px-4"
            >
                {sortedPaintings.map((painting, i) => {
                    const { format, image } = painting

                    const { lqip } = image

                    const formatStyle = {
                        square: "aspect-square",
                        landscape: "aspect-video",
                        portrait: "aspect-[12/16]",
                    }[format]

                    const sanityWidth = {
                        square: 400,
                        landscape: 600,
                        portrait: 400,
                    }[format]

                    const sanityHeight = {
                        square: 400,
                        landscape: 300,
                        portrait: 600,
                    }[format]

                    return (
                        <li
                            key={i}
                            className={cn(
                                "relative flex-shrink-0 bg-white rounded-lg hover:drop-shadow-lg group h-full snap-start",
                                formatStyle,
                            )}
                        >
                            <Link
                                href={`/paintings/${painting.slug}`}
                                aria-label="View painting"
                            >
                                <article
                                    className={cn(
                                        "relative w-full h-full bg-primary rounded-lg overflow-clip group",
                                        formatStyle,
                                    )}
                                >
                                    <Image
                                        src={urlForImage(image)
                                            .width(sanityWidth)
                                            .height(sanityHeight)
                                            .quality(70)
                                            .url()}
                                        sizes="(min-width: 1024px) 400px, (min-width: 768px) 300px, 200px"
                                        fill
                                        placeholder={lqip ? "blur" : "empty"}
                                        blurDataURL={lqip ? lqip : undefined}
                                        quality={30}
                                        // unoptimized={storybook}
                                        alt=""
                                        className={cn(
                                            "group-hover:scale-110",
                                            "object-cover w-full h-full transition-all pointer-events-none duration-500 ease-in-out bg-center bg-cover aspect-square",
                                        )}
                                    />
                                </article>
                            </Link>
                        </li>
                    )
                })}
            </ul>
            <div className="absolute flex gap-4 bottom-4 right-4">
                <Button
                    color="primary"
                    onClick={handleScrollLeft}
                    label="Scroll Left"
                >
                    <FaChevronLeft />
                </Button>
                <Button
                    color="primary"
                    onClick={handleScrollRight}
                    label="Scroll Right"
                >
                    <FaChevronRight />
                </Button>
            </div>
        </motion.section>
    )
}

export default CarouselStatic
