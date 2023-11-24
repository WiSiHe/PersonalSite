"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { useState } from "react"
import { set, TypedObject } from "sanity"

import CustomPortableText from "@/components/molecules/CustomPortableText"
import { useThemeStore } from "@/lib/store"
import { ShowcaseProject } from "@/types"

type ProjectsSection = {
    projects?: ShowcaseProject[]
    description?: TypedObject[]
}

const ProjectsSection = ({ projects = [], description }: ProjectsSection) => {
    const [displayImage, setDisplayImage] = useState(false)
    // const setChatLogs = useOpenAIStore((state) => state.addMessage)
    const theme = useThemeStore((state) => state.theme)
    const setTheme = useThemeStore((state) => state.setTheme)

    const toggleTHeme = () => {
        switch (theme) {
            case "":
                setTheme("dark")
                break
            case "dark":
                setTheme("neon")
                break
            default:
                setTheme("")
                break
        }
    }

    return (
        <section className="w-full px-4 py-10 text-white bg-dark">
            <div className="flex flex-col items-center justify-center gap-4 col-span-full">
                <h2>Projects</h2>
                <CustomPortableText value={description} />
                <button onClick={toggleTHeme}>switch</button>
            </div>
            <div className="grid grid-cols-12 gap-4 py-10 empty:hidden">
                {projects
                    // .filter((project) => project._type === "painting")
                    .map((project, i) => {
                        const {
                            image,
                            tags = [],
                            description = "",
                            title = "",
                            slug,
                            status,
                        } = project

                        // const { lqip } = image

                        return (
                            <motion.article
                                initial={{ y: 100, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: false, amount: "some" }}
                                key={i}
                                className="p-8 rounded col-span-full lg:col-span-3 bg-tertiary text-dark lg:first:col-start-2"
                                onMouseOver={() => {
                                    console.log("hover")
                                }}
                            >
                                <h3>
                                    <strong>{title}</strong>
                                </h3>
                                <p className="pt-4 text-sm">{description}</p>
                                <Link href={`/projects/${slug}`}>
                                    <span className="underline">Read more</span>
                                </Link>
                                {/* <Project
                            image={image}
                            tags={tags}
                            description={description}
                            title={title}
                            slug={slug}
                            status={status}
                        /> */}
                            </motion.article>
                        )
                    })}
            </div>
        </section>
    )
}

export default ProjectsSection
