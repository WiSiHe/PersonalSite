"use client"

import { type QueryResponseInitial } from "@sanity/react-loader/rsc"

import { homePageQuery } from "@/sanity/lib/queries"
import { useQuery } from "@/sanity/loader/useQuery"
import { HomePagePayload } from "@/types"

import AboutPage from "./AboutPage"

type Props = {
    initial?: QueryResponseInitial<HomePagePayload | null>
}

export default function AboutPagePreview(props: Props) {
    const { initial } = props
    const { data } = useQuery<HomePagePayload | null>(
        homePageQuery,
        {},
        { initial },
    )

    if (!data) {
        return (
            <div>
                Please start editing your Home document to see the preview!
            </div>
        )
    }

    const { showcasePaintings, showcaseProjects } = data

    return (
        <AboutPage paintings={showcasePaintings} projects={showcaseProjects} />
    )
}
