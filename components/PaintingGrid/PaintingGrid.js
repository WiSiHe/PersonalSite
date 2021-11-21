import clsx from "clsx";
import Image from "next/image";
import PropTypes from "prop-types";
import React from "react";
import { useRecoilValue } from "recoil";

import ActiveLink from "../ActiveLink/ActiveLink";
import { imageBuilder } from "../../lib/sanity";
import { AnimatePresence, motion } from "framer-motion";

import { gridSize as atomGridSize } from "../../atoms/gridSize";

const PaintingGrid = ({ paintings = [], filterTag = "" }) => {
  const gridSize = useRecoilValue(atomGridSize);

  const list = {
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    hidden: {
      opacity: 0,
      transition: {
        when: "afterChildren",
      },
    },
  };

  const item = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: 50 },
  };

  return (
    <AnimatePresence>
      <motion.ul
        initial="hidden"
        animate="visible"
        variants={list}
        className={clsx(
          "grid lg:grid-cols-8 auto-rows-min items-start",
          gridSize === 3 ? "grid-cols-3" : "grid-cols-1 gap-4"
        )}
      >
        {paintings
          // .sort((a, b) => a.title.localeCompare(b.title))
          .filter((p) =>
            p.tags?.find((t) => t.value === filterTag || filterTag === "")
          )
          .map((p, i) => {
            const {
              _id,
              image = {},
              title = "",
              tags = [],
              slug: { current = "" } = {},
            } = p;

            const isShow =
              tags?.find((t) => t.value === filterTag) || !filterTag;
            const linkString = `/painting/${current}`;
            const test = i % 24 === 0;
            return (
              <motion.li
                // layoutId={_id}
                variants={item}
                className={clsx(
                  "relative w-full xl:h-64 focus:outline-none group focus-within:ring focus-within:ring-highlight focus-within:z-10",
                  gridSize === 3 ? "h-48" : "h-64",
                  !isShow && "opacity-10",
                  test
                    ? "lg:row-span-2 lg:col-span-2 !h-full"
                    : "col-span-1 lg:col-span-1"
                )}
                key={_id}
              >
                <ActiveLink href={linkString}>
                  <Image
                    src={imageBuilder(image)
                      .width(400)
                      .height(400)
                      .fit("fill")
                      .quality(35)
                      .url()}
                    layout="fill"
                    objectFit="cover"
                    alt={`painting: ${_id}`}
                    className="object-cover w-full h-full transition-all duration-1000 ease-in-out transform bg-center bg-cover hover:scale-110 bg-gray-50 "
                  />
                  {title && (
                    <div className="absolute bottom-0 left-0 right-0 p-2 text-white transition-all duration-500 ease-in-out opacity-0 bg-dark bg-opacity-80 font group-hover:opacity-100">
                      <p>{title}</p>
                    </div>
                  )}
                </ActiveLink>
              </motion.li>
            );
          })}
      </motion.ul>
    </AnimatePresence>
  );
};

PaintingGrid.propTypes = {
  display: PropTypes.bool,
  filterTag: PropTypes.string,
  paintings: PropTypes.array,
};

export default PaintingGrid;
