import Image from "next/image";
import Link from "next/link";
import PropTypes from "prop-types";
import React from "react";
import clsx from "clsx";
import { motion } from "framer-motion";

import { imageBuilder } from "lib/sanity";

const cardVariants = {
  offscreen: {
    y: 100,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 1,
    },
  },
};

const Painting = function ({ paintingData = {}, index = 0 }) {
  const { _id, image = {}, title = "", tags = [], slug: { current = "" } = {} } = paintingData;

  const salesTagObj = tags?.find((t) => t.value === "Buyable") || {};
  const { value = "" } = salesTagObj;
  const isForSales = value === "Buyable";

  const linkString = `/painting/${current}`;

  // every 4th painting is a break
  const isHighlighted = index % 12 === 4;

  // const imageProps = useNextSanityImage(
  //   configuredSanityClient,
  //   desktopWallpaper[desktopIndex].image,
  //   {
  //     blurUpImageWidth: 124,
  //     blurUpImageQuality: 40,
  //     blurUpAmount: 24,
  //   },
  // );

  // const imageProps = useNextSanityImage(configuredSanityClient, image, {
  //   enableBlurUp: false,
  //   blurUpImageWidth: 124,
  //   blurUpImageQuality: 40,
  //   blurUpAmount: 24,
  // });

  return (
    <motion.article
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.1 }}
      variants={cardVariants}
      className={clsx(
        "relative w-full rounded overflow-hidden focus:outline-none group cursor-pointer focus-within:ring focus-within:ring-highlight focus-within:z-10",
        "col-span-full",
        isHighlighted
          ? "md:col-span-3 lg:col-span-1 xl:col-span-4 lg:row-span-2 xl:row-span-2"
          : "md:col-span-3 lg:col-span-2 xl:col-span-2",
      )}
      key={_id}
    >
      <Link href={linkString} passHref>
        <a>
          <div
            className={clsx(
              "relative w-full",
              "",
              isHighlighted
                ? "h-[520px] md:h-[200px] lg:h-[480px] xl:h-[610px]"
                : "h-[520px] md:h-[200px] lg:h-[240px] xl:h-[300px]",
            )}
          >
            <Image
              // {...imageProps}
              src={imageBuilder(image).width(400).height(600).quality(45).url()}
              layout="fill"
              objectFit="cover"
              alt={`painting: ${_id}`}
              className="object-cover w-full h-full transition-all duration-1000 ease-in-out transform bg-center bg-cover group-hover:scale-110 bg-gray-50 "
            />
          </div>
          <div className="absolute inset-0 w-full h-full">
            <div className="flex items-center justify-center w-full h-full">
              <div className="w-0 h-0 transition-all duration-1000 ease-in-out origin-center bg-black opacity-0 group-hover:h-full group-hover:w-full group-hover:opacity-100 bg-opacity-40 backdrop-blur-sm" />
            </div>
          </div>

          <div className="absolute inset-0 items-center justify-center hidden text-white group-hover:flex">
            <strong>{title}</strong>
          </div>
          {isForSales && (
            <div className="absolute flex items-center p-2 text-xs rounded-sm top-4 left-4 bg-highlight">
              <div className="relative w-2 h-2 mr-2 bg-white rounded-full">
                <span className="absolute inset-0 inline-flex w-full h-full bg-white rounded-full opacity-100 animate-ping"></span>
              </div>
              <strong>For sale</strong>
            </div>
          )}
        </a>
      </Link>
    </motion.article>
  );
};

Painting.propTypes = {
  index: PropTypes.number,
  paintingData: PropTypes.shape({
    _id: PropTypes.any,
    image: PropTypes.object,
    tags: PropTypes.array,
    title: PropTypes.string,
  }),
};

export default Painting;
