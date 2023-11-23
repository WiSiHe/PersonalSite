"use client"
import { QueryResponseInitial } from "@sanity/react-loader/rsc"
import { paintingDetailsQuery } from "lib/api"
import { iSanityPainting } from "lib/models/objects/sanityPainting"

import { useQuery } from "@/sanity/loader/useQuery"

import PaintingPage from "../PaintingPage/PaintingPage"

interface iPaintingPageProps {
    params: { slug: string }
    initial: QueryResponseInitial<iSanityPainting | null>
}

const PaintingPagePreview = ({ initial, params }: iPaintingPageProps) => {
    const { data } = useQuery<iSanityPainting | null>(
        paintingDetailsQuery,
        params,
        { initial },
    )

    return <PaintingPage painting={data!} />
}

export default PaintingPagePreview
