"use client"
import Chip from "components/atoms/Chip/Chip"
import LinkButton from "components/atoms/LinkButton/LinkButton"
import CarouselStatic from "components/molecules/CarouselStatic"
import GreeterCard from "components/molecules/GreeterCard"
import { AnimatePresence, motion } from "framer-motion"
import { iSanityImage } from "lib/models/objects/sanityImage"
import Image from "next/image"
import Link from "next/link"
import celestial from "public/images/paintings/Celestial.jpg"
import cloud from "public/images/paintings/cloud.jpg"
import fire from "public/images/paintings/fire.jpg"
import forestMorning from "public/images/paintings/forestMorning.jpg"
import woods from "public/images/paintings/hell.jpg"
import icecave from "public/images/paintings/icecave.png"
import winter from "public/images/paintings/winter.jpg"
import { useState } from "react"
import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa"

interface AboutPageProps {
  paintings?: iSanityImage[]
}

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

const AboutPage = ({ paintings = [] }: AboutPageProps) => {
  const [currentBackground, setCurrentBackground] = useState(backgrounds.at(0))

  const handleNextBackground = () => {
    const currentIndex = backgrounds.findIndex(
      (background) => background === currentBackground
    )
    const nextIndex = currentIndex + 1
    const nextBackground = backgrounds.at(nextIndex % backgrounds.length)
    setCurrentBackground(nextBackground)
  }
  return (
    <>
      <section
        key="hero"
        className="relative flex gap-8 flex-col xl:grid items-center xl:grid-cols-12 px-8 xl:px-4 py-10 xl:gap-10 xl:items-center xl:h-[100dvh] overflow-clip"
      >
        <Image
          src={currentBackground ? currentBackground.image : ""}
          fill
          alt=""
          placeholder="blur"
          quality={1}
          className="object-cover scale-105 xl:scale-150 blur-3xl"
        />

        <section className="z-10 w-full pt-24 col-span-full xl:col-span-4 xl:pt-0">
          <GreeterCard />
        </section>
        <section className="relative z-10 col-span-full xl:col-span-8">
          <div className="absolute left-0 right-0 z-10 flex items-center justify-center rounded-full -top-2 drop-shadow-xl">
            <Chip hasStatus="selected">
              <FaStar /> Featured
            </Chip>
          </div>
          <Image
            src={currentBackground ? currentBackground.image : ""}
            placeholder="blur"
            alt={currentBackground ? currentBackground.description : ""}
            className="z-10 object-cover aspect-video rounded-xl drop-shadow-xl"
          />
          <section className="z-10 flex items-center justify-between gap-4 pt-6 pb-10 capitalize xl:col-start-5 col-span-full xl:justify-center xl:gap-6">
            <button
              className="p-3 text-white rounded-lg bg-primary"
              onClick={handleNextBackground}
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

      <section className="relative text-white pt-14 xl:pt-24">
        <div className="relative block w-full gap-4 px-4 text-dark xl:px-10">
          <AnimatePresence>
            <motion.h2
              key="title"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring" }}
              viewport={{ once: true }}
              className="pb-2"
            >
              Paintings
            </motion.h2>
            <motion.div
              key="description"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring" }}
              viewport={{ once: true }}
              className="max-w-2xl"
            >
              As a Digital Artist, my passion leans towards creating stylized
              portraits, ethereal landscapes, and artwork that transports you
              into the cosmos. I also occasionally taking up commissioned work.{" "}
              <Link href="/paintings" className="underline">
                Check out my gallery
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring" }}
          viewport={{ once: true }}
          key="carousel"
          className="w-full pt-8 xl:pl-6"
        >
          <CarouselStatic />
        </motion.div>
      </AnimatePresence>

      <div className="flex flex-col items-center justify-center w-full gap-4 py-10">
        <strong>Like what you see?</strong>
        <LinkButton href="/paintings">More paintings</LinkButton>
      </div>

      {/* <section className="p-4 py-24 lg:min-h-screen bg-dark/20">
        <div className="max-w-screen-lg mx-auto">
          <h2>Game dev</h2>
          <p>
            But it doesn&#39;t stop there. I am an ardent hobbyist in Game
            Development, where I blend my artistic vision with technical
            expertise. Crafting stylized 3D games using Unreal Engine and Unity,
            I strive to provide immersive experiences that evoke emotion and
            provoke thought.
          </p>
        </div>
      </section> */}

      {/* <section className="p-4 py-24 mx-auto lg:min-h-screen">
        <h2>Frontend</h2>
        <p>
          When I&#39;m not navigating the vastness of space or immersing myself
          in digital landscapes, I work as a Frontend Developer. With a keen eye
          for design and user experience, I build and optimize websites for
          various clients, taking pride in delivering sites that not only look
          good but also function seamlessly.
        </p>
      </section> */}

      {/* <section className="relative p-4 bg-dark overflow-clip">
        <div className="grid h-full max-w-screen-xl grid-cols-12 gap-4 mx-auto my-auto items xl:aspect-video">
          <div className="xl:inset-0 xl:-translate-x-72 col-span-full xl:absolute aspect-square xl:aspect-auto ">
          </div>
          <div className="z-10 p-4 my-auto text-white col-span-full xl:col-start-8 xl:col-span-6">
            <motion.h2
              initial={{
                opacity: 0,
                scale: 0,
              }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <strong>
                Fancy <span className="text-primary">animations!</span>
              </strong>
            </motion.h2>
            <motion.div
              initial={{
                opacity: 0,
                y: 50,
              }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <p className="drop-shadow">
                I enjoy playing around with 3D modeling and animation. The
                object{" "}
                <strong className="hidden text-xl text-primary xl:inline">
                  on the left
                </strong>
                <strong className="inline xl:hidden text-primary">above</strong>{" "}
                is a quick creation I put together using Spline. In the past,
                I&#39;ve designed a variety of game assets including trees,
                rocks, and structures.
                <br />
                <br /> More information coming soon!
              </p>
            </motion.div>
          </div>
        </div>
      </section> */}
      {/* <section className="max-w-screen-lg p-4 mx-auto bg-blue-200 lg:min-h-screen">
        <p>
          Whether it&#39;s through my digital art, game designs, or web
          development, I am constantly driven by the endless possibilities for
          creation and innovation. I enjoy the process of taking an idea,
          however big or small, and transforming it into something tangible that
          can be shared and enjoyed by others.
        </p>
      </section>
      <section className="max-w-screen-lg p-4 mx-auto bg-red-300 lg:min-h-screen">
        <p>
          Feel free to navigate through my portfolio to catch a glimpse of my
          work. Whether you&#39;re interested in a commissioned piece, need a
          website developed, or simply want to discuss art, technology, or
          gaming, don&#39;t hesitate to get in touch. I&#39;m excited to share
          my passion and creativity with you!
        </p>
      </section> */}
    </>
  )
}

export default AboutPage
