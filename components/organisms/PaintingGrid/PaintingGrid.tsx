import Painting from "components/molecules/Painting/Painting"
import { iSanityPainting } from "lib/models/objects/sanityPainting"
import { isNotEmptyArray } from "utils/array"

interface iPaintingGridProps {
  paintings: iSanityPainting[]
}

const PaintingGrid = ({ paintings = [] }: iPaintingGridProps) => {
  const hasPaintings = isNotEmptyArray(paintings)

  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {hasPaintings
        ? paintings.map((painting) => (
            <li key={painting._id} className="col-span-1 aspect-square">
              <Painting paintingData={painting} />
            </li>
          ))
        : [...Array(9)].map((_, i) => (
            <li key={i} className="col-span-1 aspect-square">
              <div className="w-full h-full rounded-lg bg-dark animate-pulse" />
            </li>
          ))}
    </ul>
  )
}

export default PaintingGrid
