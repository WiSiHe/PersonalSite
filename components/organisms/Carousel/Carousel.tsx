import clsx from "clsx"
import Painting from "components/molecules/Painting/Painting"
import { iSanityPainting } from "lib/models/objects/sanityPainting"
import React from "react"
import { useRef } from "react"
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi"
import { isNotEmptyArray } from "utils/array"

interface iCarouselProps {
  paintings: iSanityPainting[]
  gradientColor?:
    | "default"
    | "black"
    | "white"
    | "primary"
    | "secondary"
    | "tertiary"
    | "highlight"
  hasGradient?: boolean
}

const Carousel = ({
  paintings = [],
  gradientColor = "default",
  hasGradient = true,
}: iCarouselProps) => {
  const wrapper = useRef<HTMLDivElement>(null)

  const hasPaintings = isNotEmptyArray(paintings)

  // const [stepLeftDisabled, setStepLeftDisabled] = useState(true)

  // const [stepRightDisabled, setStepRightDisabled] = useState(false)

  const handleStepLeft = () => {
    if (!wrapper.current) return

    wrapper.current.scrollTo({
      left:
        wrapper.current.scrollLeft - wrapper.current.children[0].clientWidth,
      behavior: "smooth",
    })
  }

  const handleStepRight = () => {
    if (!wrapper.current) return
    wrapper.current.scrollTo({
      left:
        wrapper.current.scrollLeft + wrapper.current.children[0].clientWidth,
      behavior: "smooth",
    })
  }

  // const handleScroll = (e) => {
  //   setStepLeftDisabled(e.target.scrollLeft === 0)
  //   setStepRightDisabled(
  //     e.target.scrollLeft + e.target.offsetWidth >= e.target.scrollWidth
  //   )
  // }

  const gradientStyle = {
    default: "from-tertiary to-transparent",
    black: "from-black to-transparent",
    white: "from-white to-transparent",
    primary: "from-primary to-transparent",
    secondary: "from-secondary to-transparent",
    tertiary: "from-tertiary to-transparent",
    highlight: "from-highlight to-transparent",
  }

  return (
    <div className="relative h-96">
      <div
        className="relative flex w-full h-full gap-4 px-4 py-2 overflow-x-scroll snap-x scroll-smooth scrollbar-hidden"
        ref={wrapper}
        // onScroll={handleScroll}
      >
        {paintings.map((painting, i) => (
          <div key={i} className="aspect-square snap-center">
            <Painting paintingData={painting} />
          </div>
        ))}
      </div>
      <div
        className={clsx(
          gradientStyle[gradientColor],
          hasGradient
            ? "absolute top-0 bottom-0 right-0 z-20 flex items-center justify-center h-full pointer-events-none bg-gradient-to-l aspect-square"
            : "hidden"
        )}
      />

      <div className="flex justify-end gap-4 p-4">
        <button
          className={clsx(
            "p-2 text-xl text-white drop-shadow ring ring-highlight bg-primary",
            !hasPaintings && "opacity-50 cursor-not-allowed"
          )}
          onClick={handleStepLeft}
          disabled={!hasPaintings}
        >
          <BiLeftArrowAlt />
        </button>
        <button
          className={clsx(
            "p-2 text-xl text-white drop-shadow ring ring-highlight bg-primary",
            !hasPaintings && "opacity-50 cursor-not-allowed"
          )}
          onClick={handleStepRight}
          disabled={!hasPaintings}
        >
          <BiRightArrowAlt />
        </button>
      </div>
    </div>
  )
}

export default Carousel
