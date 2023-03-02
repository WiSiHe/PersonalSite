import { Dialog, RadioGroup } from "@headlessui/react"
import clsx from "clsx"
import { ScrollToTopButton } from "components/atoms"
import { AnimatePresence, motion } from "framer-motion"
import { iSanityTag } from "lib/models/objects/SanityTag"
import { useState } from "react"
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
  const [plan, setPlan] = useState("trending")
  const [isOpen, setIsOpen] = useState(false)

  return (
    <section className="fixed bottom-0 left-0 right-0 z-20 flex items-center justify-between w-full p-4 pb-10 bg-gradient-to-t from-dark/40 ">
      <div className="relative flex flex-1 gap-4">
        <button className="p-4 bg-white">
          <BsFillGrid1X2Fill />
        </button>
        <ScrollToTopButton isFixed={false} />
      </div>

      <div>
        <RadioGroup
          value={plan}
          onChange={setPlan}
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
          className="fixed right-0 flex items-center justify-end w-full h-full max-w-xl ring my-auto max-h-[70vh] z-10 p-4 overflow-y-scroll top-10 bottom-10"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-dark/40"
            aria-hidden="true"
          />
          <Dialog.Panel className="z-10 h-full p-4 overflow-y-scroll bg-white">
            <Dialog.Title>Filters</Dialog.Title>
            {/* <Dialog.Description>
            This will permanently deactivate your account
          </Dialog.Description> */}
            <button onClick={() => setIsOpen(false)}>Deactivate</button>
            <button onClick={() => setIsOpen(false)}>Cancel</button>
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
