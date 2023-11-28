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

    return (
        <section className="relative flex flex-col items-center justify-center w-full px-4 py-10 text-white bg-dark xl:aspect-video">
            <div className="absolute inset-0">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentImageIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, type: "spring" }}
                        className="relative w-full h-full"
                    >
                        <Image
                            fill
                            alt=""
                            src={urlForImage(projects[currentImageIndex].image)
                                .width(400)
                                .height(400)
                                .quality(70)
                                .url()}
                            quality={50}
                            className="object-cover"
                            // alt={title}
                        />
                    </motion.div>
                </AnimatePresence>
                <div className="absolute inset-0 bg-dark/40" />
            </div>
            <div className="relative z-10 text-center">
                <h2>Projects</h2>
                <CustomPortableText value={description} />
            </div>
            <div className="relative z-10 flex gap-8 py-10 empty:hidden">
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
                                boxShadow: "0 0 20px #DE0D92",
                                zIndex: 1,
                            }}
                            key={i}
                            className="hidden rounded-lg first:block lg:block overflow-clip bg-tertiary text-dark lg:first:col-start-2"
                            onMouseOver={() => {
                                setCurrentImageIndex(i)
                            }}
                        >
                            <div className="relative aspect-video">
                                <Image
                                    fill
                                    alt=""
                                    className="object-cover"
                                    src={urlForImage(image).url()}
                                />
                            </div>
                            <div className="p-4">
                                <h3>
                                    <strong>{title}</strong>
                                </h3>
                                <p className="pt-2 text-sm line-clamp-3">
                                    {description}
                                </p>
                                <div className="flex justify-end pt-4">
                                    <Link
                                        href={`/projects/${slug}`}
                                        className="underline"
                                    >
                                        Check it out
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
