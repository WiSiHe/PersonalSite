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
            className="grid min-h-screen lg:grid-cols-12 "
          >
            <section className="relative min-h-[60vh] bg-yellow-800 col-span-full lg:col-span-9 ">
              <Image
                src={xlImage}
                blurDataURL={smallImage}
                placeholder="blur"
                alt={title}
                layout="fill"
                objectFit="cover"
                className="object-cover w-full h-full transition-all duration-1000 ease-in-out transform bg-center bg-cover bg-gray-50 "
              />
            </section>

            <section className="relative bg-gray-800 col-span-full lg:col-span-3 ">
              <div className="w-full p-4 ">
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

                <p className="p-4 bg-gray-900 rounded-sm">{description}</p>

                <RedbubbleLink
                  hasRedBubleLink={hasRedBubleLink}
                  redbubbleUrl={redbubbleUrl}
                />
              </div>
              <div className="w-full mt-4 lg:absolute bottom-10 ">
                <SocialLinks />
              </div>
            </section>
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
