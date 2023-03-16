import { Popover, RadioGroup } from "@headlessui/react"
import clsx from "clsx"
import { ScrollToTopButton } from "components/atoms"
import { AnimatePresence, motion } from "framer-motion"
import { iSanityTag } from "lib/models/objects/SanityTag"
import { useCombinedStore } from "lib/store"
import { AiOutlineOrderedList } from "react-icons/ai"
import { BiSortDown, BiSortUp } from "react-icons/bi"
import { FaRandom } from "react-icons/fa"
import { IoFilterSharp } from "react-icons/io5"

import FilterModal from "../FilterModal"

const testFilter = [
  //   {
  //     name: "Trending",
  //     value: "trending",
  //   },
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

interface iFilterBar {
  filters?: iSanityTag[]
}

const FilterBar = ({ filters = [] }: iFilterBar) => {
  const sorting = useCombinedStore((state) => state.paintingSorting)
  const setSorting = useCombinedStore((state) => state.setPaintingSorting)

  // const colSize = useCombinedStore((state) => state.colSize)
  // const setColSize = useCombinedStore((state) => state.setColSize)
  // const setColStyle = useCombinedStore((state) => state.setColStyle)

  const filterList: string[] = useCombinedStore((state) => state.filterList)
  const clearFilterList = useCombinedStore((state) => state.clearFilterList)

  // const isFilterModalOpen = useCombinedStore((state) => state.modalOpen)
  const setFilterModalOpen = useCombinedStore((state) => state.setModalOpen)

  const amountOfActiveFilters = filterList.length

  // const toggleColSize = () => {
  //   if (colSize === 1) {
  //     setColSize(2)
  //     setColStyle("col-span-4 xl:col-span-3")
  //   } else if (colSize === 2) {
  //     setColSize(3)
  //     setColStyle("col-span-6 xl:col-span-2")
  //   } else if (colSize === 3) {
  //     setColSize(1)
  //     setColStyle("col-span-full xl:col-span-4")
  //   }
  // }

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
    <section className="fixed bottom-0 left-0 right-0 z-20 flex items-end justify-between w-full px-2 pt-4 pb-10 xl:pb-4 xl:px-6">
      <div className="relative flex flex-1 gap-4">
        {/* <AnimatePresence>
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="p-4 bg-white rounded-full shadow-xl hover:bg-primary hover:text-white"
            onClick={toggleColSize}
          >
            <BsFillGrid1X2Fill />
          </motion.button>
        </AnimatePresence> */}
        <ScrollToTopButton isFixed={false} />
      </div>

      <RadioGroup
        value={sorting}
        onChange={setSorting}
        className={clsx(
          "bg-white hidden xl:flex p-2 gap-2 rounded-full shadow-xl"
        )}
      >
        <RadioGroup.Label className="sr-only">Filter</RadioGroup.Label>
        {testFilter.map((filter) => (
          <RadioGroup.Option
            key={filter.value}
            value={filter.value}
            className="text-center cursor-pointer"
          >
            {({ checked }) => (
              <div
                className={clsx(
                  "cursor-pointer relative py-2 px-4 hover:bg-primary/40 rounded-full hover:text-white",
                  checked ? "text-white" : "text-primary"
                )}
              >
                {checked && (
                  <motion.div
                    className="absolute inset-0 z-0 w-full h-full rounded-full bg-primary hover:opacity-90"
                    layoutId="underline"
                  />
                )}
                <div className="relative flex items-center gap-1">
                  {filter.icon}
                  <strong>{filter.name}</strong>
                </div>
              </div>
            )}
          </RadioGroup.Option>
        ))}
      </RadioGroup>
      <Popover className="relative xl:hidden">
        <Popover.Button className="flex items-center justify-center gap-2 px-8 py-4 capitalize bg-white rounded-full shadow-xl hover:text-white hover:bg-primary">
          <AiOutlineOrderedList />
          {sorting}
        </Popover.Button>

        <Popover.Panel className="absolute left-0 right-0 z-10 p-1 -top-52">
          <RadioGroup
            value={sorting}
            onChange={setSorting}
            className={clsx("bg-white flex-col flex")}
          >
            <RadioGroup.Label className="sr-only">Filter</RadioGroup.Label>
            {testFilter.map((filter) => (
              <RadioGroup.Option
                key={filter.value}
                value={filter.value}
                className="text-center cursor-pointer"
              >
                {({ checked }) => (
                  <div
                    className={clsx(
                      "cursor-pointer relative px-8 py-5 transition-all",
                      checked ? "text-white bg-primary" : "text-primary"
                    )}
                  >
                    <div className="relative flex items-center gap-1">
                      <span className="flex-shrink-0 ">{filter.icon}</span>
                      <strong>{filter.name}</strong>
                    </div>
                  </div>
                )}
              </RadioGroup.Option>
            ))}
          </RadioGroup>
        </Popover.Panel>
      </Popover>

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
          onClick={setFilterModalOpen}
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
