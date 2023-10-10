import clsx from "clsx"
import Chip from "components/atoms/Chip/Chip"
import ProjectStatus from "components/atoms/ProjectStatus/ProjectStatus"
import { AnimatePresence, motion } from "framer-motion"
import useWindowDimensions from "hooks/useWindowDimension"
import { iSanityProject } from "lib/models/objects/sanityProject"
import { urlForImage } from "lib/sanity.image"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { FaArrowRight } from "react-icons/fa"

const cardVariants = {
    offscreen: {
        opacity: 0,
        y: 150,
        scale: 0.9,
    },
    onscreen: {
        opacity: 1,
        y: 0,
        scale: 1,
    },
    hover: {
        scale: 1.001,
        transition: {
            type: "spring",
            bounce: 0.4,
            duration: 1,
        },
    },
    transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.1,
    },
}

// extend the SanityImage type with a url property

const Project = ({
    image,
    tags = [],
    description = "",
    title = "",
    slug,
    status,
}: iSanityProject) => {
    const { width = 0 } = useWindowDimensions()

    if (!image) {
        return <p>No data</p>
    }

    const isMobile = width < 765

    return (
        <AnimatePresence>
            <motion.article
                initial="offscreen"
                whileInView="onscreen"
                whileHover="hover"
                viewport={{ once: true, amount: 0.01 }}
                variants={cardVariants}
                className={clsx(
                    "relative w-full h-full flex flex-col justify-start bg-white text-dark",
                )}
            >
                <div className="relative w-full col-span-full aspect-square">
                    <Image
                        src={urlForImage(image)
                            .width(isMobile ? 400 : 1280)
                            .height(isMobile ? 400 : 720)
                            .quality(65)
                            .url()}
                        alt={title}
                        className={clsx("object-cover w-full h-full")}
                        fill
                    />
                    <div className="absolute inset-0 flex items-start p-4 bg-dark/40">
                        <ul className="flex flex-wrap items-end gap-2 py-2 text-sm xl:text-base xl:max-w-xl">
                            <ProjectStatus status={status} />
                            {tags.map((tag, i) => {
                                const { name = "" } = tag
                                return (
                                    <li key={name + i}>
                                        <Chip>{name}</Chip>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>

                <div
                    className={clsx(
                        "p-4 col-span-full ring flex-1 gap-4  flex flex-col justify-between",
                    )}
                >
                    <div className="w-full">
                        <div className="flex items-center gap-2">
                            <h2 className="text-2xl xl:text-4xl">
                                <strong>{title}</strong>
                            </h2>
                        </div>
                        {description && (
                            <div className="drop-shadow-md xl:max-w-xl">
                                {description}
                            </div>
                        )}
                    </div>

                    <div className="flex items-center justify-end ">
                        <Link
                            href={`/projects/${slug.current}`}
                            className="focus-visible:outline-none group focus-visible:ring ring-highlight focus-visible:border-transparent"
                        >
                            <motion.div
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    type: "spring",
                                    bounce: 0.4,
                                    duration: 1,
                                }}
                                whileHover={{
                                    scale: 1.1,
                                    boxShadow: "0 0 10px #DE0D92",
                                }}
                                className="flex items-center gap-1 px-2 py-1 transition-all ease-linear rounded-lg whitespace-nowrap text-dark bg-highlight hover:bg-primary group-focus-visible:bg-primary group-focus-visible:text-white hover:text-white group"
                            >
                                <strong>See Details</strong>{" "}
                                <FaArrowRight className="transition-all duration-500 ease-in-out group-hover:ml-1" />
                            </motion.div>
                        </Link>
                    </div>
                </div>
            </motion.article>
        </AnimatePresence>
    )
}

export default Project
