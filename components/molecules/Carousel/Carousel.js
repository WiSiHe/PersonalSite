import clsx from "clsx"
import Painting from "components/atoms/PaintingV2"
import PropTypes from "prop-types"
import React from "react"
import { useRef, useState } from "react"
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi"

const Carousel = ({ paintings = [], filterTag = "" }) => {
  const wrapper = useRef()

  const [stepLeftDisabled, setStepLeftDisabled] = useState(true)

  const [stepRightDisabled, setStepRightDisabled] = useState(false)

  const handleStepLeft = () => {
    wrapper.current.scrollTo({
      left:
        wrapper.current.scrollLeft - wrapper.current.children[0].clientWidth,
      behavior: "smooth",
    })
  }

  const handleStepRight = () => {
    wrapper.current.scrollTo({
      left:
        wrapper.current.scrollLeft + wrapper.current.children[0].clientWidth,
      behavior: "smooth",
    })
  }

  const handleScroll = (e) => {
    setStepLeftDisabled(e.target.scrollLeft === 0)
    setStepRightDisabled(
      e.target.scrollLeft + e.target.offsetWidth >= e.target.scrollWidth
    )
  }

  return (
    <div className="relative pl-4 lg:h-96 h-80">
      <div
        className={clsx(
          stepLeftDisabled && "hidden",
          "absolute top-0 bottom-0 left-4 z-20 flex items-center justify-center w-20 pointer-events-none"
        )}
      >
        <button
          className="p-2 shadow-2xl ring-1 ring-white bg-primary"
          onClick={handleStepLeft}
        >
          <BiLeftArrowAlt className="text-xl text-white" />
        </button>
      </div>

      <div
        className="relative flex w-full h-full space-x-4 overflow-x-scroll snap-x snap-mandatory scroll-pl-6 scroll-ml-6 scrollbar-hidden"
        ref={wrapper}
        onScroll={handleScroll}
      >
        {paintings
          .filter((p) =>
            p.tags?.find(
              (t) => t.value.toLowerCase() === filterTag || filterTag === "all"
            )
          )
          .map((p, i) => (
            <Painting
              paintingData={p}
              filterTag={filterTag}
              index={i}
              key={i}
            />
          ))}
      </div>

      <div
        className={clsx(
          stepRightDisabled && "hidden",
          "absolute top-0 bottom-0 right-0 flex items-center justify-center w-20"
        )}
      >
        <button
          className="p-2 shadow-2xl ring-1 ring-white bg-primary"
          onClick={handleStepRight}
        >
          <BiRightArrowAlt className="text-xl text-white" />
        </button>
      </div>
    </div>
  )
}

Carousel.propTypes = {
  filterTag: PropTypes.string,
  paintings: PropTypes.array,
}

export default Carousel
