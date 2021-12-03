import clsx from "clsx";
import ActiveLink from "components/ActiveLink/ActiveLink";
import { configuredSanityClient } from "helpers/sanityHelpers";
import { imageBuilder } from "lib/sanity";
import { useNextSanityImage } from "next-sanity-image";
import Image from "next/image";
import PropTypes from "prop-types";
import React from "react";

const Painting = ({ paintingData = {}, filterTag, index = 0 }) => {
  const {
    _id,
    image = {},
    title = "",
    tags = [],
    slug: { current = "" } = {},
  } = paintingData;

  const isShow = tags?.find((t) => t.value === filterTag) || !filterTag;
  const linkString = `/painting/${current}`;
  const test = index % 24 === 0;

  const imageProps = useNextSanityImage(configuredSanityClient, image);

  return (
    <article
      className={clsx(
        "relative w-full h-[360px] lg:h-64 focus:outline-none group focus-within:ring focus-within:ring-highlight focus-within:z-10",
        !isShow && "opacity-10",
        test
          ? "lg:row-span-2 lg:col-span-2 !h-full"
          : "col-span-2 md:col-span-1 lg:col-span-1"
      )}
      key={_id}
    >
      <ActiveLink href={linkString}>
        <Image
          {...imageProps}
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
    </article>
  );
};

export default Painting;
