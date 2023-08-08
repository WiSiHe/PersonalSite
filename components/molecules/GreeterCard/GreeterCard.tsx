"use client"
import { motion } from "framer-motion"
import { BiGame } from "react-icons/bi"
import { BsFillBrushFill } from "react-icons/bs"
import { HiOutlineDesktopComputer } from "react-icons/hi"

const gameIconVariant = {
  hover: {
    scale: 1.2,
    rotate: 360,
    transition: {
      type: "spring",
    },
  },
}

const brushVariant = {
  hover2: {
    scale: 1.2,
    rotate: 360,
    transition: {
      type: "spring",
    },
  },
}

const desktopVariant = {
  initial: {
    scale: 0.8,
  },
  animate: {
    scale: 1,
    rotate: 0,
  },
  hover1: {
    scale: 1.2,
    rotate: 360,
    transition: {
      type: "spring",
    },
  },
}

const GreeterCard = () => {
  return (
    <>
      <section className="relative flex flex-col justify-center h-full gap-4 p-10 rounded-xl backdrop-blur-lg bg-white/30 overflow-clip drop-shadow-xl">
        <div className="z-10 flex flex-col items-start h-full text-dark lg:justify-center lg:p-4">
          <h1 className="text-2xl xl:text-5xl">
            <strong>Henrik Wilhelm Sissener</strong>
          </h1>
          <ul className="flex flex-col gap-2 mt-4 text-base xl:text-2xl">
            <motion.li
              className="flex items-center gap-2 p-1"
              whileHover="hover1"
              initial="initial"
              animate="animate"
            >
              <motion.div variants={desktopVariant}>
                <HiOutlineDesktopComputer />
              </motion.div>
              <span>Senior Front-end developer</span>
            </motion.li>
            <motion.li
              className="flex items-center gap-2 p-1"
              whileHover="hover2"
            >
              <motion.div variants={brushVariant}>
                <BsFillBrushFill />
              </motion.div>
              <span>Digital artist</span>
            </motion.li>
            <motion.li
              whileHover="hover"
              className="flex items-center gap-2 p-1"
            >
              <motion.div variants={gameIconVariant}>
                <BiGame />
              </motion.div>
              <span>Game developer</span>
            </motion.li>
          </ul>
        </div>
      </section>
    </>
  )
}

export default GreeterCard
