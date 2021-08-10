import React from "react";
import PropTypes from "prop-types";

import { IoArrowBackSharp } from "react-icons/io5";
import { SiRedbubble } from "react-icons/si";

import { getAllPaintings, getPainting } from "../../lib/api";
import { imageBuilder } from "../../lib/sanity";

import ActiveLink from "../../components/ActiveLink/ActiveLink";

import Main from "../../components/Main";

import Meta from "../../components/Meta/Meta";
import generatePaintingJsonLd from "../../helpers/jsonLdHelpers";

import SocialLinks from "../../components/SocialLinks/SocialLinks";
import { AnimatePresence, motion } from "framer-motion";

export default function Gallery({
  painting = {},
  image = {},
  title = "",
  tags = [],
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum facilisis, augue eu mattis ultrices, ipsum metus porttitor turpis, et convallis lorem tortor nec erat.",
  slug = {},
  redbubbleUrl = "",
}) {
  const { current = "" } = slug;

  const smallImage = imageBuilder(image).width(120).height(80).url();
  const largeImage = imageBuilder(image).width(1200).url();
  const xlImage = imageBuilder(image).width(2160).url();

  const uniqueTags = [...new Set(tags)];

  return (
    <>
      <Meta
        title={title}
        description={description}
        image={smallImage}
        jsonLd={generatePaintingJsonLd(painting)}
        url={`https://wisihe.no/painting/${current}`}
      />
      <AnimatePresence>
        <Main noTopPadding>
          <motion.div
            key="painting"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ type: "spring" }}
            className="relative grid w-full lg:min-h-screen lg:grid-cols-12 "
          >
            <div className="relative col-span-12 bg-yellow-800 lg:col-span-9 ">
              <div className="w-full ">
                <picture>
                  <source media="(min-width:1440px)" srcSet={xlImage} />
                  <source media="(min-width:650px)" srcSet={largeImage} />
                  <source media="(min-width:465px)" srcSet={largeImage} />
                  <img
                    className="object-cover w-full bg-gray-100 bg-cover lg:min-h-screen"
                    src={xlImage}
                    alt={title}
                  />
                </picture>
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
                {redbubbleUrl && (
                  <a
                    href={redbubbleUrl}
                    rel="noreferrer"
                    target="_blank"
                    aria-label="redbubble"
                  >
                    <button className="flex items-center justify-center w-full p-2 mt-4 bg-[#e31421] border border-none hover:opacity-90">
                      <SiRedbubble className="mr-2" />
                      <strong>Redbubble store</strong>
                    </button>
                  </a>
                )}
              </div>
              <div className="w-full mt-4 lg:absolute bottom-10 ">
                <SocialLinks />
              </div>
            </div>
          </motion.div>
          <div className="fixed transition-all ease-in-out top-4 left-4">
            <ActiveLink href="/" shallow>
              <p className="flex items-center justify-center p-2 text-2xl transition-all duration-200 ease-in-out bg-white rounded-lg hover:shadow-lg dark:bg-primary dark:text-white ">
                <IoArrowBackSharp />
              </p>
            </ActiveLink>
          </div>
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

  return {
    props: {
      painting: painting,
      title: title,
      description: description,
      tags: tags,
      image: image,
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
