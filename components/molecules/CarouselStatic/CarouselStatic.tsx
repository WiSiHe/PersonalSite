"use client"
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
    <div className="relative w-full">
      <section
        className="relative flex gap-4 pl-4 overflow-y-scroll pr-14 snap-mandatory snap-x"
        // ref={ref}
      >
        {sortedPaintings.map((painting) => (
          <Image
            key={painting.id}
            src={painting.image}
            placeholder="blur"
            quality={50}
            alt={painting.description}
            className="object-cover w-full h-80 xl:h-[720px] aspect-portrait rounded-xl snap-center drop-shadow-xl"
            sizes="(max-width: 768px) 33vw,
                  (max-width: 1200px) 33vw,
                  33vw"
          />
        ))}
      </section>
      {/* <motion.div
        className="absolute left-0 h-2 origin-left rounded-full -top-4 right-10 bg-primary"
        style={{ scaleX: scrollXProgress }}
      /> */}
      {/* <div className="absolute top-0 bottom-0 right-0 w-28 bg-gradient-to-l from-tertiary via-tertiary" /> */}
    </div>
  )
}

export default CarouselStatic
