import React from "react";
import PropTypes from "prop-types";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import Link from "next/link";
import dynamic from "next/dynamic";
import Image from "next/image";

import { IoArrowBackSharp } from "react-icons/io5";

// Helpers
import generatePaintingJsonLd from "helpers/jsonLdHelpers";

// Components
import Main from "components/Main";
import Meta from "components/Meta";
import RedbubbleLink from "components/RedbubbleLink";
const SocialLinks = dynamic(() => import("components/SocialLinks"));

// Libs
import { imageBuilder } from "lib/sanity";
import { getAllPaintings, getPainting } from "lib/api";
import Footer from "components/Footer";

export default function Gallery({
  painting = {},
  image = {},
  title = "",
  tags = [],
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum facilisis, augue eu mattis ultrices, ipsum metus porttitor turpis, et convallis lorem tortor nec erat.",
  slug = {},
  smallImage,
  largeImage,
  xlImage,
  redbubbleUrl = "",
  id = "",
}) {
  const { current = "" } = slug;

  const uniqueTags = [...new Set(tags)];

  const hasRedBubleLink = redbubbleUrl !== "";

  return (
    <>
      <Meta
        title={title}
        description={description}
        image={smallImage}
        jsonLd={generatePaintingJsonLd(painting)}
        url={`https://wisihe.no/painting/${current}`}
      />

      <Main noTopPadding className="overflow-hidden">
        <motion.div
          className="fixed z-10 top-4 left-4"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ type: "spring", stiffness: 100 }}
          key="backbutton"
        >
          <Link href="/">
            <a className="flex items-center justify-center p-2 text-2xl transition-all duration-200 ease-in-out bg-white rounded-lg hover:shadow-lg dark:bg-primary dark:text-white ">
              <IoArrowBackSharp />
            </a>
          </Link>
        </motion.div>

        <picture className="w-full">
          <source media="(min-width:1280px)" srcset={xlImage} />
          <source media="(min-width:650px)" srcset={largeImage} />
          <source
            media="(min-width:465px)"
            srcset={smallImage}
            className="w-full"
          />
          <motion.img
            layoutId="image"
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            key="image"
            layout
            transition={{
              type: "spring",
              stiffness: 100,
              delay: 0.5,
              bounce: 0.25,
            }}
            src={smallImage}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="relative w-full"
          />
        </picture>

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          key="text-section"
          layout
          className="relative p-6 mb-20 transition-all xl:mb-0 bg-dark xl:right-5 xl:top-5 xl:backdrop-blur-lg xl:rounded-lg xl:fixed xl:shadow-xl xl:max-w-md xl:col-span-3 bg-opacity-60 "
        >
          <h1 className="pb-2 text-4xl">
            <strong>{title}</strong>
          </h1>
          <div className="flex flex-wrap">
            {uniqueTags.map((tag) => {
              const { value } = tag;
              return (
                <p
                  className="p-1 mb-2 mr-2 text-xs text-white bg-primary"
                  key={value}
                >
                  {value}
                </p>
              );
            })}
          </div>
          {description && <p className="py-2 rounded-sm">{description}</p>}

          {hasRedBubleLink && (
            <RedbubbleLink
              hasRedBubleLink={hasRedBubleLink}
              redbubbleUrl={redbubbleUrl}
            />
          )}
        </motion.div>
      </Main>
      <Footer fixed />
    </>
  );
}

Gallery.propTypes = {
  description: PropTypes.string,
  image: PropTypes.object,
  lgImage: PropTypes.string,
  painting: PropTypes.object,
  slug: PropTypes.object,
  smImage: PropTypes.string,
  tags: PropTypes.array,
  title: PropTypes.string,
  xlImage: PropTypes.string,
  redbubbleUrl: PropTypes.string,
};

export async function getStaticProps({ params, preview = false }) {
  const { slug = "" } = params;
  const data = await getPainting(slug, preview);

  if (data.length < 1) {
    return { props: {} };
  }

  const painting = data[0] || {};

  const {
    image = {},
    title = "",
    tags = [],
    description = "",
    redbubbleUrl = "",
    _id = "",
  } = painting;

  const smallImage = imageBuilder(image)
    .width(120)
    .height(80)
    .quality(35)
    .url();
  const largeImage = imageBuilder(image)
    .width(1200)
    .height(1200)
    .quality(35)
    .url();
  const xlImage = imageBuilder(image)
    .width(1660)
    .height(1660)
    .quality(35)
    .url();

  return {
    props: {
      painting: painting,
      title: title,
      description: description,
      tags: tags,
      image: image,
      smallImage,
      largeImage,
      xlImage,
      redbubbleUrl: redbubbleUrl,
      id: _id,
    },
    revalidate: 600, // 10 min
  };
}

export async function getStaticPaths() {
  const allPaintings = await getAllPaintings();

  return {
    paths:
      allPaintings?.map((painting) => ({
        params: {
          painting,
          slug: painting.slug.current,
        },
      })) || [],
    fallback: false,
  };
}
