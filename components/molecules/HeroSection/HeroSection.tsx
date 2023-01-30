import clsx from "clsx"
import { m } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { BsChevronLeft, BsChevronRight } from "react-icons/bs"
import { getRandomArbitrary } from "utils/numbers"

const HeroSection = ({ paintings = [] }) => {
  const [desktopIndex, setDesktopIndex] = useState(0)
  // const { width = 0 } = useWindowDimensions()

  const currentWallpaper = paintings[desktopIndex]

  useEffect(() => {
    setDesktopIndex(parseInt(getRandomArbitrary(0, paintings.length)))
  }, [paintings])

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
    <section className="w-full mt-14 xl:mt-0 h-[70lvh] xl:h-[100lvh]">
      <div className="relative h-full bg-slate-800">
        <div className="relative w-full h-full">
          <Image
            src={currentWallpaper.imageUrl}
            blurDataURL={currentWallpaper.lowResImageUrl}
            // sizes="(max-width: 768px) 100vw,
            //     (max-width: 1200px) 50vw,
            //     33vw"
            priority
            fill
            placeholder="blur"
            className={clsx(
              "object-cover w-full h-full transition-all duration-[3000ms] delay-500 ease-in-out transform bg-center bg-cover md:block bg-gray-50"
            )}
            alt="headerImage"
          />
        </div>
        <div
          className={`absolute inset-0 w-full flex items-center justify-center h-full bg-gradient-to-r from-dark via-primary/90 to-highlight animate-gradient-xy mix-blend-overlay`}
        />
        <div className="absolute left-0 right-0 bottom-0 z-10 flex flex-col items-center justify-center h-fit gap-4">
          <div className="flex items-center xl:justify-center justify-between w-full gap-6 p-4">
            <m.button
              whileHover={{ scale: 1.2 }}
              onClick={() => handleGoLeft()}
              className="flex-shrink-0 fl w-fit hover:ring focus:outline-none focus:ring ring-highlight focus:border-transparent"
              aria-label="Go to previous painting"
            >
              <BsChevronLeft
                aria-label="Left"
                className="p-2 text-3xl text-center text-black transition bg-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </m.button>
            <div className="relative ">
              {/* <div className="absolute -inset-0.5 w-full animate-tilt transition-all duration-500 h-full  mix-blend-overlay blur from-pink-600 to-purple-400 hover:to-purple-200 bg-gradient-to-r" /> */}

              <Link
                href="/paintings"
                className="relative py-2 text-center text-white transition bg-primary px-7 hover:ring focus:outline-none focus:ring-highlight focus:ring-2 focus:border-transparent"
              >
                <b>Go to gallery</b>
              </Link>
            </div>
            <m.button
              whileHover={{ scale: 1.2 }}
              onClick={handleGoRight}
              className="z-10 focus:outline-none hover:ring focus:ring ring-highlight focus:border-transparent"
              aria-label="Go to next painting"
            >
              <BsChevronRight
                aria-label="Right"
                className="p-2 text-3xl text-center text-black transition bg-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
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
