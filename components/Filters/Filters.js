import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useRecoilState } from "recoil";

import { BsFilterRight } from "react-icons/bs";
import { BsGrid3X3Gap } from "react-icons/bs";

import Modal from "components/Modal";

import { gridSize as atomGridSize } from "../../atoms/gridSize";

const Filters = ({
  filteredTags = [],
  paintingsAmount = 0,
  setFilterTag,
  activeFilter = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [gridSize, setGridSize] = useRecoilState(atomGridSize);

  function openModal() {
    setIsOpen(true);
  }

  function selectFilter(filter) {
    setIsOpen(false);
    setFilterTag(filter);
  }

  function handleClose() {
    setIsOpen(false);
  }

  function handleGridAdjustment() {
    if (gridSize === 1) {
      setGridSize(3);
    } else {
      setGridSize(1);
    }
  }

  return (
    <>
      <div className="sticky z-20 px-4 py-4 overflow-hidden -top-1 bg-dark bg-opacity-90 backdrop-blur-lg">
        <div className="flex items-center justify-between lg:hidden">
          <button
            className="flex items-center justify-center p-2 transition-all bg-primary hover:opacity-90"
            onClick={openModal}
            type="button"
          >
            <BsFilterRight />
            <span className="ml-1">Filter</span>
          </button>
          <strong>{activeFilter}</strong>
          <button
            className="block p-2 transition-all rounded-full hover:bg-white hover:text-black md:hidden"
            onClick={handleGridAdjustment}
          >
            <BsGrid3X3Gap />
          </button>
        </div>

        <div className="flex-wrap hidden space-x-1 lg:flex">
          <button
            onClick={() => selectFilter("")}
            className={clsx(
              "p-2 text-xs  bg-primary cursor-pointer whitespace-nowrap hover:opacity-90 ",
              activeFilter === ""
                ? "bg-yellow-400 hover:opacity-60 text-black"
                : "text-white"
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
                    "transition p-2 text-xs bg-primary whitespace-nowrap hover:opacity-90",
                    activeFilter === label
                      ? "bg-yellow-400 hover:bg-yellow-200 text-black"
                      : "text-white "
                  )}
                  key={i}
                  onClick={() => selectFilter(label)}
                >
                  <span className="capitalize">{label}</span> ({amount})
                </button>
              );
            })}
        </div>
      </div>
      <Modal isOpen={isOpen} closeModal={() => handleClose()}>
        <div className="flex flex-col flex-wrap ">
          <button
            onClick={() => selectFilter("")}
            className={clsx(
              "p-2 text-xs  bg-primary cursor-pointer whitespace-nowrap hover:opacity-90 ",
              activeFilter === ""
                ? "bg-yellow-400 hover:opacity-60 text-black"
                : " text-white"
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
                    "transition p-2 text-xs text-white bg-primary whitespace-nowrap hover:opacity-90",
                    activeFilter === label &&
                      "bg-yellow-400 hover:bg-yellow-200 text-black"
                  )}
                  key={i}
                  onClick={() => selectFilter(label)}
                >
                  <span className="capitalize">{label}</span> ({amount})
                </button>
              );
            })}
          <button
            className="w-2/4 mx-auto mt-4 border border-black ring"
            onClick={handleClose}
          >
            Close
          </button>
        </div>
      </Modal>
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
