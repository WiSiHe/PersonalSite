"use client"
import { paintingDetailsQuery } from "lib/api"
import { iSanityPainting } from "lib/models/objects/sanityPainting"
import { useLiveQuery } from "next-sanity/preview"
import { isEmptyObject } from "utils/object"

import PaintingPage from "../PaintingPage/PaintingPage"
import { useQuery } from "@/sanity/loader/useQuery"
import { QueryResponseInitial } from "@sanity/react-loader/rsc"

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
