"use client"
import dynamic from "next/dynamic"

const FilterBar = dynamic(() => import("components/organisms/FilterBar"))
const PaintingGrid = dynamic(() => import("components/organisms/PaintingGrid"))

import Chip from "components/atoms/Chip/Chip"
import DebouncedInput from "components/atoms/DebouncedInput"
import { AnimatePresence, motion } from "framer-motion"
import { iSanityPainting } from "lib/models/objects/sanityPainting"
import { iSanityPaintingTag } from "lib/models/objects/SanityTag"
import { useCombinedStore } from "lib/store"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { AiOutlineClose } from "react-icons/ai"
import { FaSearch } from "react-icons/fa"
import { isEmptyArray, isNotEmptyArray } from "utils/array"
import { sortPaintings } from "utils/painting"
import { slugify } from "utils/string"

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

    // let lastId: string | null = ""

    // async function fetchNextPageTest() {
    //     if (lastId === null) {
    //         return []
    //     }
    //     const query = `
    //    *[_type == "painting" && _id > $lastId] | order(_id) [0...25] {
    //         title,
    //         paintedAt,
    //         "imagesCount": count(images),
    //         'slug': slug.current,
    //         redbubbleUrl,
    //         _id,
    //         image {
    //           ...,
    //           "lqip": asset->metadata.lqip
    //         },
    //         tagsV2[]->{
    //           name
    //         },
    //         video
    //     }
    //   `

    //     const results = await getClient().fetch(query, { lastId })

    //     if (!results) {
    //         return []
    //     }

    //     if (results.length > 0) {
    //         lastId = results[results.length - 1]._id
    //     } else {
    //         lastId = null // Reached the end
    //     }
    //     return results
    // }

    // const handleButtonClick = () => {
    //     fetchNextPageTest().then((results) => {
    //         // new array with no duplicates
    //         const newPaintings = [...new Set([...paintings, ...results])]

    //         setPaintings(newPaintings)
    //     })
    // }

    const handleToggleFilter = (filter: string) => {
        const slugifiedFilter = slugify(filter)

        if (filterList.includes(slugifiedFilter)) {
            const newFilters = filterList.filter((f) => f !== slugifiedFilter)
            if (isEmptyArray(newFilters)) {
                return router.replace(pathname ?? "/")
            }

            const newParams = newFilters.map((f) => `filter=${f}`).join("&")
            const newRouteWithFilters = `${pathname}?${newParams}`

            router.replace(newRouteWithFilters)
        } else {
            const newFilters = [...filterList, slugifiedFilter]
            const newParams = newFilters.map((f) => `filter=${f}`).join("&")
            router.replace(`${pathname}?${newParams}`)
        }
    }

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
            <FilterBar filters={tags} />
            <section className="pt-4 pb-4">
                <h1 className="">Gallery</h1>
                <p className="pt-2">A gallery of some of my paintings.</p>
            </section>
            <section className="sticky left-0 right-0 z-10 flex flex-col items-start gap-4 p-4 py-4 mb-4 -ml-4 -mr-4 bg-tertiary top-16">
                <div className="flex justify-between w-full gap-2">
                    <div className="flex flex-col flex-1 w-full">
                        <DebouncedInput
                            onDebounce={setSearchFilter}
                            placeholder="search"
                        />
                    </div>
                    <button className="flex items-center justify-center h-12 gap-2 px-4 text-white rounded-md lg:px-8 bg-primary">
                        <FaSearch />
                        Search
                    </button>
                </div>
                <AnimatePresence>
                    {isNotEmptyArray(allFilter) && (
                        <div className="flex items-center w-full h-8 gap-2">
                            {allFilter?.map((filter, i) => {
                                if (!filter) return null
                                const key = `${filter}-${i}`
                                return (
                                    <motion.div
                                        key={key}
                                        initial={{
                                            opacity: 0,
                                            y: 0,
                                            x: 40,
                                            scale: 0.3,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                            x: 0,
                                            scale: 1,
                                        }}
                                        exit={{
                                            opacity: 0,
                                            y: 0,
                                            x: -40,
                                            scale: 0,
                                        }}
                                    >
                                        <Chip>
                                            {filter}
                                            <button
                                                className="ml-2 pointer-events-auto"
                                                onClick={() =>
                                                    handleToggleFilter(filter)
                                                }
                                            >
                                                <AiOutlineClose />
                                            </button>
                                        </Chip>
                                    </motion.div>
                                )
                            })}
                        </div>
                    )}
                </AnimatePresence>
                <div>
                    Results:
                    {filterPaintings.length}
                </div>
            </section>

            <PaintingGrid paintings={filterPaintings} />
        </>
    )
}

export default GalleryPage
