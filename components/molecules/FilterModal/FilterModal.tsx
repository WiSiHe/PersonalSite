import { Dialog, Transition } from "@headlessui/react"
import clsx from "clsx"
import { motion } from "framer-motion"
import { iSanityTag } from "lib/models/objects/SanityTag"
import { useCombinedStore } from "lib/store"
import { useRouter } from "next/router"
import { Fragment } from "react"
import { IoClose } from "react-icons/io5"
import { slugify } from "utils/string"

interface iFilterModal {
  filters?: iSanityTag[]
}

const FilterModal = ({ filters = [] }: iFilterModal) => {
  const router = useRouter()
  const { query } = router

  const filterList: string[] = useCombinedStore((state) => state.filterList)
  const setFilterList = useCombinedStore((state) => state.setFilterList)

  const isFilterModalOpen = useCombinedStore((state) => state.modalOpen)
  const setFilterModalOpen = useCombinedStore((state) => state.setModalOpen)
  const clearFilterList = useCombinedStore((state) => state.clearFilterList)

  const handleToggleFilter = (filter: string) => {
    const slugifiedFilter = slugify(filter)
    if (filterList.includes(slugifiedFilter)) {
      const newFilters = filterList.filter((f) => f !== slugifiedFilter)
      setFilterList(newFilters)
      router.replace({ query: { ...query, filter: newFilters } }, undefined, {
        shallow: true,
      })
    } else {
      const newFilters = [...filterList, slugifiedFilter]
      setFilterList(newFilters)
      router.replace({ query: { ...query, filter: newFilters } }, undefined, {
        shallow: true,
      })
    }
  }

  const handleClearFilterList = () => {
    clearFilterList()
    router.replace(router.pathname, undefined, { shallow: true })
  }

  return (
    <Transition show={isFilterModalOpen} as={Fragment}>
      <Dialog
        open={isFilterModalOpen}
        onClose={setFilterModalOpen}
        className="fixed right-0 flex items-center justify-end w-full h-full max-w-xs my-auto max-h-[100svh] xl:max-h-[100svh] z-20  overflow-y-scroll top-0 bottom-0"
      >
        {isFilterModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", duration: 3 }}
            className="fixed inset-0 bg-dark/40 backdrop-filter backdrop-blur-sm"
            key="overlay"
            aria-hidden="true"
          />
        )}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Dialog.Panel className="relative z-10 w-full h-full overflow-y-scroll bg-white">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="sticky top-0 flex flex-col gap-8 p-4 pb-4 bg-white shadow-lg"
            >
              <div className="flex items-center justify-between">
                <strong>Filter</strong>
                <button onClick={setFilterModalOpen} className="text-2xl">
                  <IoClose />
                </button>
              </div>
              <button
                className="w-full ring-dark ring hover:bg-primary/90 hover:text-white"
                onClick={handleClearFilterList}
              >
                <strong>Clear All</strong>
              </button>
            </motion.div>

            <ul className="py-4 ">
              {filters.map((filter, i) => {
                const isLastElement = i === filters.length - 1
                const { name = "", paintingsCount = 0 } = filter

                const isStoreFilter = name === "Store"

                return (
                  <li
                    key={i}
                    className={clsx(
                      "flex justify-between py-2 px-4 hover:bg-primary/10",
                      !isLastElement && "border-b",
                      isStoreFilter && "bg-highlight"
                    )}
                  >
                    <label htmlFor={name} className="w-full cursor-pointer">
                      {name} - {paintingsCount}
                    </label>
                    <input
                      id={name}
                      type="checkbox"
                      checked={filterList.includes(slugify(name))}
                      onChange={() => handleToggleFilter(name)}
                      className="cursor-pointer accent-primary"
                    />
                  </li>
                )
              })}
            </ul>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}

export default FilterModal
