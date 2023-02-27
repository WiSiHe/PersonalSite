import clsx from "clsx"
import { LinkButton } from "components/atoms"
import { HeroSectionLoader } from "components/molecules"
import { m } from "framer-motion"
import { iSanityPainting } from "lib/models/objects/sanityPainting"
import { imageBuilder } from "lib/sanity"
import Image from "next/image"
import { useState } from "react"
import { BsChevronLeft, BsChevronRight } from "react-icons/bs"

interface HeroSectionProps {
  paintings: iSanityPainting[]
  introText?: string
}

const HeroSectionDesktop = ({ paintings = [] }: HeroSectionProps) => {
  const [desktopIndex, setDesktopIndex] = useState(0)

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
        "transition-all w-full duration-500 gap-4 ease-in-out hidden items-center relative xl:grid grid-cols-12",
        "w-full h-[100svh] min-h-[70vh]"
      )}
    >
      <m.div
        // initial={{ opacity: 0, x: -100 }}
        // transition={{ type: "spring", duration: 0.5, delay: 0.5 }}
        // whileInView={{ opacity: 1, x: 0 }}
        // viewport={{ once: true, amount: 0.1 }}
        className="absolute z-10 flex h-full col-span-4 col-start-1 my-auto space-y-4 bg-white/60 backdrop-blur-xl"
      >
        <div className="p-10 space-y-4">
          <h1 className="text-8xl">
            <strong>Henrik Wilhelm Sissener</strong>
          </h1>

          <p>
            I&#39;m a digital artist and web developer who enjoys character
            design and landscape painting. In my free time, I create digital art
            and explore programming, game development, and frontend
            technologies.
          </p>

          <div className="flex items-center justify-between gap-4">
            <LinkButton href="/paintings">
              <strong>Go to gallery</strong>
            </LinkButton>
            <div className="flex items-center gap-4">
              <m.button
                whileHover={{ scale: 1.2 }}
                onClick={() => handleGoLeft()}
                className="flex-shrink-0 p-1 bg-white w-fit hover:ring focus:outline-none focus:ring ring-highlight focus:border-transparent"
                aria-label="Go to previous painting"
              >
                <BsChevronLeft aria-label="Left" className="p-2 text-3xl " />
              </m.button>
              <span className="text-xs">
                {desktopIndex + 1} / {paintings.length - 1}
              </span>
              <m.button
                whileHover={{ scale: 1.2 }}
                onClick={handleGoRight}
                className="flex-shrink-0 p-1 bg-white w-fit hover:ring focus:outline-none focus:ring ring-highlight focus:border-transparent"
                aria-label="Go to next painting"
              >
                <BsChevronRight aria-label="Right" className="p-2 text-3xl" />
              </m.button>
            </div>
          </div>
        </div>
      </m.div>

      <div className="relative h-full col-span-full bg-dark aspect-video">
        <HeroSectionLoader />
        <Image
          src={imageBuilder(currentWallpaper.image)
            .width(1920)
            .height(1080)
            .quality(75)
            .url()}
          blurDataURL={imageBuilder(currentWallpaper.image)
            .width(192)
            .height(108)
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
          className={
            "absolute inset-0 w-full flex items-center justify-center h-full bg-gradient-to-r from-dark via-primary/90 to-highlight animate-gradient-xy mix-blend-overlay"
          }
        />

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

export default HeroSectionDesktop
