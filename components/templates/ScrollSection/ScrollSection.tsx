"use client"
import {
    motion,
    // useMotionValue,
    // useMotionValueEvent,
    useScroll,
    useSpring,
} from "framer-motion"
import Image from "next/image"
import bathtub from "public/images/paintings/bathtub.jpg"
import celestial from "public/images/paintings/Celestial.jpg"
import cloud from "public/images/paintings/cloud.jpg"
import creepy from "public/images/paintings/creepy.jpg"
import sloth from "public/images/paintings/cute.jpg"
import fire from "public/images/paintings/fire.jpg"
import iceCave from "public/images/paintings/icecave.png"
import sunlight from "public/images/paintings/sunlight.jpg"
import winter from "public/images/paintings/winter.jpg"
import woods from "public/images/woods.png"
import { useState } from "react"
import { Button as BT } from "react-aria-components"
import { Button } from "tine-ui"

import Input from "@/components/molecules/Input"
import { Marquee } from "@/components/molecules/Marquee"
import { cn } from "@/utils/utility"

import ImageExplotionSection from "../ImageExplotionSection/ImageExplotionSection"

const paintings = [
    {
        label: "Cute",
        src: sloth,
        alt: "cute",
        height: 24,
        aspectRatio: "aspect-square",
    },
    {
        label: "Bathtub",
        src: bathtub,
        alt: "bathtub",
        height: 32,
        aspectRatio: "aspect-portrait",
    },
    {
        label: "Winter",
        src: winter,
        alt: "winter",
        height: 24,
        aspectRatio: "aspect-video",
    },
    {
        label: "Creepy",
        src: creepy,
        alt: "creepy",
        height: 32,
        aspectRatio: "aspect-video",
    },
    {
        label: "Fire",
        src: fire,
        alt: "fire",
        height: 24,
        aspectRatio: "aspect-square",
    },
    {
        label: "Ice Cave",
        src: iceCave,
        alt: "ice cave",
        height: 24,
        aspectRatio: "aspect-video",
    },
    {
        label: "Sunlight",
        src: sunlight,
        alt: "sunlight",
        height: 24,
        aspectRatio: "aspect-square",
    },
    {
        label: "Celestial",
        src: celestial,
        alt: "celestial",
        height: 24,
        aspectRatio: "aspect-square",
    },
    {
        label: "Cloud",
        src: cloud,
        alt: "cloud",
        height: 24,
        aspectRatio: "aspect-video",
    },
    {
        label: "Explorer",
        src: woods,
        alt: "explorer",
        height: 24,
        aspectRatio: "aspect-portrait",
    },
]

const ScrollSection = () => {
    const { scrollYProgress } = useScroll()
    const [value, setValue] = useState("")

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    })

    return (
        <>
            <svg
                width="25"
                height="25"
                viewBox="0 0 242 242"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="fixed z-10 top-4 right-4 stroke-primary"
            >
                <motion.circle
                    cx="121"
                    cy="121"
                    r="111"
                    pathLength={1}
                    strokeWidth="20"
                    style={{ pathLength: scaleY }}
                />
            </svg>
            <section className="px-4 py-10 mt-4">
                <Marquee numberOfCopies={2} pauseOnHover>
                    {paintings.map((painting, index) => (
                        <div
                            className={cn(
                                "mb-4 bg-dark relative w-96 rounded-xl",
                                painting.aspectRatio,
                            )}
                            key={index}
                        >
                            <Image
                                src={painting.src}
                                alt="contact"
                                fill
                                placeholder="blur"
                                className="object-cover rounded-xl "
                            />
                        </div>
                    ))}
                </Marquee>
            </section>

            <section className="aspect-video">
                <h3>React Aria</h3>
                <BT className="p-4 bg-primary">Click me</BT>
                <section className="p-4">
                    <Input
                        label="Email"
                        description="add email here"
                        defaultValue="test"
                        onChange={setValue}
                    />
                </section>
                <p>Mirrored text: {value}</p>
            </section>
            <section>
                <p>Tine_UI</p>
                <Button>Clidwack me</Button>
            </section>
            <ImageExplotionSection />
            {/* <section className="relative xl:aspect-video bg-dark">
                <GridStyleWrapper>
                    <div className="sticky top-0 z-20 grid grid-cols-12 px-4 py-10 text-white xl:px-10">
                        <div className="relative mt-4 col-span-full xl:hidden aspect-video">
                            <Image
                                src={night}
                                fill
                                alt="Dark magical woods made in 3D"
                                className="object-cover w-full h-full"
                                sizes="(max-width: 768px) 100vw,
(max-width: 1200px) 50vw,
33vw"
                            />
                        </div>
                        <div className="col-start-1 gap-4 pt-4 col-span-full xl:sticky xl:col-span-4">
                            <motion.h2
                                initial={{
                                    opacity: 0,
                                    scale: 0,
                                }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                viewport={{ once: true }}
                                className="pb-2"
                            >
                                <strong>Paintings!</strong>
                            </motion.h2>
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: 50,
                                }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="space-y-4 xl:max-w-lg"
                            >
                                <p>
                                    A collection of my paintings, some old, some
                                    new. I&#39;m trying out new styles and
                                    techniques all the time, but I&#39;ll always
                                    have a soft spot for the portraits and
                                    landscapes.
                                </p>

                                <LinkButton href="/paintings">
                                    Paintings
                                </LinkButton>
                            </motion.div>
                        </div>
                    </div>

                    
                </GridStyleWrapper>
            </section>

            <section className="relative p-4 bg-dark overflow-clip">
                <GridStyleWrapper>
                    <div className="grid h-full max-w-screen-xl grid-cols-12 gap-4 mx-auto my-auto items xl:aspect-video">
                        <div className="xl:inset-0 xl:-translate-x-72 col-span-full xl:absolute aspect-square xl:aspect-auto ">
                            <iframe
                                src="https://my.spline.design/untitled-1d78fd428f4d7531d03185f67d730969/"
                                width="100%"
                                height="100%"
                            />
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
                                    Fancy{" "}
                                    <span className="text-primary">
                                        animations!
                                    </span>
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
                                    I enjoy playing around with 3D modeling and
                                    animation. The object{" "}
                                    <strong className="hidden text-xl text-primary xl:inline">
                                        on the left
                                    </strong>
                                    <strong className="inline xl:hidden text-primary">
                                        above
                                    </strong>{" "}
                                    is a quick creation I put together using
                                    Spline. In the past, I&#39;ve designed a
                                    variety of game assets including trees,
                                    rocks, and structures.
                                    <br />
                                    <br /> More information coming soon!
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </GridStyleWrapper>
            </section> */}
        </>
    )
}

export default ScrollSection
