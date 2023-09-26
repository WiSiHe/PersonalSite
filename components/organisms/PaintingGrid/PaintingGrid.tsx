"use client"
import Painting from "components/molecules/Painting/Painting"
import { AnimatePresence, motion } from "framer-motion"
import useWindowDimensions from "hooks/useWindowDimension"
import { iSanityPainting } from "lib/models/objects/sanityPainting"
import { useCombinedStore } from "lib/store"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { isEmptyArray } from "utils/array"
import { sortPaintings } from "utils/painting"
import { slugify } from "utils/string"
import { cn } from "utils/utility"

interface iPaintingGridProps {
    paintings: iSanityPainting[]
    isStorybook?: boolean
}

const debounce = <F extends (...args: any[]) => void>(
    func: F,
    wait: number,
): ((...args: Parameters<F>) => void) => {
    let timeout: ReturnType<typeof setTimeout> | null = null
    return (...args: Parameters<F>) => {
        const later = () => {
            if (timeout !== null) {
                clearTimeout(timeout)
                timeout = null
            }
            func(...args)
        }
        if (timeout !== null) {
            clearTimeout(timeout)
        }
        timeout = setTimeout(later, wait)
    }
}

const PaintingGrid = ({
    paintings = [],
    isStorybook = false,
}: iPaintingGridProps) => {
    const router = useRouter()

    const { width = 0 } = useWindowDimensions()

    const searchParams = useSearchParams()

    const filterList = searchParams?.getAll("filter") as string[]

    const [hasLoadedAllPaintings, setHasLoadedAllPaintings] = useState(false)

    const sorting = useCombinedStore((state) => state.paintingSorting)

    // const [paintingsSlice, setPaintingsSlice] = useState(25)
    const paintingsSlice = useCombinedStore((state) => state.paintingSlice)
    const setPaintingsSlice = useCombinedStore(
        (state) => state.setPaintingSlice,
    )

    // const filterPaintingsV2 = useMemo(() => {
    //   if (isEmptyArray(filterList)) return sortPaintings(paintings, sorting)

    //   const filterSet = new Set(filterList.map((f) => slugify(f)))
    //   const filteredPaintings = paintings.filter((p) => {
    //     const paintingTags = p.tagsV2.map((t) => slugify(t.name))
    //     return paintingTags.some((tag) => filterSet.has(tag))
    //   })

    //   return sortPaintings(filteredPaintings, sorting)
    // }, [filterList, paintings, sorting])

    const filterPaintingsV3 = useMemo(() => {
        const sortedPaintings = sortPaintings([...paintings], sorting)

        const filteredPaintings = sortedPaintings.filter((p) => {
            const paintingTags = p.tagsV2.map((t) => slugify(t.name))
            return filterList.every((f) => paintingTags.includes(slugify(f)))
        })

        return filteredPaintings
    }, [filterList, paintings, sorting])

    // functions that load more paintings, and at the end of the list, load more paintings

    function handleClearFilter() {
        router.replace("/paintings")
    }

    const loadMorePaintings = () => {
        if (hasLoadedAllPaintings) return

        // append 25 more paintings to the list
        const newPaintingsSlice = paintingsSlice + 12
        setPaintingsSlice(newPaintingsSlice)

        if (newPaintingsSlice >= paintings.length) {
            setHasLoadedAllPaintings(true)
        }
    }

    const handleScroll = debounce(() => {
        // This code checks to see if all of the paintings have been loaded, or if the user has scrolled to within 100 pixels of the bottom of the page.
        // The purpose of this code is to determine whether or not to load more paintings from the database.

        if (
            hasLoadedAllPaintings ||
            window.innerHeight + document.documentElement.scrollTop <
                document.documentElement.offsetHeight - 1000
        ) {
            return
        }

        loadMorePaintings()
    }, 100)

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)

        // Check for empty paintings array
        if (!paintings.length) return

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [handleScroll, paintings])

    if (isEmptyArray(filterPaintingsV3)) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring" }}
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
            </motion.div>
        )
    }

    return (
        <>
            <AnimatePresence>
                <section className="grid w-full grid-cols-12 gap-4 mb-10 lg:gap-8 grid-flow-dense">
                    {filterPaintingsV3
                        .slice(0, paintingsSlice)
                        .map((painting, i) => {
                            const isMobile = width < 640
                            let amountOfLazyImages = 1
                            if (!isMobile) amountOfLazyImages = 8

                            return (
                                <motion.div
                                    initial={{ opacity: 0, y: 80 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{
                                        type: "spring",
                                        bounce: 0.25,
                                    }}
                                    viewport={{ once: true }}
                                    key={painting._id}
                                    className="relative rounded-lg drop-shadow-lg col-span-full lg:col-span-3 group focus-within:ring ring-primary hover:ring overflow-clip"
                                >
                                    <Link href={`/paintings/${painting.slug}`}>
                                        <Painting
                                            paintingData={painting}
                                            storybook={isStorybook}
                                            key={painting._id}
                                            shouldBeLazy={
                                                i < amountOfLazyImages
                                            }
                                        />
                                    </Link>
                                </motion.div>
                            )
                        })}
                </section>
            </AnimatePresence>
        </>
    )
}

export default PaintingGrid
