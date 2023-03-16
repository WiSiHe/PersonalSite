import { FilterModal, FilterSortButton, ScrollToTopButton } from "components"
import { AnimatePresence, motion } from "framer-motion"
import { iSanityTag } from "lib/models/objects/SanityTag"
import { useCombinedStore } from "lib/store"
import { IoFilterSharp } from "react-icons/io5"

interface iFilterBar {
  filters?: iSanityTag[]
}

const FilterBar = ({ filters = [] }: iFilterBar) => {
  const filterList: string[] = useCombinedStore((state) => state.filterList)
  const clearFilterList = useCombinedStore((state) => state.clearFilterList)

  const setFilterModalOpen = useCombinedStore((state) => state.setModalOpen)

  const amountOfActiveFilters = filterList.length

  return (
    <section className="fixed bottom-0 left-0 right-0 z-20 flex items-end justify-between w-full px-2 pt-4 pb-10 xl:pb-4 xl:px-6">
      <div className="relative flex flex-1 gap-4">
        <ScrollToTopButton isFixed={false} />
      </div>

      <FilterSortButton />

      <div className="flex justify-end flex-1 gap-4">
        {amountOfActiveFilters > 0 && (
          <button
            className="hidden px-4 text-xs text-white uppercase rounded-full xl:block hover:bg-primary"
            onClick={clearFilterList}
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
      <FilterModal filters={filters} />
    </section>
  )
}

export default FilterBar
