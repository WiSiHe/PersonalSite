"use client"
import dynamic from "next/dynamic"

const FilterBar = dynamic(() => import("components/organisms/FilterBar"))
const PaintingGrid = dynamic(() => import("components/organisms/PaintingGrid"))

import Chip from "components/atoms/Chip/Chip"
import { AnimatePresence, motion } from "framer-motion"
import { iSanityPainting } from "lib/models/objects/sanityPainting"
import { iSanityPaintingTag } from "lib/models/objects/SanityTag"
import { useSearchParams } from "next/navigation"
import { FaSearch } from "react-icons/fa"

interface iPaintingsPageProps {
  paintings: iSanityPainting[]
  tags: iSanityPaintingTag[]
}

const GalleryPage = ({ paintings = [], tags = [] }: iPaintingsPageProps) => {
  const searchParams = useSearchParams()

  const allFilter = searchParams?.getAll("filter") as string[]

  return (
    <>
      <FilterBar filters={tags} />
      <section className="block pt-4 pb-4">
        <h1 className="">Gallery</h1>
        <p className="pt-2">A gallery of some of my paintings.</p>
      </section>

      <section className="flex items-center h-10 gap-2">
        <AnimatePresence>
          {allFilter?.map((filter, i) => (
            <motion.div
              key={filter}
              initial={{ opacity: 0, y: 0, x: 40, scale: 0.3 }}
              animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
              exit={{ opacity: 0, y: 0, x: -40, scale: 0 }}
            >
              <Chip>{filter}</Chip>
            </motion.div>
          ))}
        </AnimatePresence>
      </section>
      <section className="flex items-center w-full gap-4 py-4">
        <div className="flex flex-col flex-1">
          <label htmlFor="search" className="sr-only">
            Search:
          </label>
          <input
            type="search"
            placeholder="Search"
            id="search"
            className="h-12 px-4 py-1 border border-gray-300 rounded-md"
          />
        </div>
        <button className="flex items-center justify-center h-12 gap-2 px-4 text-white rounded-md lg:px-8 bg-primary">
          <FaSearch />
          Search
        </button>
      </section>
      <PaintingGrid paintings={paintings} />
    </>
  )
}

export default GalleryPage
