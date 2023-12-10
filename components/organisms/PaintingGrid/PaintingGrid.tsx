"use client"
import Painting from "components/molecules/Painting/Painting"
import type { iSanityPainting } from "lib/models/objects/sanityPainting"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { isEmptyArray } from "utils/array"
import { cn } from "utils/utility"

import useWindowDimensions from "@/hooks/useWindowDimension"

interface iPaintingGridProps {
    paintings: iSanityPainting[]
    isStorybook?: boolean
}

const PaintingGrid = ({
    paintings = [],
    isStorybook = false,
}: iPaintingGridProps) => {
    const router = useRouter()

    const { width = 0 } = useWindowDimensions()

    function handleClearFilter() {
        router.replace("/paintings")
    }

    if (isEmptyArray(paintings)) {
        return (
            <div
                // initial={{ opacity: 0, scale: 0.8 }}
                // animate={{ opacity: 1, scale: 1 }}
                // transition={{ type: "spring" }}
                key="no-paintings-found"
                className={cn(
                    "flex w-full flex-col items-center justify-center gap-2 p-4 rounded-lg col-span-full ring  ring-primary",
                )}
            >
                <h2 className="text-2xl text-center">
                    No paintings found with the selected filters
                </h2>
                <p className="text-center">
                    Try removing some filters to see more paintings
                </p>
                <button
                    onClick={handleClearFilter}
                    className="px-4 py-3 text-white rounded-lg bg-primary hover:bg-primary/90"
                >
                    Clear Filters
                </button>
            </div>
        )
    }

    return (
        <section className="grid w-full grid-cols-12 gap-4 mb-10 grid-flow-dense @container">
            {paintings.map((painting, i) => {
                const isMobile = width < 640
                let amountOfLazyImages = 4
                if (!isMobile) amountOfLazyImages = 8

                return (
                    <div
                        // initial={{ opacity: 0 }}
                        // whileInView={{ opacity: 1 }}
                        // viewport={{ once: true }}
                        key={painting._id}
                        className={cn(
                            "col-span-full @lg:col-span-6 @xl:col-span-4 @2xl:col-span-3",
                            "relative bg-white rounded-lg col-span-full drop-shadow-lg group focus-within:ring ring-primary hover:ring overflow-clip",
                        )}
                    >
                        <Link href={`/paintings/${painting.slug}`}>
                            <Painting
                                paintingData={painting}
                                storybook={isStorybook}
                                key={painting._id}
                                shouldBeLazy={i < amountOfLazyImages}
                            />
                        </Link>
                    </div>
                )
            })}
        </section>
    )
}

export default PaintingGrid
