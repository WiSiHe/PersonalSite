import React, { Fragment, useRef } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

const Filters = ({
  filteredTags = [],
  paintingsAmount = 0,
  setFilterTag = () => null,
  activeFilter = "",
}) => {
  const wrapper = useRef();

  function selectFilter(filter) {
    setFilterTag(filter);
  }

  return (
    <>
      <div className="overflow-x-scroll scrollbar-hidden">
        <div ref={wrapper} className="relative flex px-4 py-2 space-x-2 ">
          <button
            onClick={() => selectFilter("")}
            className={clsx(
              "snap-start p-2 text-xs bg-primary cursor-pointer whitespace-nowrap hover:opacity-90 rounded-lg active:bg-highlight focus:outline-none focus:ring focus:ring-highlight",
              activeFilter === "" ? "bg-highlight hover:opacity-60 text-black" : "text-white",
            )}
          >
            <strong>All ({paintingsAmount})</strong>
          </button>
          {filteredTags
            .sort((a, b) => b[1] - a[1])
            .map((tag, i) => {
              const label = tag[0];
              const amount = tag[1];
              const isBuyable = label === "Buyable";

              return (
                <button
                  className={clsx(
                    "relative snap-start transition p-2 text-xs bg-primary whitespace-nowrap hover:opacity-90 rounded-lg active:bg-highlight focus:outline-none focus:ring focus:ring-highlight",
                    isBuyable && "ring ring-highlight",
                    activeFilter.toLowerCase() === label.toLowerCase()
                      ? "bg-highlight hover:bg-highlight text-black"
                      : "text-white ",
                  )}
                  key={i}
                  onClick={() => selectFilter(label.toLowerCase())}
                >
                  <strong>
                    <span className="capitalize">{label}</span> ({amount})
                  </strong>
                  {isBuyable && (
                    <div className="absolute w-4 h-4 rounded-full -right-2 -top-2 text-dark bg-highlight ">
                      <span className="absolute inset-0 inline-flex w-full h-full rounded-full opacity-100 animate-ping bg-highlight"></span>
                      <strong>!</strong>
                    </div>
                  )}
                </button>
              );
            })}
        </div>
      </div>
    </>
  );
};

Filters.propTypes = {
  activeFilter: PropTypes.string,
  filteredTags: PropTypes.array,
  paintingsAmount: PropTypes.number,
  setFilterTag: PropTypes.func,
};

export default Filters;
