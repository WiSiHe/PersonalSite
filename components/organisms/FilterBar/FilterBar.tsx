"use client"
import ScrollToTopButton from "components/atoms/ScrollToTopButton/ScrollToTopButton"
import FilterSortButton from "components/molecules/FilterSortButton/FilterSortButton"
import FilterModal from "components/organisms/FilterModal/FilterModal"
import { AnimatePresence, motion } from "framer-motion"
import { iSanityPaintingTag } from "lib/models/objects/SanityTag"
import { useCombinedStore } from "lib/store"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { IoFilterSharp } from "react-icons/io5"

interface iFilterBar {
    filters?: iSanityPaintingTag[]
}

const FilterBar = ({ filters = [] }: iFilterBar) => {
    const router = useRouter()
    const pathName = usePathname()
    const currentPath = pathName ?? "/"

    const searchParams = useSearchParams()

    const filterList = searchParams?.getAll("filter") as string[]

    const setFilterModalOpen = useCombinedStore((state) => state.setModalOpen)

    const amountOfActiveFilters = filterList.length

    const handleClearFilterList = () => {
        router.replace(currentPath)
    }

    return (
        <section className="fixed bottom-0 left-0 right-0 z-20 flex items-end justify-between w-full px-4 pt-4 pb-10 pointer-events-none xl:pb-4 xl:px-6">
            <div className="pointer-events-auto">
                <FilterSortButton />
            </div>
            <div className="flex justify-end flex-1 gap-4 pointer-events-auto">
                {amountOfActiveFilters > 0 && (
                    <button
                        className="hidden px-4 text-xs uppercase bg-white rounded-full hover:text-white text-dark drop-shadow xl:block hover:bg-primary"
                        onClick={handleClearFilterList}
                        aria-label="Clear all filters"
                    >
                        <strong>Clear all</strong>
                    </button>
                )}
                <motion.button
                    onClick={setFilterModalOpen}
                    aria-label="Open filter modal"
                    className="relative p-4 bg-white rounded-full shadow-xl hover:bg-primary hover:text-white"
                >
                    {amountOfActiveFilters > 0 && (
                        <div className="text-[10px] absolute pointer-events-none overflow-clip -top-2 -right-2 bg-primary rounded-full w-6 h-6 flex justify-center items-center text-white">
                            {amountOfActiveFilters}
                        </div>
                    )}
                    <AnimatePresence>
                        <IoFilterSharp />
                    </AnimatePresence>
                </motion.button>
            </div>
        </section>
    )
}

export default FilterBar
