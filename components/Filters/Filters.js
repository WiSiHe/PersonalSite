import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

import { BsFilterRight } from "react-icons/bs";

const Filters = ({
  filteredTags = [],
  paintingsAmount = 0,
  setFilterTag,
  activeFilter = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function selectFilter(filter) {
    setIsOpen(false);
    setFilterTag(filter);
  }

  return (
    <>
      <div className="sticky top-0 z-10 flex py-4 overflow-hidden bg-dark bg-opacity-40 backdrop-blur-lg">
        <button
          className="flex items-center justify-center p-2 ml-2 rounded-full bg-primary"
          onClick={openModal}
          type="button"
        >
          <BsFilterRight />
          <span className="ml-1">Filter</span>
        </button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              // transition={{ ease: "easeInOut", duration: 0.2 }}
            >
              <div
                className="fixed inset-0 z-10 bg-black bg-opacity-60"
                onClick={closeModal}
              />
            </motion.div>
            <motion.div
              key="modal"
              initial={{ opacity: 0, bottom: 100 }}
              animate={{ opacity: 1, bottom: 0 }}
              exit={{ opacity: 0, bottom: 100 }}
              transition={{ ease: "easeInOut", duration: 0.2 }}
              className="fixed z-30 overflow-y-auto"
            >
              <div className="fixed bottom-0 left-0 right-0 max-w-full p-4 m-8 mx-auto overflow-hidden align-middle bg-white lg:max-w-4xl rounded-2xl">
                <div className="flex flex-wrap space-x-1 space-y-1">
                  <button
                    onClick={() => selectFilter("")}
                    className={clsx(
                      "p-2 text-xs text-white bg-primary cursor-pointer select-none whitespace-nowrap hover:opacity-60",
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
                            "transition p-2  text-xs text-white bg-primary  select-none whitespace-nowrap hover:opacity-60",
                            activeFilter === label &&
                              "bg-yellow-600 hover:bg-yellow-200 hover:text-black"
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
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 
      <Dialog
        open={isOpen}
        onClose={closeModal}
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
      >
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ ease: "easeInOut", duration: 1 }}
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-60" />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ type: "spring" }}
              key="main"
            >
              <div className="fixed bottom-0 left-0 right-0 max-w-full p-4 m-8 mx-auto overflow-hidden align-middle transition-all transform bg-white lg:max-w-4xl rounded-2xl">
                <Dialog.Title>Deactivate account</Dialog.Title>
                <Dialog.Description>
                  This will permanently deactivate your account
                </Dialog.Description>

                <div className="flex flex-wrap space-x-1 space-y-1">
                  <button
                    onClick={() => selectFilter("")}
                    className={clsx(
                      "p-2 text-xs text-white bg-primary cursor-pointer select-none whitespace-nowrap hover:opacity-60",
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
                            "transition p-2  text-xs text-white bg-primary  select-none whitespace-nowrap hover:opacity-60",
                            activeFilter === label &&
                              "bg-yellow-600 hover:bg-yellow-200 hover:text-black"
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
            </motion.div>
          )}
        </AnimatePresence>
      </Dialog> */}
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
