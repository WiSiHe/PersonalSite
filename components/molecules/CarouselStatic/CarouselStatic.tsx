"use client"
import Button from "components/atoms/Button"
import { motion } from "framer-motion"
import Image from "next/image"
import night from "public/images/night-forest.jpeg"
import celestial from "public/images/paintings/Celestial.jpg"
import creepy from "public/images/paintings/creepy.jpg"
import hell from "public/images/paintings/hell.jpg"
import space from "public/images/paintings/Space.jpg"
import sunlight from "public/images/paintings/sunlight.jpg"
import winter from "public/images/paintings/winter.jpg"
import { useEffect, useRef, useState } from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { isEmptyArray } from "utils/array"

const paintings = [
    {
        id: 1,
        name: "Celestial",
        image: celestial,
        description: "Celesital",
    },
    {
        id: 4,
        name: "Night",
        image: night,
        description: "Night",
    },
    {
        id: 5,
        name: "Space",
        image: space,
        description: "Space",
    },
    {
        id: 6,
        name: "Hell",
        image: hell,
        description: "Hell",
    },
    {
        id: 7,
        name: "Creepy",
        image: creepy,
        description: "Creepy",
    },
    {
        id: 8,
        name: "Sunlight",
        image: sunlight,
        description: "Sunlight",
    },
    {
        id: 9,
        name: "Winter",
        image: winter,
        description: "Winter",
    },
]

const CarouselStatic = () => {
    const scrollRef = useRef<HTMLUListElement>(null)

    const [sortedPaintings, setSortedPaintings] = useState(paintings)

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

    useEffect(() => {
        if (!paintings || isEmptyArray(paintings)) return
        setSortedPaintings(paintings.sort(() => 0.5 - Math.random()))
    }, [])

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
                className="flex flex-no-wrap items-start w-full gap-4 pt-8 pb-16 pl-4 pr-8 overflow-x-scroll scrolling-touch"
            >
                {sortedPaintings.map((painting, i) => (
                    <li
                        key={i}
                        className="relative flex-none aspect-square rounded-lg h-80 xl:h-[520px] overflow-clip"
                    >
                        <Image
                            src={painting.image}
                            placeholder="blur"
                            quality={50}
                            alt={painting.description}
                            className="object-cover w-full h-full"
                            sizes="(min-width: 1280px) 615px, 320px"
                            fill
                        />
                    </li>
                ))}
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
