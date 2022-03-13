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

const Painting = function ({ paintingData = {} }) {
  const { _id, image = {}, title = "", tags = [], slug: { current = "" } = {} } = paintingData;

  const salesTagObj = tags?.find((t) => t.value === "Buyable") || {};
  const { value = "" } = salesTagObj;
  const isForSales = value === "Buyable";

  const linkString = `/painting/${current}`;

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
  const paintingImage = imageBuilder(image).width(400).height(400).quality(45).url();

  return (
    <article
      className="relative flex items-center justify-center flex-shrink-0 h-full overflow-hidden transition-all duration-1000 ease-in-out rounded w-80 group scroll-ml-6 snap-start bg-stone-600 lg:w-96 "
      // key={i}
    >
      <Link href={linkString} passHref>
        <a>
          <Image
            src={paintingImage}
            layout="fill"
            objectFit="cover"
            alt={`painting: ${_id}`}
            className="object-cover w-full h-full transition-all duration-1000 ease-in-out transform bg-center bg-cover group-hover:scale-110 bg-gray-50 "
          />

          <motion.div className="absolute inset-0 items-center justify-center hidden text-white bg-black bg-opacity-50 group-hover:flex">
            <strong>{title}</strong>
          </motion.div>

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
    </article>
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
