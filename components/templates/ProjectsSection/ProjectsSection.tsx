/* eslint-disable @next/next/no-img-element */
"use client"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { TypedObject } from "sanity"

import LinkButton from "@/components/atoms/LinkButton/LinkButton"
import CustomPortableText from "@/components/molecules/CustomPortableText"
import { urlForImage } from "@/lib/sanity.image"
import { ShowcaseProject } from "@/types"

type ProjectsSection = {
    projects?: ShowcaseProject[]
    description?: TypedObject[]
}

const ProjectsSection = ({ projects = [], description }: ProjectsSection) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    const { image } = projects[currentImageIndex] || {}

    const { lqip } = image

    return (
        <section className="relative flex flex-col items-center justify-center w-full px-10 py-10 text-white bg-dark xl:aspect-video">
            <div className="absolute inset-0 overflow-clip">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentImageIndex}
                        initial={{ opacity: 0, scale: 1.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.5 }}
                        transition={{ duration: 1 }}
                        className="relative w-full h-full"
                    >
                        <img
                            src={lqip as string}
                            sizes="100vw"
                            className="absolute inset-0 object-cover w-full h-full scale-110 blur-xl"
                            alt=""
                        />
                    </motion.div>
                </AnimatePresence>
                {/* <div className="absolute inset-0 bg-dark/40" /> */}
            </div>
            <div className="relative z-10 text-center">
                <h2>Projects</h2>
                <CustomPortableText value={description} />
            </div>
            <div className="relative z-10 grid grid-cols-12 gap-8 py-10 empty:hidden">
                {projects.map((project, i) => {
                    const {
                        image,
                        description = "",
                        title = "",
                        slug,
                    } = project

                    // const { lqip } = image

                    return (
                        <motion.article
                            initial={{ y: 100, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: false, amount: "some" }}
                            transition={{
                                type: "spring",
                                // duration: 0.4,
                            }}
                            whileHover={{
                                scale: 1.02,
                                // boxShadow: "0px 0px 10px #DE0D92",
                                zIndex: 1,
                            }}
                            key={i}
                            className="flex-col hidden rounded-lg h-fit overflow-clip col-span-full lg:col-span-3 lg:first:col-start-2 lg:even:col-span-4 col first:block lg:flex bg-tertiary text-dark"
                            onMouseOver={() => {
                                setCurrentImageIndex(i)
                            }}
                        >
                            <div className="relative aspect-square">
                                <Image
                                    fill
                                    alt=""
                                    className="object-cover"
                                    sizes="(min-width: 1024px) 400px, (min-width: 768px) 300px, 200px"
                                    src={urlForImage(image)
                                        .height(500)
                                        .width(500)
                                        .quality(65)
                                        .fit("crop")
                                        .url()}
                                />
                            </div>
                            <div className="relative flex flex-col justify-between flex-1 h-full gap-4 p-4 ring">
                                <div>
                                    <h3>
                                        <strong>{title}</strong>
                                    </h3>
                                    <p className="pt-2 text-sm line-clamp-3">
                                        {description}
                                    </p>
                                </div>
                                <div className="relative flex justify-end">
                                    <Link
                                        href={`/projects/${slug}`}
                                        className="underline"
                                    >
                                        <strong>Check it out</strong>
                                    </Link>
                                </div>
                            </div>
                        </motion.article>
                    )
                })}
            </div>
            <LinkButton href="/projects" hasIcon>
                More projects
            </LinkButton>
        </section>
    )
}

export default ProjectsSection
