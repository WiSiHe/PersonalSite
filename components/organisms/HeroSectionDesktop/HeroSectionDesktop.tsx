import clsx from "clsx"
import { HeroSectionLoader } from "components/molecules"
import { motion } from "framer-motion"
import { iSanityPainting } from "lib/models/objects/sanityPainting"
import { imageBuilder } from "lib/sanity"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { BsChevronLeft, BsChevronRight } from "react-icons/bs"

interface HeroSectionProps {
  paintings: iSanityPainting[]
  introText?: string
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 1,
      staggerChildren: 0.5,
    },
  },
}

const item = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0 },
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

  // add evevnt listener to update window width using match media

  return (
    <section
      className={clsx(
        "transition-all w-full duration-500 ease-in-out hidden items-center relative xl:grid grid-cols-12",
        "w-full h-full min-h-screen"
      )}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, x: -100 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ type: "spring", bounce: 0.05 }}
        // whileInView={{ opacity: 1, x: 0 }}
        // viewport={{ once: true, amount: 0.1 }}
        className="absolute z-20 flex h-full col-span-3 col-start-1 my-auto bg-primary"
      >
        <div className="flex flex-col justify-center p-4">
          <div className="flex flex-col gap-10">
            <h1 className="text-white text-8xl">
              <strong>Henrik Wilhelm Sissener</strong>
            </h1>
            <motion.ul
              variants={container}
              initial="hidden"
              animate="show"
              className="text-lg text-white list-inside"
            >
              <motion.li variants={item}>
                <span>Web developer</span>
              </motion.li>
              <motion.li variants={item}>
                <span>Digital artist</span>
              </motion.li>
              <motion.li variants={item}>
                <span>Game developer</span>
              </motion.li>
            </motion.ul>

            <Link
              href="/paintings"
              className="flex items-center justify-center px-4 py-3 bg-highlight hover:bg-highlight/90"
            >
              <strong>Go to gallery</strong>
            </Link>
          </div>
        </div>
      </motion.div>
      {/* <m.div
        style={{ width: timerStyle }}
        className="absolute inset-0 z-10 h-2 transition-all ease-linear col-span-full bg-primary"
      /> */}
      <div className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-center col-start-4 gap-4 p-4">
        <motion.button
          whileHover={{ scale: 1.2 }}
          onClick={() => handleGoLeft()}
          className="flex-shrink-0 p-1 bg-white w-fit hover:ring focus:outline-none focus:ring ring-highlight focus:border-transparent"
          aria-label="Go to previous painting"
          // onMouseOver={() => setMousedOver(true)}
          // onMouseOut={() => setMousedOver(false)}
        >
          <BsChevronLeft aria-label="Left" className="p-2 text-3xl " />
        </motion.button>
        <span className="p-4 text-xs bg-white">
          {desktopIndex + 1} / {paintings.length}
        </span>
        <motion.button
          whileHover={{ scale: 1.2 }}
          onClick={handleGoRight}
          className="flex-shrink-0 p-1 bg-white w-fit hover:ring focus:outline-none focus:ring ring-highlight focus:border-transparent"
          aria-label="Go to next painting"
          // onMouseOver={() => setMousedOver(true)}
          // onMouseOut={() => setMousedOver(false)}
        >
          <BsChevronRight aria-label="Right" className="p-2 text-3xl" />
        </motion.button>
      </div>

      <div className="relative h-full col-span-full bg-dark aspect-video">
        {/* <HeroSectionLoader /> */}
        <div className="absolute inset-0 z-10 h-full pointer-events-none from bg-gradient-to-bl from-primary via-transparent" />
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
          className={clsx("object-cover w-full h-full bg-dark")}
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
