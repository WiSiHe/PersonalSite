import Main from "components/atoms/Main/Main"
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
    <Main className="relative flex flex-col items-start min-h-screen p-4 mx-auto max-w-screen-3xl">
      <FilterBar filters={tags} />
      <PaintingGrid paintings={paintings} />
    </Main>
  )
}

export default GalleryPage
