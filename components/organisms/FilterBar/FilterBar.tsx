import { RadioGroup } from "@headlessui/react"
import clsx from "clsx"
import { ScrollToTopButton } from "components/atoms"
import { AnimatePresence, motion } from "framer-motion"
import { iSanityTag } from "lib/models/objects/SanityTag"
import { useCombinedStore } from "lib/store"
import { useEffect, useState } from "react"
import { AiOutlineOrderedList } from "react-icons/ai"
import { BiMinus, BiPlus } from "react-icons/bi"
import { BsFillGrid1X2Fill } from "react-icons/bs"
import { IoClose, IoFilterSharp } from "react-icons/io5"

import FilterModal from "../FilterModal"

const testFilter = [
  //   {
  //     name: "Trending",
  //     value: "trending",
  //   },
  {
    name: "Random",
    value: "random",
  },
  {
    name: "Newest",
    value: "newest",
  },
  {
    name: "Oldest",
    value: "oldest",
  },
]

interface iFilterBar {
  filters?: iSanityTag[]
}

const FilterBar = ({ filters = [] }: iFilterBar) => {
  const [gridOptionsOpen, setGridOptionsOpen] = useState(false)

  const sorting = useCombinedStore((state) => state.paintingSorting)
  const setSorting = useCombinedStore((state) => state.setPaintingSorting)

  const colSize = useCombinedStore((state) => state.colSize)
  const setColSize = useCombinedStore((state) => state.setColSize)

  const filterList: string[] = useCombinedStore((state) => state.filterList)
  const clearFilterList = useCombinedStore((state) => state.clearFilterList)

  const isFilterModalOpen = useCombinedStore((state) => state.modalOpen)
  const setFilterModalOpen = useCombinedStore((state) => state.setModalOpen)

  const amountOfActiveFilters = filterList.length

  const handleSetPaintingColStyleIncrease = () => {
    if (colSize === 3) return
    setColSize(colSize + 1)
  }

  const handleSetPaintingColStyleDecrease = () => {
    if (colSize === 1) return
    setColSize(colSize - 1)
  }

  const handleToggleSorting = () => {
    if (sorting === "random") {
      setSorting("newest")
    } else if (sorting === "newest") {
      setSorting("oldest")
    } else if (sorting === "oldest") {
      setSorting("random")
    }
  }

  return (
    <section className="fixed bottom-0 left-0 right-0 z-20 flex items-end justify-between w-full px-2 pt-4 pb-10 xl:pb-4 xl:px-6 bg-gradient-to-t from-dark/40 ">
      <div className="relative flex flex-1 gap-4">
        <div className="hidden xl:block">
          <AnimatePresence>
            {gridOptionsOpen && (
              <motion.button
                initial={{ x: -10, scale: 0.8 }}
                animate={{ x: 0, scale: 1 }}
                exit={{ x: -10, scale: 0.8 }}
                transition={{ type: "spring" }}
                className="p-4 bg-white"
                onClick={handleSetPaintingColStyleDecrease}
                disabled={colSize === 1}
              >
                <BiMinus />
              </motion.button>
            )}

            <motion.button
              className="p-4 bg-white"
              onClick={() => setGridOptionsOpen((prev) => !prev)}
            >
              <BsFillGrid1X2Fill />
            </motion.button>

            {gridOptionsOpen && (
              <motion.button
                initial={{ x: -10, scale: 0.8 }}
                animate={{ x: 0, scale: 1 }}
                exit={{ x: 0, y: 100, scale: 0.8 }}
                transition={{ type: "spring" }}
                className="p-4 bg-white"
                onClick={handleSetPaintingColStyleIncrease}
                disabled={colSize === 3}
              >
                <BiPlus />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
        <ScrollToTopButton isFixed={false} />
      </div>

      <RadioGroup
        value={sorting}
        onChange={setSorting}
        className={clsx(" bg-white hidden xl:flex p-1")}
      >
        <RadioGroup.Label className="sr-only">Filter</RadioGroup.Label>
        {testFilter.map((filter) => (
          <RadioGroup.Option
            key={filter.value}
            value={filter.value}
            className="text-center cursor-pointer"
          >
            {({ checked }) => (
              <div className={clsx("cursor-pointer relative p-2")}>
                {checked && (
                  <motion.div
                    className="absolute inset-0 z-0 w-full h-full bg-primary"
                    layoutId="underline"
                  />
                )}
                <div
                  className={clsx(
                    "z-10 relative text-sm transition-all duration-200 delay-200 ease-in-out",
                    checked ? "text-white" : "text-primary"
                  )}
                >
                  <strong>{filter.name}</strong>
                </div>
              </div>
            )}
          </RadioGroup.Option>
        ))}
      </RadioGroup>
      <button
        className="flex items-center justify-center gap-2 p-3 capitalize bg-white xl:hidden"
        onClick={handleToggleSorting}
      >
        {sorting}
        <AiOutlineOrderedList />
      </button>

      <div className="flex justify-end flex-1 gap-4">
        {amountOfActiveFilters > 0 && (
          <button
            className="hidden text-xs text-white uppercase xl:block"
            onClick={clearFilterList}
          >
            <strong>Clear all</strong>
          </button>
        )}
        <motion.button
          layout
          onClick={setFilterModalOpen}
          className="relative p-4 bg-white"
        >
          {amountOfActiveFilters > 0 && (
            <div className="text-[10px] absolute pointer-events-none overflow-clip -top-2 -right-2 bg-primary rounded-full w-6 h-6 flex justify-center items-center text-white">
              {amountOfActiveFilters}
            </div>
          )}
          <AnimatePresence>
            {isFilterModalOpen ? <IoClose /> : <IoFilterSharp />}
          </AnimatePresence>
        </motion.button>
      </div>
      <FilterModal filters={filters} />
    </section>
  )
}

export default FilterBar
