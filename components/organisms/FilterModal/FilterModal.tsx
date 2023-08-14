import { Dialog, Transition } from "@headlessui/react"
import clsx from "clsx"
import { motion } from "framer-motion"
import { iSanityPaintingTag } from "lib/models/objects/SanityTag"
import { useCombinedStore } from "lib/store"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Fragment } from "react"
import { IoClose } from "react-icons/io5"
import { isEmptyArray } from "utils/array"
import { slugify } from "utils/string"

interface iFilterModal {
  filters?: iSanityPaintingTag[]
}

const FilterModal = ({ filters = [] }: iFilterModal) => {
  const router = useRouter()

  const pathname = usePathname()
  const searchParams = useSearchParams()

  const filterList = searchParams?.getAll("filter") as string[]

  const isFilterModalOpen = useCombinedStore((state) => state.modalOpen)
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

  const handleClearFilterList = () => {
    router.replace(pathname ?? "/")
  }

  return (
    <Transition appear show={isFilterModalOpen} as={Fragment}>
      <Dialog
        as="div"
        onClose={setFilterModalOpen}
        className="fixed inset-0 z-30 p-4 overflow-y-auto"
      >
        <Dialog.Overlay className="fixed inset-0 transition-all duration-200 bg-black opacity-30" />
        <Transition.Child
          as={Fragment}
          enter="transition-all ease-in-out duration-500"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100 "
          leave="transition-all ease-in-out duration-500"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <motion.div className="w-full h-full overflow-y-scroll transition-all transform bg-white shadow-xl top-4 bottom-4 right-4 lg:w-1/3 rounded-xl">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              // transition={{ duration: 0.4, delay: 0.2 }}
              className="sticky top-0 flex flex-col gap-8 p-4 pb-4 bg-white shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <strong className="font-oswald">Filters</strong>
                  <p>Filter by tags</p>
                </div>
                <button
                  onClick={setFilterModalOpen}
                  className="p-3 text-2xl hover:bg-primary hover:text-white"
                >
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
                      isStoreFilter && "bg-highlight",
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
          </motion.div>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}

export default FilterModal
