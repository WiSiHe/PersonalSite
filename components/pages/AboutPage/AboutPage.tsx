import { TypedObject } from "sanity"

import HeroImageSection from "@/components/templates/HeroImageSection"
import { iSanityPainting } from "@/lib/models/objects/sanityPainting"
import { ShowcaseProject } from "@/types"

// const PaintingSection = dynamic(
//     () => import("components/templates/PantingSection"),
// )

// const ProjectsSection = dynamic(
//     () => import("components/templates/ProjectsSection"),
// )

interface AboutPageProps {
    paintings?: iSanityPainting[]
    projects?: ShowcaseProject[]
    paintingsDescription?: TypedObject[]
    projectsDescription?: TypedObject[]
}

const AboutPage = ({
    paintings = [],
    projects = [],
    paintingsDescription,
    projectsDescription,
}: AboutPageProps) => {
    return (
        <>
            <HeroImageSection paintings={paintings} />
            {/* <PaintingSection
                paintings={paintings}
                description={paintingsDescription}
            />
            <ProjectsSection
                projects={projects}
                description={projectsDescription}
            /> */}
        </>
    )
}

export default AboutPage
