import dynamic from "next/dynamic"

const FilterBar = dynamic(() => import("components/organisms/FilterBar"))

import PaintingGrid from "components/organisms/PaintingGrid"
import { iSanityPainting } from "lib/models/objects/sanityPainting"
import { iSanityPaintingTag } from "lib/models/objects/SanityTag"
interface iPaintingsPageProps {
  paintings: iSanityPainting[]
  tags: iSanityPaintingTag[]
}

const GalleryPage = ({ paintings = [], tags = [] }: iPaintingsPageProps) => {
  return (
    <>
      <FilterBar filters={tags} />
      <section className="pt-4 pb-10">
        <h1 className="">Gallery</h1>
        <p className="pt-2">
          A gallery of some of my paintings. Click on a painting to see more of
          it.
        </p>
      </section>
      <PaintingGrid paintings={paintings} />
    </>
  )
}

export default GalleryPage
