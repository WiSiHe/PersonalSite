import clsx from "clsx"
import Painting from "components/Painting"
import PropTypes from "prop-types"
import React from "react"

const PaintingGrid = ({ paintings = [], filterTag = "" }) => {
  return (
    <div
      className={clsx(
        "relative w-full grid grid-cols-12 p-4 gap-2 auto-rows-min items-start"
      )}
    >
      {paintings
        .filter((p) =>
          p.tags?.find(
            (t) => t.value.toLowerCase() === filterTag || filterTag === "all"
          )
        )
        .map((p, i) => (
          <Painting paintingData={p} filterTag={filterTag} index={i} key={i} />
        ))}
    </div>
  )
}

PaintingGrid.propTypes = {
  display: PropTypes.bool,
  filterTag: PropTypes.string,
  paintings: PropTypes.array,
}

export default PaintingGrid
