import { Dialog, RadioGroup } from "@headlessui/react"
import clsx from "clsx"
import { ScrollToTopButton } from "components/atoms"
import { AnimatePresence, motion } from "framer-motion"
import { iSanityTag } from "lib/models/objects/SanityTag"
import { useCombinedStore } from "lib/store"
import { useState } from "react"
import { BiMinus, BiPlus } from "react-icons/bi"
import { BsFillGrid1X2Fill } from "react-icons/bs"
import { IoClose, IoFilterSharp } from "react-icons/io5"

const testFilter = [
  {
    name: "Trending",
    value: "trending",
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
  const [isOpen, setIsOpen] = useState(false)
  const [gridOptionsOpen, setGridOptionsOpen] = useState(false)

  const sorting = useCombinedStore((state) => state.paintingSorting)
  const setSorting = useCombinedStore((state) => state.setPaintingSorting)

  const colStyle = useCombinedStore((state) => state.colStyle)
  const colSize = useCombinedStore((state) => state.colSize)
  const setColSize = useCombinedStore((state) => state.setColSize)
  const setColStyle = useCombinedStore((state) => state.setColStyle)

  const handleSetPaintingColStyleIncrease = () => {
    if (colSize === 6) return
  }

  const handleSetPaintingColStyleDecrease = () => {
    if (colSize === 2) return
  }

  return (
    <section className="fixed bottom-0 left-0 right-0 z-20 flex items-center justify-between w-full px-6 pt-4 pb-10 bg-gradient-to-t from-dark/40 ">
      <div className="relative flex flex-1 gap-4">
        <div>
          <AnimatePresence>
            {gridOptionsOpen && (
              <motion.button
                initial={{ opacity: 0, x: -100, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -100, scale: 0.8 }}
                transition={{ type: "spring", duration: 0.4 }}
                className="p-4 bg-white"
                onClick={handleSetPaintingColStyleDecrease}
              >
                <BiMinus />
              </motion.button>
            )}
          </AnimatePresence>

          <button
            className="p-4 bg-white"
            onClick={() => setGridOptionsOpen((prev) => !prev)}
          >
            <BsFillGrid1X2Fill />
          </button>
          <AnimatePresence>
            {gridOptionsOpen && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", duration: 0.4, delay: 0.4 }}
                className="p-4 bg-white"
                onClick={handleSetPaintingColStyleIncrease}
              >
                <BiPlus />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
        <ScrollToTopButton isFixed={false} />
      </div>

      <div>
        <RadioGroup
          value={sorting}
          onChange={setSorting}
          className="flex gap-4 p-2 bg-white"
        >
          <RadioGroup.Label className="sr-only">Filter</RadioGroup.Label>
          {testFilter.map((filter) => (
            <RadioGroup.Option key={filter.value} value={filter.value}>
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
      </div>
      <div className="flex justify-end flex-1 gap-4">
        <button className="text-xs text-white uppercase">
          <strong>Clear all</strong>
        </button>
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="p-4 bg-white"
        >
          <AnimatePresence>
            {isOpen ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <IoClose />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <IoFilterSharp />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      <AnimatePresence>
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="fixed right-0 flex items-center justify-end w-full h-full max-w-sm ring my-auto max-h-[70vh] z-10 p-4 overflow-y-scroll top-10 bottom-10"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-dark/40"
            aria-hidden="true"
          />
          <Dialog.Panel className="z-10 w-full h-full p-4 overflow-y-scroll bg-white">
            {/* <Dialog.Title>Filters</Dialog.Title> */}
            <Dialog.Description className="flex flex-col gap-4 pb-4 ">
              <div className="flex items-center justify-between">
                <strong>Mediums</strong>
                <button onClick={() => setIsOpen(false)}>
                  <IoClose />
                </button>
              </div>
              <button className="w-full ring-dark ring">Clear All</button>
            </Dialog.Description>
            <hr />
            <ul className="py-4 space-y-4">
              {filters.map((filter, i) => (
                <li key={i} className="flex justify-between">
                  <label htmlFor={filter.name}>{filter.name}</label>
                  <input id={filter.name} type="checkbox" />
                </li>
              ))}
            </ul>
          </Dialog.Panel>
        </Dialog>
      </AnimatePresence>
    </section>
  )
}

export default FilterBar