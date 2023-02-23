import clsx from "clsx"
import { LinkButton, Loader } from "components/atoms"
import { m } from "framer-motion"
import useWindowDimensions from "hooks/useWindowDimension"
import { iSanityPainting } from "lib/models/objects/sanityPainting"
import { imageBuilder } from "lib/sanity"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { BsChevronLeft, BsChevronRight } from "react-icons/bs"
// import { getRandomArbitrary } from "utils/numbers"

interface HeroSectionProps {
  paintings: iSanityPainting[]
  introText?: string
}

const HeroSection = ({ paintings = [] }: HeroSectionProps) => {
  const [desktopIndex, setDesktopIndex] = useState(0)
  // const { width = 0 } = useWindowDimensions()

  const currentWallpaper = paintings[desktopIndex]

  const { width = 766 } = useWindowDimensions()

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

  // useEffect(() => {
  //   // if (!paintings.length) return
  //   setDesktopIndex(parseInt(getRandomArbitrary(0, paintings.length)))
  // }, [paintings])

  // const imageHeightStyle = {
  //   square: "aspect-square",
  //   landscape: "aspect-video",
  //   portrait: "aspect-[9/16]",
  // }

  const isMobile = width < 765

  return (
    <section
      className={clsx(
        "transition-all w-full duration-500 ease-in-out",
        // imageHeightStyle[currentWallpaper.format]
        "w-full h-[100svh]"
      )}
    >
      <div className="relative h-full bg-dark">
        <Image
          src={imageBuilder(currentWallpaper.image)
            .width(!isMobile ? 1920 : 375)
            .height(!isMobile ? 1080 : 768)
            .quality(75)
            .url()}
          blurDataURL={imageBuilder(currentWallpaper.image)
            .width(!isMobile ? 192 : 108)
            .height(!isMobile ? 108 : 192)
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

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center h-full gap-4">
          <div className="flex items-center justify-between w-full gap-6 p-4 xl:justify-center">
            <m.button
              whileHover={{ scale: 1.2 }}
              onClick={() => handleGoLeft()}
              className="flex-shrink-0 fl w-fit hover:ring focus:outline-none focus:ring ring-highlight focus:border-transparent"
              aria-label="Go to previous painting"
            >
              <BsChevronLeft
                aria-label="Left"
                className="p-2 text-3xl text-center text-black transition bg-white hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent"
              />
            </m.button>
            <m.div
              className="relative"
              whileHover={{ scale: 1.1 }}
              transition={{
                type: "spring",
                bounce: 0.5,
              }}
            >
              {/* <div className="absolute -inset-0.5 w-full animate-tilt transition-all duration-500 h-full blur from-pink-600 to-purple-400 hover:to-purple-200 bg-gradient-to-r" /> */}
              <LinkButton href="/paintings">
                <strong>Go to gallery</strong>
              </LinkButton>
            </m.div>
            <m.button
              whileHover={{ scale: 1.2 }}
              onClick={handleGoRight}
              className="z-10 focus:outline-none hover:ring focus:ring ring-highlight focus:border-transparent"
              aria-label="Go to next painting"
            >
              <BsChevronRight
                aria-label="Right"
                className="p-2 text-3xl text-center text-black transition bg-white hover:shadow-lg"
              />
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

export default HeroSection
