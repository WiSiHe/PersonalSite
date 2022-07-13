import React from "react"
import PropTypes from "prop-types"
import clsx from "clsx"
import Link from "next/link"

const Filters = ({ filteredTags = [], activeFilter = "" }) => {
  return (
    <>
      <div className="pt-2 overflow-x-scroll scrollbar-hidden">
        <div className="relative flex px-4 py-2 space-x-2 ">
          {filteredTags.map((tag, i) => {
            const { label, count } = tag
            const isBuyable = label === "buyable"
            const url =
              tag.label === "all" ? "/paintings" : `/paintings/${tag.label.toLocaleLowerCase()}`
            return (
              <Link href={url} passHref key={i}>
                <a
                  className={clsx(
                    "relative snap-start transition p-2 text-xs bg-primary whitespace-nowrap hover:opacity-90 rounded-lg active:bg-highlight focus:outline-none focus:ring focus:ring-highlight",
                    isBuyable && "ring ring-highlight",
                    activeFilter.toLowerCase() === label.toLocaleLowerCase()
                      ? "bg-highlight hover:bg-highlight text-black"
                      : "text-white "
                  )}>
                  <strong>
                    <span className="capitalize">{label}</span> ({count})
                  </strong>
                  {isBuyable && (
                    <div className="absolute w-4 h-4 rounded-full -right-2 -top-2 text-dark bg-highlight ">
                      <span className="absolute inset-0 inline-flex w-full h-full rounded-full opacity-100 animate-ping bg-highlight"></span>
                      <strong>!</strong>
                    </div>
                  )}
                </a>
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}

Filters.propTypes = {
  activeFilter: PropTypes.string,
  filteredTags: PropTypes.array,
  paintingsAmount: PropTypes.number,
  setFilterTag: PropTypes.func
}

export default Filters
