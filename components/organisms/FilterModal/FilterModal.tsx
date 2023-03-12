import { Dialog } from "@headlessui/react"
import clsx from "clsx"
import { AnimatePresence, motion } from "framer-motion"
import { iSanityTag } from "lib/models/objects/SanityTag"
import { useCombinedStore } from "lib/store"
import { IoClose } from "react-icons/io5"

interface iFilterModal {
  filters?: iSanityTag[]
}

const FilterModal = ({ filters = [] }: iFilterModal) => {
  const filterList: string[] = useCombinedStore((state) => state.filterList)
  const setFilterList = useCombinedStore((state) => state.setFilterList)

  const isFilterModalOpen = useCombinedStore((state) => state.modalOpen)
  const setFilterModalOpen = useCombinedStore((state) => state.setModalOpen)
  const clearFilterList = useCombinedStore((state) => state.clearFilterList)

  const handleToggleFilter = (filter: string) => {
    if (filterList.includes(filter)) {
      setFilterList(filterList.filter((f) => f !== filter))
    } else {
      setFilterList([...filterList, filter])
    }
  }

  return (
    <AnimatePresence>
      <Dialog
        open={isFilterModalOpen}
        onClose={setFilterModalOpen}
        className="fixed right-0 flex items-center justify-end w-full h-full max-w-xs my-auto max-h-[100svh] xl:max-h-[100svh] z-20  overflow-y-scroll top-0 bottom-0"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: "spring", duration: 0.4 }}
          className="fixed inset-0 bg-dark/40 backdrop-filter backdrop-blur-sm"
          aria-hidden="true"
        />
        <Dialog.Panel className="relative z-10 w-full h-full overflow-y-scroll bg-white">
          {/* <Dialog.Title>Filters</Dialog.Title> */}
          <Dialog.Description className="sticky top-0 flex flex-col gap-8 p-4 pb-4 bg-white shadow-lg">
            <div className="flex items-center justify-between">
              <strong>Filter</strong>
              <button onClick={setFilterModalOpen} className="text-2xl">
                <IoClose />
              </button>
            </div>
            <button
              className="w-full ring-dark ring hover:bg-primary/90 hover:text-white"
              onClick={clearFilterList}
            >
              <strong>Clear All</strong>
            </button>
          </Dialog.Description>

          <ul className="px-4 py-4">
            {filters.map((filter, i) => {
              const isLastElement = i === filters.length - 1
              return (
                <>
                  <li
                    key={i}
                    className={clsx(
                      "flex justify-between py-2",
                      !isLastElement && "border-b"
                    )}
                  >
                    <label htmlFor={filter.name} className="cursor-pointer">
                      {filter.name} - {filter.paintingsCount}
                    </label>
                    <input
                      id={filter.name}
                      type="checkbox"
                      checked={filterList.includes(filter.name)}
                      onChange={() => handleToggleFilter(filter.name)}
                      className="cursor-pointer accent-primary"
                    />
                  </li>
                </>
              )
            })}
          </ul>
        </Dialog.Panel>
      </Dialog>
    </AnimatePresence>
  )
}

export default FilterModal
