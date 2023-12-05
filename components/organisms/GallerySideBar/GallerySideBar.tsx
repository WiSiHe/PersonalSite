import { AnimatePresence, motion } from "framer-motion"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { AiOutlineClose } from "react-icons/ai"

import Chip from "@/components/atoms/Chip/Chip"
import DebouncedInput from "@/components/atoms/DebouncedInput"
import { isEmptyArray, isNotEmptyArray } from "@/utils/array"
import { slugify } from "@/utils/string"

import FilterBar from "../FilterBar"
import FilterDrawer from "../FilterDrawer/FilterDrawer"
import FilterModal from "../FilterModal/FilterModal"

const GallerySideBar = ({
    handleChangeSearch,

    filterPaintings,
    filters = [],
}: any) => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    const allFilter = searchParams?.getAll("filter") as string[]
    const filterList = searchParams?.getAll("filter") as string[]

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

    return (
        <>
            <FilterBar filters={filters} />
            <section>
                <div className="flex flex-col gap-1">
                    <h1 className="">Gallery</h1>
                    <p className="pt-2">A gallery of some of my paintings.</p>
                </div>
                <div className="flex flex-col ">
                    <DebouncedInput
                        onDebounce={handleChangeSearch}
                        placeholder="search"
                        type="search"
                    />
                </div>
                <div>
                    Results:
                    {filterPaintings.length}
                </div>
                <strong>Sort</strong>
                <div className="flex items-stretch rounded ring ring-dark justify-stretch overflow-clip strech">
                    <button className="w-full px-2 py-2 hover:bg-primary hover:text-tertiary">
                        Random
                    </button>
                    <button className="w-full px-2">Newest</button>
                    <button className="w-full px-2">Oldest</button>
                </div>
                <section className="left-0 right-0 z-10 flex flex-col items-start gap-4 p-4 py-4 mb-4 -ml-4 -mr-4 top-16">
                    <strong>FILTERS</strong>
                    <AnimatePresence>
                        {isNotEmptyArray(allFilter) && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ type: "spring", delay: 0.5 }}
                                className="flex flex-wrap items-center w-full h-8 gap-2"
                            >
                                {allFilter.map((filter, i) => {
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
                                                    className="p-1 ml-2 cursor-pointer pointer-events-auto hover:bg-gray-200 hover:bg-opacity-50"
                                                    onClick={() =>
                                                        handleToggleFilter(
                                                            filter,
                                                        )
                                                    }
                                                >
                                                    <AiOutlineClose />
                                                </button>
                                            </Chip>
                                        </motion.div>
                                    )
                                })}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </section>

                <FilterDrawer />

                <FilterModal filters={filters} />
            </section>
        </>
    )
}

export default GallerySideBar
