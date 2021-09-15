import clsx from "clsx";
import Image from "next/image";
import PropTypes from "prop-types";
import React from "react";

import ActiveLink from "../ActiveLink/ActiveLink";
import { imageBuilder } from "../../lib/sanity";
import { AnimatePresence, motion } from "framer-motion";

const PaintingGrid = ({ paintings = [], filterTag = "" }) => {
  return (
    <AnimatePresence>
      <ul className="grid grid-cols-3 lg:grid-cols-8 auto-rows-min">
        {paintings
          // .sort((a, b) => a.title.localeCompare(b.title))
          .filter((p) =>
            p.tags?.find((t) => t.value === filterTag || filterTag === "")
          )
          .map((p) => {
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
            // const test = i % 24 === 0;
            return (
              <motion.li
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                // transition={{ type: "spring" }}
                layout
                className={clsx(
                  "relative w-full h-48 xl:h-64 focus:outline-none group focus-within:ring focus-within:ring-highlight focus-within:z-10",
                  !isShow && "opacity-10"
                  // test
                  //   ? "lg:row-span-2 lg:col-span-2 !h-full"
                  //   : "col-span-1 lg:col-span-1"
                )}
                key={_id}
              >
                <ActiveLink href={linkString}>
                  <Image
                    src={imageBuilder(image)
                      .width(300)
                      .height(300)
                      .fit("fill")
                      .quality(75)
                      .url()}
                    layout="fill"
                    objectFit="cover"
                    alt={title}
                    className="object-cover w-full h-full transition-all duration-1000 ease-in-out transform bg-center bg-cover hover:scale-110 "
                  />
                  {title && (
                    <div className="absolute bottom-0 left-0 right-0 p-2 text-white transition-all duration-500 ease-in-out opacity-0 bg-dark bg-opacity-40 font group-hover:opacity-100">
                      <p>{title}</p>
                    </div>
                  )}
                </ActiveLink>
              </motion.li>
            );
          })}
      </ul>
    </AnimatePresence>
  );
};

PaintingGrid.propTypes = {
  display: PropTypes.bool,
  filterTag: PropTypes.string,
  paintings: PropTypes.array,
};

export default PaintingGrid;
