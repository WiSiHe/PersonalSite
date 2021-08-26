import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

// import { MdChevronRight, MdChevronLeft } from "react-icons/md";

const Filters = ({
  filteredTags = [],
  paintingsAmount = 0,
  setFilterTag,
  activeFilter = "",
}) => {
  // const [currentPosition, setCurrentPosition] = useState(0);

  // const [largeViewPort, setLargeViewPort] = useState(false);
  // const [maxScrollRight, setMaxScrollRight] = useState(false);

  // const element = useRef(null);

  // useEffect(() => {
  //   if (!filteredTags.length > 0) return;
  //   const currentElement = element.current;

  //   if (element) {
  //     const scrollWidth = currentElement?.scrollWidth || 0;
  //     const offsetWidth = currentElement?.offsetWidth || 0;
  //     if (scrollWidth === offsetWidth) {
  //       setLargeViewPort(true);
  //     }
  //   }
  // }, []);

  // const scrollRightDirection = () => {
  //   if (!filteredTags.length > 0) return;
  //   const currentElement = element.current;

  //   if (element) {
  //     const scrollWidth = currentElement?.scrollWidth || 0;
  //     const offsetWidth = currentElement?.offsetWidth || 0;
  //     if (scrollWidth === offsetWidth) {
  //       setLargeViewPort(true);
  //     }
  //     const scrollLeft = currentElement.scrollLeft;

  //     const scrollLength = scrollLeft + offsetWidth;
  //     setCurrentPosition(scrollLeft);
  //     if (scrollLeft >= scrollWidth - offsetWidth) {
  //       setMaxScrollRight(true);
  //     }

  //     currentElement.scrollTo({
  //       left: scrollLength,
  //       behavior: "smooth",
  //     });
  //   }
  // };

  // const scrollLeftDirection = () => {
  //   if (!filteredTags.length > 0) return;
  //   const currentElement = element.current;

  //   if (element) {
  //     const scrollWidth = currentElement?.scrollWidth || 0;
  //     const offsetWidth = currentElement?.offsetWidth || 0;
  //     if (scrollWidth === offsetWidth) {
  //       setLargeViewPort(true);
  //     }
  //     const scrollLeft = currentElement.scrollLeft;
  //     const scrollLength = scrollLeft - offsetWidth;

  //     if (scrollLeft <= scrollWidth - offsetWidth) {
  //       setMaxScrollRight(false);
  //     }

  //     setCurrentPosition(scrollLeft);

  //     currentElement.scrollTo({
  //       left: scrollLength,
  //       behavior: "smooth",
  //     });
  //   }
  // };

  return (
    <div className="relative flex">
      {/* {currentPosition > 0 && !largeViewPort && (
        <div className="absolute top-0 bottom-0 left-0 z-10 flex items-center justify-start w-32 bg-gradient-to-r from-black">
          <button
            onClick={() => scrollLeftDirection()}
            className="ml-2 text-3xl "
          >
            <MdChevronLeft />
          </button>
        </div>
      )} */}
      <div
        className={clsx(
          "flex py-2 overflow-x-auto scrollbar-hidden"
          // maxScrollRight && "mr-0"
        )}
        // ref={element}
      >
        <button
          onClick={() => setFilterTag("")}
          className={clsx(
            "px-2 py-1 ml-2 text-xs text-white bg-primary cursor-pointer select-none whitespace-nowrap hover:opacity-60",
            activeFilter === "" &&
              "bg-yellow-600 hover:opacity-60 hover:text-black"
          )}
        >
          All ({paintingsAmount})
        </button>

        {filteredTags
          .sort((a, b) => b[1] - a[1])
          .map((tag, i) => {
            const label = tag[0];
            const amount = tag[1];
            return (
              <button
                className={clsx(
                  "transition px-2 py-1 ml-2 text-xs text-white bg-primary  select-none whitespace-nowrap hover:opacity-60",
                  activeFilter === label &&
                    "bg-yellow-600 hover:bg-yellow-200 hover:text-black"
                )}
                key={i}
                onClick={() => setFilterTag(label)}
              >
                <span className="capitalize">{label}</span> ({amount})
              </button>
            );
          })}
      </div>
      {/* {!maxScrollRight && !largeViewPort && (
        <div className="absolute top-0 bottom-0 right-0 flex items-center justify-end w-32 bg-gradient-to-l from-black">
          <button
            onClick={() => scrollRightDirection()}
            className="mr-2 text-3xl "
          >
            <MdChevronRight />
          </button>
        </div>
      )} */}
    </div>
  );
};

Filters.propTypes = {
  activeFilter: PropTypes.string,
  filteredTags: PropTypes.array,
  paintingsAmount: PropTypes.number,
  setFilterTag: PropTypes.func,
};

export default Filters;
