"use client"
import Chip from "components/atoms/Chip/Chip"
import LinkButton from "components/atoms/LinkButton/LinkButton"
import GreeterCard from "components/molecules/GreeterCard"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import celestial from "public/images/paintings/Celestial.jpg"
import cloud from "public/images/paintings/cloud.jpg"
import fire from "public/images/paintings/fire.jpg"
import forestMorning from "public/images/paintings/forestMorning.jpg"
import woods from "public/images/paintings/hell.jpg"
import icecave from "public/images/paintings/icecave.png"
import winter from "public/images/paintings/winter.jpg"
import { useState } from "react"
import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa"
import { cn } from "utils/utility"

const backgrounds = [
  {
    id: 1,
    name: "Celestial",
    image: celestial,
    description: "Celesital",
  },
  {
    id: 2,
    name: "Winter",
    image: winter,
    description: "Winter",
  },
  {
    id: 3,
    name: "Woods",
    image: woods,
    description: "Woods",
  },
  {
    id: 4,
    name: "Forest Morning",
    image: forestMorning,
    description: "Forest Morning",
  },
  {
    id: 5,
    name: "Ice Cave",
    image: icecave,
    description: "Ice Cave",
  },
  {
    id: 6,
    name: "Cloud",
    image: cloud,
    description: "Cloud",
  },
  {
    id: 7,
    name: "Fire",
    image: fire,
    description: "Fire",
  },
]

const HeroImageSection = () => {
  const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0)

  const handleNextBackground = () => {
    const nextIndex = currentBackgroundIndex + 1
    if (nextIndex > backgrounds.length - 1) {
      setCurrentBackgroundIndex(0)
    } else {
      setCurrentBackgroundIndex(nextIndex)
    }
  }

  const handlePreviousBackground = () => {
    const previousIndex = currentBackgroundIndex - 1
    if (previousIndex < 0) {
      setCurrentBackgroundIndex(backgrounds.length - 1)
    } else {
      setCurrentBackgroundIndex(previousIndex)
    }
  }

  const currentBackground =
    backgrounds.at(currentBackgroundIndex) || backgrounds[0]

  return (
    <section
      key="hero"
      className="relative w-full flex gap-8 flex-col xl:grid items-center xl:grid-cols-12 xl:pt-32 min-h-[600px] px-4 py-10 xl:gap-10 xl:items-center h-fit xl:min-h-[100dvh] overflow-clip"
    >
      <Image
        src={currentBackground.image}
        fill
        alt=""
        placeholder="blur"
        quality={1}
        priority
        sizes="5vw"
        className="object-fill scale-150 xl:object-cover blur-3xl"
      />

      <section className="z-10 w-full pt-24 col-span-full xl:col-span-4 xl:pt-0">
        <GreeterCard />
      </section>
      <section className="relative z-10 w-full col-span-full xl:col-span-8">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentBackgroundIndex}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            className="relative w-full h-full aspect-video rounded-xl drop-shadow-xl"
            transition={{ duration: 1, damping: 20, stiffness: 260 }}
          >
            <div className="absolute left-0 right-0 z-10 flex items-center justify-center rounded-full -top-2 drop-shadow-xl">
              <Chip hasStatus="selected">
                <FaStar /> Featured
              </Chip>
            </div>
            <Image
              key={currentBackground.id}
              src={currentBackground.image}
              alt={currentBackground.description}
              placeholder="blur"
              quality={65}
              sizes="(min-width: 1280px) 64.01vw, calc(98.85vw - 18px)"
              fill
              priority
              className={cn("object-cover w-10 rounded-2xl")}
            />
          </motion.div>
        </AnimatePresence>

        {/* <Image
          src={currentBackground ? currentBackground.image : ""}
          alt={currentBackground ? currentBackground.description : ""}
          placeholder="blur"
          quality={65}
          // sizes="(min-width: 1024px) 60vw, (min-width: 768px) 90vw, 100vw"
          sizes="(min-width: 1280px) 64.01vw, calc(98.85vw - 18px)"
          priority
          className={cn(
            "z-10 object-cover aspect-video rounded-xl drop-shadow-xl",
            isSwapping && "opacity-0"
          )}
        /> */}
        <section className="z-10 flex items-center justify-between w-full gap-4 pt-6 pb-10 capitalize xl:col-start-5 col-span-full xl:justify-center xl:gap-6">
          <button
            className="p-3 text-white rounded-lg bg-primary"
            onClick={handlePreviousBackground}
          >
            <FaChevronLeft />
          </button>
          <LinkButton href="/paintings">
            <span className="hidden">Check out the</span> painting gallery
          </LinkButton>
          <button
            className="p-3 text-white rounded-lg bg-primary"
            onClick={handleNextBackground}
          >
            <FaChevronRight />
          </button>
        </section>
      </section>
    </section>
  )
}

export default HeroImageSection
