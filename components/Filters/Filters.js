import React from "react";
import PropTypes from "prop-types";

const Filters = ({ filteredTags, paintingsAmount, setFilterTag }) => {
  return (
    <div className="flex py-4 overflow-x-auto">
      <p
        onClick={() => setFilterTag("")}
        className="bg-purple-800 text-white text-xs p-2 whitespace-nowrap ml-2 select-none cursor-pointer hover:bg-purple-500 rounded-lg"
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
              className="bg-purple-800 text-white text-xs p-2 whitespace-nowrap ml-2 select-none cursor-pointer hover:bg-purple-500 rounded-lg"
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
};

export default Filters;
