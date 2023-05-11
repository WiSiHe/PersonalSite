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
      <PaintingGrid paintings={paintings} />
    </>
  )
}

export default GalleryPage
