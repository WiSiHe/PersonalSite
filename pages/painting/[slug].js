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
  smImage = "",
  lgImage = "",
  xlImage = "",
  title = "",
  tags = [],
  description = "",
  slug = {},
}) {
  const { current = "" } = slug;

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
        image={smImage}
        jsonLd={generatePaintingJsonLd(painting)}
        url={`https://wisihe.no/painting/${current}`}
      />

      <Main noTopPadding>
        <div className="relative grid w-full h-full md:grid-cols-12">
          <div className="relative min-h-full col-span-12 lg:col-span-9 ">
            <div className="relative h-60v lg:min-h-screen ">
              <animated.div style={props}>
                <Image
                  src={xlImage}
                  placeholder="blur"
                  blurDataURL={smImage}
                  layout="fill"
                  className="object-cover"
                />
              </animated.div>
            </div>
            {/* <animated.div style={props}>
              <div className="relative w-full lg:min-h-screen ">
                <picture>
                  <source media="(min-width:1440px)" srcSet={xlImage} />
                  <source media="(min-width:650px)" srcSet={lgImage} />
                  <source media="(min-width:465px)" srcSet={lgImage} />
                  <img
                    className="object-cover w-full bg-gray-100 bg-cover lg:min-h-screen "
                    src={lgImage}
                    alt={title}
                  />
                </picture>
              </div>
            </animated.div> */}
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

  const smallImage = imageBuilder(image).width(120).height(80).url();
  const largeImage = imageBuilder(image).width(1200).height(800).url();
  const xlImage = imageBuilder(image).width(2160).height(1440).url();

  return {
    props: {
      painting: painting,
      title: title,
      description: description,
      tags: tags,
      image: image,
      smImage: smallImage,
      lgImage: largeImage,
      xlImage: xlImage,
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
