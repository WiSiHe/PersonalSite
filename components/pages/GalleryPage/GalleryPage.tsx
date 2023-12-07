"use client"
import dynamic from "next/dynamic"

const FilterBar = dynamic(() => import("components/organisms/FilterBar"))

const Chip = dynamic(() => import("@/components/atoms/Chip/Chip"))

const DebouncedInput = dynamic(
    () => import("@/components/atoms/DebouncedInput"),
)

import { iSanityPainting } from "lib/models/objects/sanityPainting"
import { iSanityPaintingTag } from "lib/models/objects/SanityTag"
import { useCombinedStore } from "lib/store"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { sortPaintings } from "utils/painting"
import { slugify } from "utils/string"

import FilterModal from "@/components/organisms/FilterModal/FilterModal"
import GallerySideBar from "@/components/organisms/GallerySideBar/GallerySideBar"
import PaintingGrid from "@/components/organisms/PaintingGrid"

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

interface iPaintingsPageProps {
    paintings: iSanityPainting[]
    tags: iSanityPaintingTag[]
}

const GalleryPage = ({
    paintings: initialPaintings = [],
    tags = [],
}: iPaintingsPageProps) => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    const [paintings] = useState<iSanityPainting[]>(initialPaintings)
    const [searchFilter, setSearchFilter] = useState("")

    const allFilter = searchParams?.getAll("filter") as string[]

    const filterList = searchParams?.getAll("filter") as string[]

    const [hasLoadedAllPaintings, setHasLoadedAllPaintings] = useState(false)

    const sorting = useCombinedStore((state) => state.paintingSorting)

    // const [paintingsSlice, setPaintingsSlice] = useState(25)
    const paintingsSlice = useCombinedStore((state) => state.paintingSlice)
    const setPaintingsSlice = useCombinedStore(
        (state) => state.setPaintingSlice,
    )

    const filterPaintings = useMemo(() => {
        const sortedPaintings = sortPaintings([...paintings], sorting)

        const filterByTags = (p: iSanityPainting) => {
            const paintingTags = p.tagsV2.map((t) => slugify(t.name))
            return filterList.every((f) => paintingTags.includes(slugify(f)))
        }

        const filterBySearchTerm = (p: iSanityPainting) => {
            const paintingTags = p.tagsV2.map((t) => slugify(t.name))
            const paintingTitle = p.title.toLowerCase()
            const searchTerm = searchFilter.toLowerCase()

            return (
                paintingTags.includes(searchTerm) ||
                paintingTitle.includes(searchTerm)
            )
        }

        if (filterList.length > 0) {
            if (searchFilter) {
                return sortedPaintings.filter(
                    (p) => filterByTags(p) && filterBySearchTerm(p),
                )
            } else {
                return sortedPaintings.filter(filterByTags)
            }
        } else if (searchFilter) {
            return sortedPaintings.filter(filterBySearchTerm)
        }

        return sortedPaintings
    }, [filterList, paintings, sorting, searchFilter])

    // functions that load more paintings, and at the end of the list, load more paintings

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

    return (
        <>
            <section className="flex gap-6">
                <GallerySideBar
                    filters={tags}
                    filterPaintings={filterPaintings}
                    handleChangeSearch={setSearchFilter}
                    searchValue={searchFilter}
                />

                <section className="relative flex-1 w-full">
                    <FilterBar />
                    <PaintingGrid
                        paintings={filterPaintings.slice(0, paintingsSlice)}
                    />
                </section>
            </section>
            <FilterModal filters={tags} />
        </>
    )
}

export default GalleryPage
