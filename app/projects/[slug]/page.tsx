import clsx from "clsx"
import ProjectPage from "components/pages/ProjectPage"
import { getAllProjectsLight, getProjectDetails } from "lib/api"
import { notFound } from "next/navigation"

export const revalidate = 3600 // every hour

export async function generateStaticParams() {
    const allProjects = await getAllProjectsLight()

    const paths = allProjects?.map((project) => ({
        slug: project.slug,
    }))

    return [paths]
}

// SEO
export async function generateMetadata({ params }: { params: Params }) {
    const painting = await getData(params.slug)

    if (!painting) return null

    const { title = "Not found" } = painting

    const combinedTitle = clsx(title, " | WiSiHe")

    return {
        title: combinedTitle,
        description: painting.description,
        openGraph: {
            title: "Acme",
            description: "Acme is a...",
        },
    }
}

async function getData(slug: string) {
    const project = await getProjectDetails(slug)
    return project
}

interface Params {
    slug: string
}

export default async function LandingPage({ params }: { params: Params }) {
    const project = await getData(params.slug)

    if (!project) {
        return notFound()
    }

    return <ProjectPage project={project} />
}
