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
  // const [time, setTime] = useState(0)
  // const [mousedOver, setMousedOver] = useState(false)

  const currentWallpaper = paintings[desktopIndex]

  // convert time into a percentage with roof of 100%
  // const percentage = Math.min(time / 100, 1) * 100

  // const timerStyle = `${percentage}%`

  const handleGoLeft = () => {
    // setTime(0)
    if (desktopIndex === 0) {
      return setDesktopIndex(paintings.length - 1)
    }

    return setDesktopIndex(desktopIndex - 1)
  }

  const handleGoRight = () => {
    // setTime(0)
    if (desktopIndex === paintings.length - 1) {
      return setDesktopIndex(0)
    }

    return setDesktopIndex(desktopIndex + 1)
  }

  //  useEffect that counts down from 5 to 0
  // useEffect(() => {
  //   // if timer is zero wait one second.

  //   if (time === 0) {
  //     setTimeout(() => {
  //       return setTime((prevTime) => prevTime + 1)
  //     }, 8000)
  //   }

  //   if (!mousedOver) {
  //     const timer = setInterval(() => {
  //       setTime((prevTime) => prevTime + 1)
  //     }, 100)

  //     return () => clearInterval(timer)
  //   }
  // }, [mousedOver, time])

  // useEffect(() => {
  //   if (time === 100) {
  //     handleGoRight()
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [time])

  return (
    <section
      className={clsx(
        "transition-all w-full duration-500 ease-in-out hidden items-center relative xl:grid grid-cols-12",
        "w-full h-full min-h-screen"
      )}
    >
      <m.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", delay: 1.4 }}
        // whileInView={{ opacity: 1, x: 0 }}
        // viewport={{ once: true, amount: 0.1 }}
        className="absolute z-10 flex col-span-4 col-start-2 my-auto ring-white ring-offset-4 ring-4 h-fit bg-tertiary/40 backdrop-blur-2xl"
      >
        <div className="flex flex-col justify-center gap-4 p-10">
          <div className="flex flex-col gap-4">
            <h1 className="text-dark text-8xl">
              <strong>Henrik Wilhelm Sissener</strong>
            </h1>
            <ul className="list-disc list-inside text-dark">
              <li>Digital artist and web developer</li>
              <li>Enjoys character design and landscape painting</li>
              <li>
                Passionate about programming, game development, and frontend
                technologies.
              </li>
            </ul>
            <div className="flex justify-end">
              <LinkButton href="/paintings">
                <strong>Go to gallery</strong>
              </LinkButton>
            </div>
          </div>
        </div>
      </m.div>
      {/* <m.div
        style={{ width: timerStyle }}
        className="absolute inset-0 z-10 h-2 transition-all ease-linear col-span-full bg-primary"
      /> */}
      <div className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-center col-start-5 gap-4 p-4">
        <m.button
          whileHover={{ scale: 1.2 }}
          onClick={() => handleGoLeft()}
          className="flex-shrink-0 p-1 bg-white w-fit hover:ring focus:outline-none focus:ring ring-highlight focus:border-transparent"
          aria-label="Go to previous painting"
          // onMouseOver={() => setMousedOver(true)}
          // onMouseOut={() => setMousedOver(false)}
        >
          <BsChevronLeft aria-label="Left" className="p-2 text-3xl " />
        </m.button>
        <span className="p-4 text-xs bg-white">
          {desktopIndex + 1} / {paintings.length}
        </span>
        <m.button
          whileHover={{ scale: 1.2 }}
          onClick={handleGoRight}
          className="flex-shrink-0 p-1 bg-white w-fit hover:ring focus:outline-none focus:ring ring-highlight focus:border-transparent"
          aria-label="Go to next painting"
          // onMouseOver={() => setMousedOver(true)}
          // onMouseOut={() => setMousedOver(false)}
        >
          <BsChevronRight aria-label="Right" className="p-2 text-3xl" />
        </m.button>
      </div>

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
          alt=""
        />
        {/* <div
          className={
            "absolute inset-0 w-full flex items-center justify-center h-full bg-gradient-to-r from-dark via-primary to-highlight animate-gradient-xy mix-blend-hue "
          }
        /> */}
      </div>
    </section>
  )
}

export default HeroSectionDesktop
