import clsx from "clsx"
import LinkButton from "components/atoms/LinkButton/LinkButton"
import HeroSectionLoader from "components/molecules/HeroSectionLoader/HeroSectionLoader"
import { m } from "framer-motion"
import { iSanityPainting } from "lib/models/objects/sanityPainting"
import { imageBuilder } from "lib/sanity"
import Image from "next/image"
import { useState } from "react"
import {
  /*BsChevronDown,*/ BsChevronLeft,
  BsChevronRight,
} from "react-icons/bs"
// import { getRandomArbitrary } from "utils/numbers"

interface HeroSectionProps {
  paintings: iSanityPainting[]
  introText?: string
}

const HeroSectionMobile = ({ paintings = [] }: HeroSectionProps) => {
  const [desktopIndex, setDesktopIndex] = useState(0)

  // const { width = 0 } = useWindowDimensions()

  const currentWallpaper = paintings[desktopIndex]

  const handleGoLeft = () => {
    if (desktopIndex === 0) {
      return setDesktopIndex(paintings.length - 1)
    }

    return setDesktopIndex(desktopIndex - 1)
  }

  const handleGoRight = () => {
    if (desktopIndex === paintings.length - 1) {
      return setDesktopIndex(0)
    }

    return setDesktopIndex(desktopIndex + 1)
  }

  return (
    <section
      className={clsx(
        "transition-all w-full duration-500 ease-in-out relative xl:hidden",
        "w-full h-[100svh]"
      )}
    >
      <HeroSectionLoader />
      <div className="relative h-full bg-dark">
        <Image
          src={imageBuilder(currentWallpaper.image)
            .width(375)
            .height(768)
            .quality(75)
            .url()}
          blurDataURL={imageBuilder(currentWallpaper.image)
            .width(108)
            .height(192)
            .quality(10)
            .url()}
          priority
          fill
          placeholder="blur"
          className={clsx(
            "object-cover b w-full h-full transition-all duration-[3000ms] delay-500 ease-in-out transform md:block bg-gray-50"
          )}
          alt="headerImage"
        />
        <div
          className={`absolute inset-0 w-full flex items-center justify-center h-full bg-gradient-to-r from-dark via-primary/90 to-highlight animate-gradient-xy mix-blend-overlay`}
        />

        <div className="absolute inset-0 z-10">
          <div className="flex items-end justify-between h-full gap-4 p-4">
            <m.button
              whileHover={{ scale: 1.2 }}
              onClick={() => handleGoLeft()}
              className="flex-shrink-0 bg-white w-fit hover:ring focus:outline-none focus:ring ring-highlight focus:border-transparent"
              aria-label="Go to previous painting"
            >
              <BsChevronLeft aria-label="Left" className="p-2 text-3xl" />
            </m.button>

            <LinkButton href="/paintings">
              <strong>Go to gallery</strong>
            </LinkButton>

            <m.button
              whileHover={{ scale: 1.2 }}
              onClick={handleGoRight}
              className="z-10 bg-white focus:outline-none hover:ring focus:ring ring-highlight focus:border-transparent"
              aria-label="Go to next painting"
            >
              <BsChevronRight aria-label="Right" className="p-2 text-3xl" />
            </m.button>
          </div>
        </div>
        {/* <div className="absolute left-0 right-0 z-10 flex items-center justify-center bottom-2">
          <m.a
            initial={{ y: 0, scale: 1.0 }}
            animate={{ y: -10, scale: 1.0 }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              type: "spring",
              bounce: 0.5,
            }}
            className="p-2 bg-white focus:outline-none hover:ring focus:ring ring-highlight focus:border-transparent"
            href="#main"
          >
            <BsChevronDown />
          </m.a>
        </div> */}
      </div>
    </section>
  )
}

export default HeroSectionMobile
