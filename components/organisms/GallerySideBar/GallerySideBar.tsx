import { AnimatePresence, motion } from "framer-motion"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { AiOutlineClose } from "react-icons/ai"
import { BiSortDown, BiSortUp } from "react-icons/bi"
import { FaChevronLeft, FaRandom } from "react-icons/fa"
import { IoFilterSharp } from "react-icons/io5"

import Button from "@/components/atoms/Button"
import Chip from "@/components/atoms/Chip/Chip"
import DebouncedInput from "@/components/atoms/DebouncedInput"
import { useCombinedStore } from "@/lib/store"
import { isEmptyArray, isNotEmptyArray } from "@/utils/array"
import { slugify } from "@/utils/string"
import { cn } from "@/utils/utility"

const testFilter = [
    {
        name: "Random",
        value: "random",
        icon: <FaRandom />,
    },
    {
        name: "Newest",
        value: "newest",
        icon: <BiSortDown />,
    },
    {
        name: "Oldest",
        value: "oldest",
        icon: <BiSortUp />,
    },
]

const GallerySideBar = ({
    handleChangeSearch,

    filterPaintings,
    filters = [],
}: any) => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    const [isOpen, setIsOpen] = useState(true)

    const allFilter = searchParams?.getAll("filter") as string[]
    const filterList = searchParams?.getAll("filter") as string[]

    const sorting = useCombinedStore((state) => state.paintingSorting)

    const setSorting = useCombinedStore((state) => state.setPaintingSorting)
    const test = ""
    const setFilterModalOpen = useCombinedStore((state) => state.setModalOpen)

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
        <section
            className={cn(
                "@container lg:sticky lg:top-20 lg:h-[91.5dvh] transition-all p-4 drop-shadow shrink-0 bg-tertiary rounded",
                isOpen ? "w-full lg:w-96" : "lg:w-20 w-full",
            )}
        >
            <div className="flex-col gap-1 hidden @xs:flex">
                <h1 className="">Gallery</h1>
                <p className="pt-2">A gallery of some of my paintings.</p>
                <DebouncedInput
                    onDebounce={handleChangeSearch}
                    placeholder="Search"
                    type="search"
                />
                <div className="flex gap-1 pt-4">
                    <strong>Results:</strong>
                    {filterPaintings.length}
                </div>
                <div className="flex-col hidden gap-2 pt-4 lg:flex">
                    <strong>Sort</strong>
                    <div className="items-stretch hidden rounded lg:flex ring ring-dark justify-stretch overflow-clip strech">
                        {testFilter.map((filter) => {
                            const isActive = sorting === filter.value
                            return (
                                <button
                                    key={filter.value}
                                    onClick={() => setSorting(filter.value)}
                                    className={cn(
                                        "w-full px-2 py-2 hover:bg-primary hover:text-tertiary active:bg-primary/90 active:text-white",
                                        isActive
                                            ? "bg-primary text-white"
                                            : "bg-white text-dark",
                                    )}
                                >
                                    {filter.name}
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>

            <section className="flex-col items-start pt-4 hidden @xs:flex">
                <div className="flex items-start justify-between w-full pb-2">
                    <strong>Filters: {allFilter.length}</strong>
                    <button
                        onClick={setFilterModalOpen}
                        className="hidden p-1 text-xl bg-white rounded shadow-xl ring ring-dark lg:block hover:text-white hover:bg-primary"
                    >
                        <IoFilterSharp />
                    </button>
                </div>
                <AnimatePresence>
                    {isNotEmptyArray(allFilter) ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ type: "spring", delay: 0.5 }}
                            className="flex flex-wrap items-center w-full gap-2"
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
                                                    handleToggleFilter(filter)
                                                }
                                            >
                                                <AiOutlineClose />
                                            </button>
                                        </Chip>
                                    </motion.div>
                                )
                            })}
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ type: "spring", delay: 0.5 }}
                            className="flex flex-wrap items-center w-full gap-2"
                        >
                            <Chip>No filters applied</Chip>
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>
            <div className="absolute bottom-4 right-4">
                <Button onClick={() => setIsOpen((prev) => !prev)}>
                    <FaChevronLeft
                        className={cn(
                            "rotate-180 transition-all",
                            isOpen && " rotate-0",
                        )}
                    />
                </Button>
            </div>
        </section>
    )
}

export default GallerySideBar
