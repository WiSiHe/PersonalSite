import { Dialog, Transition } from "@headlessui/react"
import { motion } from "framer-motion"
import { iSanityPaintingTag } from "lib/models/objects/SanityTag"
import { useCombinedStore } from "lib/store"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Fragment } from "react"
import { IoClose } from "react-icons/io5"
import { isEmptyArray } from "utils/array"
import { slugify } from "utils/string"
import { cn } from "utils/utility"

const variants = {
  notSelected: {
    rotate: [0, -20, 0],
    transition: { duration: 0.2 },
  },

  selected: {
    y: [0, -10, 0],
    transition: { duration: 0.2 },
    // transition: { repeat: Infinity, repeatDelay: 3 },
  },
}

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
        className="fixed inset-0 z-30 flex justify-end p-4 overflow-y-auto"
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
          <motion.div className="z-10 w-full h-full overflow-y-scroll transition-all transform bg-white shadow-xl top-4 bottom-4 right-4 lg:w-1/3 rounded-xl">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              // transition={{ duration: 0.4, delay: 0.2 }}
              className="sticky top-0 z-10 flex flex-col gap-8 p-4 pb-4 bg-white shadow-lg"
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
                className="w-full py-2 transition-all duration-200 hover:bg-primary/90 hover:text-white ring ring-dark hover:ring-0"
                onClick={handleClearFilterList}
              >
                <strong>Clear All</strong>
              </button>
            </motion.div>

            <ul className="py-8">
              {filters.map((filter, i) => {
                const isLastElement = i === filters.length - 1
                const { name = "", paintingsCount = 0 } = filter

                const isStoreFilter = name === "Store"
                const isFilterActive = filterList.includes(slugify(name))

                return (
                  <li
                    key={i}
                    className={cn(
                      "flex w-full items-center justify-between ",
                      !isLastElement && "border-b",
                      isStoreFilter
                        ? "bg-highlight hover:bg-highlight/40"
                        : "hover:bg-primary/10",
                    )}
                  >
                    <label
                      htmlFor={name}
                      className="flex items-center w-full h-full gap-1 py-4 pl-12 cursor-pointer select-none font-oswald"
                    >
                      <strong className="">{name}</strong>
                      <span>&#183;</span>
                      {paintingsCount}
                    </label>
                    <input
                      id={name}
                      type="checkbox"
                      checked={filterList.includes(slugify(name))}
                      onChange={() => handleToggleFilter(name)}
                      className="appearance-none cursor-pointer peer accent-primary"
                    />
                    <motion.div
                      variants={variants}
                      animate={isFilterActive ? "selected" : "notSelected"}
                      className={cn(
                        "left-4 flex justify-center pointer-events-none absolute peer-checked:stroke-none stroke-dark fill-none peer-checked:!fill-primary",
                        isStoreFilter && "peer-checked:!fill-dark",
                      )}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5"
                      >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                      </svg>
                    </motion.div>
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
