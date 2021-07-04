import clsx from "clsx";
import Image from "next/image";
import PropTypes from "prop-types";
import React from "react";
import { imageBuilder } from "../../lib/sanity";
import ActiveLink from "../ActiveLink/ActiveLink";

const PaintingGrid = ({ paintings = [], filterTag = "" }) => {
  return (
    <div className="grid min-h-screen grid-cols-2 md:grid-cols-4 lg:grid-cols-8 auto-rows-min">
      {paintings
        // .filter((p) => p.tags?.find((t) => t.value === filterTag) || !filterTag)
        .sort((a, b) => a.title.localeCompare(b.title))
        .map((p) => {
          const {
            _id,
            image = {},
            title = "",
            tags = [],
            slug: { current = "" } = {},
          } = p;

          const isShow = tags?.find((t) => t.value === filterTag) || !filterTag;

          const linkString = `/painting/${current}`;
          return (
            <div
              className={clsx(
                "relative w-full h-60 focus:outline-none group transition-all duration-1000",
                !isShow && "opacity-10"
              )}
              key={_id}
            >
              <ActiveLink href={linkString}>
                <Image
                  src={imageBuilder(image)
                    .width(300)
                    .height(300)
                    .fit("fill")
                    .url()}
                  layout="fill"
                  alt={title}
                  className="object-cover w-full h-full transition-all duration-1000 ease-in-out transform bg-center bg-cover hover:scale-110 "
                />
                {title && (
                  <div className="absolute bottom-0 left-0 right-0 p-2 text-white transition-all duration-500 ease-in-out opacity-0 bg-dark bg-opacity-40 font group-hover:opacity-100">
                    <p>{title}</p>
                  </div>
                )}
              </ActiveLink>
            </div>
          );
        })}
    </div>
  );
};

PaintingGrid.propTypes = {
  display: PropTypes.bool,
  filterTag: PropTypes.string,
  paintings: PropTypes.array,
};

export default PaintingGrid;
