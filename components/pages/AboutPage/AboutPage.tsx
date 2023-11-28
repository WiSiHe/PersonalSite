import dynamic from "next/dynamic"
import { TypedObject } from "sanity"

import HeroImageSection from "@/components/templates/HeroImageSection"
import { iSanityPainting } from "@/lib/models/objects/sanityPainting"
import { ShowcaseProject } from "@/types"

const PaintingSection = dynamic(
    () => import("components/templates/PantingSection"),
)

const ProjectsSection = dynamic(
    () => import("components/templates/ProjectsSection"),
)

interface AboutPageProps {
    paintings?: iSanityPainting[]
    projects?: ShowcaseProject[]
    paintingsDescription?: TypedObject[]
    projectsDescription?: TypedObject[]
    paintingsCount?: number
}

const AboutPage = ({
    paintings = [],
    projects = [],
    paintingsDescription,
    projectsDescription,
    paintingsCount,
}: AboutPageProps) => {
    return (
        <>
            <HeroImageSection paintings={paintings} />
            <PaintingSection
                paintings={paintings}
                description={paintingsDescription}
                paintingsCount={paintingsCount}
            />

            <ProjectsSection
                projects={projects}
                description={projectsDescription}
            />
        </>
    )
}

export default AboutPage
