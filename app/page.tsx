import Main from "components/atoms/Main/Main"
import AboutPage from "components/pages/AboutPage"
import { getAllTagsAndPaintingsLight } from "lib/api"
import { draftMode } from "next/headers"

import AboutPagePreview from "@/components/pages/AboutPage/AboutPagePreview"
import { loadHomePage } from "@/sanity/loader/loadQuery"

export const metadata = {
    title: "Home | WiSiHe",
    description: "A gallery of some of my paintings",
    locale: "en-US",
    type: "website",
}

export default async function Home() {
    // const initial = await getAllPaintings()
    const initial = await loadHomePage()

    if (draftMode().isEnabled) {
        return (
            <Main
                noTopPadding
                className="relative flex flex-col items-start w-full min-h-screen overflow-clip"
            >
                <AboutPagePreview initial={initial} />
            </Main>
        )
    }
    const { data } = initial

    if (!data) {
        return (
            <div>
                Please start editing your Home document to see the preview!
            </div>
        )
    }

    const {
        showcasePaintings,
        showcaseProjects,
        projectsDescription,
        paintingsDescription,
        paintingsCount,
    } = data

    return (
        <Main
            noTopPadding
            className="relative flex flex-col items-start w-full min-h-screen overflow-clip"
        >
            <AboutPage
                paintings={showcasePaintings}
                projects={showcaseProjects}
                projectsDescription={projectsDescription}
                paintingsDescription={paintingsDescription}
            />
        </Main>
    )
}
