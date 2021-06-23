import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

// import Navigation from "../../components/Navigation";
// import NavigationDrawer from "../../components/NavigationDrawer";
import { getAllPaintings, getPainting } from "../../lib/api";
import { imageBuilder } from "../../lib/sanity";

import { IoArrowBackSharp } from "react-icons/io5";
import ActiveLink from "../../components/ActiveLink/ActiveLink";

import { useSpring, animated } from "react-spring";
import Main from "../../components/Main";

import Meta from "../../components/Meta/Meta";
import generatePaintingJsonLd from "../../helpers/jsonLdHelpers";

import SocialLinks from "../../components/SocialLinks/SocialLinks";
import Image from "next/image";

export default function Gallery({
  painting = {},
  image,
  // smImage = "",
  // lgImage = "",
  // xlImage = "",
  title = "",
  tags = [],
  description = "",
  slug = {},
}) {
  const { current = "" } = slug;

  const smallImage = imageBuilder(image).width(120).height(80).url();
  const largeImage = imageBuilder(image).width(1200).url();
  const xlImage = imageBuilder(image).width(2160).url();

  const [loaded, setLoaded] = useState(false);
  const uniqueTags = [...new Set(tags)];

  const props = useSpring({ opacity: loaded ? 1 : 0 });

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      <Meta
        title={title}
        description={description}
        image={smallImage}
        jsonLd={generatePaintingJsonLd(painting)}
        url={`https://wisihe.no/painting/${current}`}
      />

      <Main noTopPadding>
        <div className="relative grid w-full lg:min-h-screen lg:grid-cols-12 ">
          <div className="relative col-span-12 bg-yellow-800 lg:col-span-9 ">
            <animated.div style={props} className="w-full ">
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
            </animated.div>
          </div>

          <div className="top-0 h-[fit-content] block col-span-12 lg:sticky lg:col-span-3 ">
            <div className="w-full p-4">
              <h1 className="pb-2 text-4xl">{title}</h1>
              <div className="flex pb-2">
                {uniqueTags.map((tag, i) => {
                  const { value } = tag;
                  return (
                    <p
                      className="p-2 mr-2 text-xs text-white bg-purple-800 rounded-lg"
                      key={i}
                    >
                      {value}
                    </p>
                  );
                })}
              </div>
              <div className="p-4 bg-gray-900 rounded-sm">
                {description && <p> {description}</p>}
              </div>
              <div className="mt-4">
                <SocialLinks alignLeft />
              </div>
            </div>
          </div>
        </div>
        <div className="fixed transition-all ease-in-out top-4 left-4">
          <ActiveLink href="/" shallow>
            <p className="flex items-center justify-center p-2 text-2xl transition-all duration-200 ease-in-out bg-white rounded-lg hover:shadow-lg dark:bg-purple-700 dark:text-white ">
              <IoArrowBackSharp />
            </p>
          </ActiveLink>
        </div>
      </Main>
    </>
  );
}

Gallery.propTypes = {
  description: PropTypes.string,
  lgImage: PropTypes.string,
  painting: PropTypes.object,
  slug: PropTypes.object,
  smImage: PropTypes.string,
  tags: PropTypes.array,
  title: PropTypes.string,
  xlImage: PropTypes.string,
};

export async function getStaticProps({ params, preview = false }) {
  const { slug = "" } = params;
  const data = await getPainting(slug, preview);

  if (data.length < 1) {
    return { props: {} };
  }

  const painting = data[0] || {};

  const { image = {}, title = "", tags = [], description = "" } = painting;

  return {
    props: {
      painting: painting,
      title: title,
      description: description,
      tags: tags,
      image: image,
      // smImage: smallImage,
      // lgImage: largeImage,
      // xlImage: xlImage,
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
