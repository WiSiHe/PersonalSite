import Main from "components/atoms/Main/Main"
import VideosPage from "components/pages/VideosPage"
import { getAllVideosAndTags } from "lib/api"
import { notFound } from "next/navigation"

export const metadata = {
    title: "Videos | WiSiHe",
    description: "A gallery of some of my videos",
}

export const revalidate = 60 * 60 * 3 // 3 hours

async function getAllProjects() {
    const { videos = [], tags = [] } = await getAllVideosAndTags()

    const filteredTags = tags.filter((tag) => {
        const { name = "", videoCount = 0 } = tag

        return name !== "All" && videoCount > 0
    })

    const sortedTags = filteredTags.sort((a, b) => {
        const { videoCount: aVideoCount = 0 } = a
        const { videoCount: bVideoCount = 0 } = b

        return bVideoCount - aVideoCount
    })

    return {
        videos: videos,
        tags: sortedTags,
    }
}

export default async function ProjectsHomePage() {
    const allProjects = await getAllProjects()

    if (!allProjects) {
        return notFound()
    }

    const { videos, tags } = allProjects

    return (
        <Main className="flex-col min-h-screen p-4">
            <VideosPage videos={videos} tags={tags} />
        </Main>
    )
}
