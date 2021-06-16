import React from "react";
import PropTypes from "prop-types";

const Filters = ({ filteredTags = [], paintingsAmount = 0, setFilterTag }) => {
  return (
    <div className="flex py-4 overflow-x-auto">
      <p
        onClick={() => setFilterTag("")}
        className="p-2 ml-2 text-xs text-white bg-purple-800 rounded-lg cursor-pointer select-none whitespace-nowrap hover:bg-purple-500"
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
              className="p-2 ml-2 text-xs text-white bg-purple-800 rounded-lg cursor-pointer select-none whitespace-nowrap hover:bg-purple-500"
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
  children: PropTypes.node.isRequired,
  filteredTags: PropTypes.array,
  paintingsAmount: PropTypes.number,
  setFilterTag: PropTypes.func,
};

export default Filters;
