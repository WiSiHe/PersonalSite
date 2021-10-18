import React from "react";
import PropTypes from "prop-types";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import Link from "next/link";
import dynamic from "next/dynamic";

import { IoArrowBackSharp } from "react-icons/io5";
import { SiRedbubble } from "react-icons/si";

// Helpers
import generatePaintingJsonLd from "helpers/jsonLdHelpers";

// Components
import Main from "components/Main";
import Meta from "components/Meta";
const SocialLinks = dynamic(() => import("components/SocialLinks"));

// Libs
import { imageBuilder } from "lib/sanity";
import { getAllPaintings, getPainting } from "lib/api";
import Image from "next/image";

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
}) {
  const { current = "" } = slug;

  const uniqueTags = [...new Set(tags)];

  const hasRedBubleLink = redbubbleUrl !== "";
  console.log(image);
  return (
    <>
      <Meta
        title={title}
        description={description}
        image={smallImage}
        jsonLd={generatePaintingJsonLd(painting)}
        url={`https://wisihe.no/painting/${current}`}
      />
      <div className="fixed z-10 transition-all ease-in-out top-4 left-4">
        <Link href="/">
          <a className="flex items-center justify-center p-2 text-2xl transition-all duration-200 ease-in-out bg-white rounded-lg hover:shadow-lg dark:bg-primary dark:text-white ">
            <IoArrowBackSharp />
          </a>
        </Link>
      </div>
      <AnimatePresence>
        <Main noTopPadding>
          <motion.div
            key="painting"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ type: "spring" }}
            className="relative grid w-full min-h-screen lg:grid-cols-12 "
          >
            <div className="relative col-span-12 bg-yellow-800 lg:col-span-9 ">
              <div className="w-full">
                <Image
                  src={xlImage}
                  layout="fill"
                  alt={title}
                  loading="eager"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="top-0 block col-span-12 bg-gray-800 lg:h-screen lg:sticky lg:col-span-3 ">
              <div className="w-full p-4 lg:h-full">
                <h1 className="pb-2 text-4xl">{title}</h1>
                <div className="flex pb-2">
                  {uniqueTags.map((tag, i) => {
                    const { value } = tag;
                    return (
                      <p
                        className="p-2 mr-2 text-xs text-white rounded-lg bg-primary"
                        key={i}
                      >
                        {value}
                      </p>
                    );
                  })}
                </div>
                {description && (
                  <div className="p-4 bg-gray-900 rounded-sm">
                    <p> {description}</p>
                  </div>
                )}

                <a
                  href={hasRedBubleLink ? redbubbleUrl : "#"}
                  rel="noreferrer"
                  target={redbubbleUrl && "_blank"}
                  aria-label="redbubble"
                >
                  <button
                    className={clsx(
                      "flex items-center justify-center w-full p-2 mt-4 border border-none  bg-[#e31421]",
                      hasRedBubleLink
                        ? "hover:opacity-90"
                        : "opacity-40 cursor-not-allowed"
                    )}
                    disabled
                  >
                    <SiRedbubble className="mr-2" />
                    <strong>Redbubble store</strong>
                  </button>
                </a>
              </div>
              <div className="w-full mt-4 lg:absolute bottom-10 ">
                <SocialLinks />
              </div>
            </div>
          </motion.div>
        </Main>
      </AnimatePresence>
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
  } = painting;

  const smallImage = imageBuilder(image).width(120).height(80).url();
  const largeImage = imageBuilder(image).width(1200).url();
  const xlImage = imageBuilder(image).width(2160).url();

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
