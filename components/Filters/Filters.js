import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

const Filters = ({
  filteredTags = [],
  paintingsAmount = 0,
  setFilterTag,
  activeFilter = "",
}) => {
  return (
    <div className="flex py-2 overflow-x-auto">
      <p
        onClick={() => setFilterTag("")}
        className={clsx(
          "p-2 ml-2 text-xs text-white bg-primary rounded-lg cursor-pointer select-none whitespace-nowrap hover:bg-primary",
          activeFilter === "" &&
            "bg-yellow-600 hover:bg-yellow-200 hover:text-black"
        )}
      >
        All ({paintingsAmount})
      </p>

      {filteredTags
        .sort((a, b) => b[1] - a[1])
        .map((tag, i) => {
          const label = tag[0];
          const amount = tag[1];
          return (
            <p
              className={clsx(
                "transition p-2 ml-2 text-xs text-white bg-primary rounded-lg cursor-pointer select-none whitespace-nowrap hover:bg-purple-500",
                activeFilter === label &&
                  "bg-yellow-600 hover:bg-yellow-200 hover:text-black"
              )}
              key={i}
              onClick={() => setFilterTag(label)}
            >
              {label} ({amount})
            </p>
          );
        })}
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
