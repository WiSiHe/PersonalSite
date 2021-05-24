import Image from "next/image";
import PropTypes from "prop-types";
import React from "react";
import { imageBuilder } from "../../lib/sanity";
import ActiveLink from "../ActiveLink/ActiveLink";

const PaintingGrid = ({ paintings = [], filterTag = "" }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 xl:grid-cols-12 auto-rows-auto">
      {paintings
        .filter((p) => p.tags?.find((t) => t.value === filterTag) || !filterTag)
        .map((p, i) => {
          const {
            _id,
            image = {},
            title = "",
            slug: { current = "" } = {},
          } = p;

          const linkString = `/painting/${current}`;
          return (
            <div
              className="relative w-full h-40 md:h-40 lg:h-32 focus:outline-none group "
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
                  <div className="absolute bottom-0 left-0 right-0 p-2 text-white transition-all duration-500 ease-in-out bg-gray-800 opacity-0 bg-opacity-40 font group-hover:opacity-100">
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
};

export default PaintingGrid;
