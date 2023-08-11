"use client"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import night from "public/images/night-forest.jpeg"
import celestial from "public/images/paintings/Celestial.jpg"
import creepy from "public/images/paintings/creepy.jpg"
import darkSouls from "public/images/paintings/darksouls.jpg"
import hell from "public/images/paintings/hell.jpg"
import space from "public/images/paintings/Space.jpg"
import sunlight from "public/images/paintings/sunlight.jpg"
import winter from "public/images/paintings/winter.jpg"
import { useEffect, useState } from "react"
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
  {
    id: 10,
    name: "Dark Souls",
    image: darkSouls,
    description: "Dark Souls",
  },
]

const CarouselStatic = () => {
  // const ref = useRef(null)
  // const { scrollXProgress } = useScroll({ container: ref })

  const [sortedPaintings, setSortedPaintings] = useState(paintings)

  useEffect(() => {
    if (!paintings || isEmptyArray(paintings)) return
    setSortedPaintings(paintings.sort(() => 0.5 - Math.random()))
  }, [])

  return (
    <section className="relative">
      <AnimatePresence>
        <ul className="flex flex-no-wrap items-start gap-4 py-4 pr-10 overflow-x-scroll scrolling-touch">
          {sortedPaintings.map((painting, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ stiffness: 260, damping: 20, bounce: 0.8 }}
              className="flex-none w-2/3 rounded-lg md:w-1/3 "
            >
              <Image
                src={painting.image}
                placeholder="blur"
                quality={50}
                alt={painting.description}
                className="object-cover w-full h-80 xl:h-[720px] aspect-portrait rounded-xl snap-center drop-shadow-lg"
                sizes="(min-width: 1280px) 540px, 224px"
              />
            </motion.li>
          ))}
        </ul>
      </AnimatePresence>
    </section>
  )
}

export default CarouselStatic

{
  /* <Image
src={painting.image}
placeholder="blur"
quality={50}
alt={painting.description}
className="object-cover w-full h-80 xl:h-[720px] aspect-portrait rounded-xl snap-center drop-shadow-xl"
sizes="(min-width: 1280px) 540px, 224px"
/>  */
}
