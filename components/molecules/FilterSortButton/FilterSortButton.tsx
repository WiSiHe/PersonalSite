import { Popover, RadioGroup } from "@headlessui/react"
import clsx from "clsx"
import { motion } from "framer-motion"
import { useCombinedStore } from "lib/store"
import { AiOutlineOrderedList } from "react-icons/ai"
import { BiSortDown, BiSortUp } from "react-icons/bi"
import { FaRandom } from "react-icons/fa"

const testFilter = [
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

const FilterSortButton = () => {
  const sorting = useCombinedStore((state) => state.paintingSorting)
  const setSorting = useCombinedStore((state) => state.setPaintingSorting)
  // const handleToggleSorting = () => {
  //     if (sorting === "random") {
  //       setSorting("newest")
  //     } else if (sorting === "newest") {
  //       setSorting("oldest")
  //     } else if (sorting === "oldest") {
  //       setSorting("random")
  //     }
  //   }
  return (
    <>
      <RadioGroup
        value={sorting}
        onChange={setSorting}
        className={clsx(
          "bg-white hidden xl:flex p-2 gap-2 rounded-full shadow-xl pointer-events-auto"
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
    </>
  )
}

export default FilterSortButton
