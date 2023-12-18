import dynamic from "next/dynamic"
import { TypedObject } from "sanity"

import LinkButton from "@/components/atoms/LinkButton/LinkButton"
import CustomPortableText from "@/components/molecules/CustomPortableText"
import { iSanityPainting } from "@/lib/models/objects/sanityPainting"

const CarouselStatic = dynamic(
    () => import("@/components/molecules/CarouselStatic"),
)

type PaintingSection = {
    paintings: iSanityPainting[]
    description?: TypedObject[]
    paintingsCount?: number
}

const PaintingSection = ({
    paintings = [],
    description,
    paintingsCount,
}: PaintingSection) => {
    return (
        <section className="relative w-full text-white py-14 xl:py-24">
            <div className="relative px-4 text-dark">
                <h2 className="pb-2">Paintings</h2>
                <div className="flex flex-wrap max-w-3xl">
                    <CustomPortableText value={description} />
                </div>
            </div>
            <CarouselStatic paintings={paintings} />
            <div className="flex flex-col items-center justify-center w-full gap-4 px-4 text-dark">
                <strong>Like what you see?</strong> I have {paintingsCount}{" "}
                paintings in total.
                <LinkButton href="/paintings" hasIcon>
                    More paintings
                </LinkButton>
            </div>
        </section>
    )
}

export default PaintingSection
