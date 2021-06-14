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
import Footer from "../../components/Footer";
import Meta from "../../components/Meta/Meta";
import generatePaintingJsonLd from "../../helpers/jsonLdHelpers";
import Image from "next/image";
import SocialLinks from "../../components/SocialLinks/SocialLinks";

const placeHolderText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ullamcorper lectus et nunc interdum pulvinar. Integer posuere magna nec risus elementum tristique. ";

export default function Gallery({
  painting = {},
  smallImage = "",
  largeImage = "",
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
        image={smallImage}
        jsonLd={generatePaintingJsonLd(painting)}
        url={`https://wisihe.no/painting/${current}`}
      />

      <Main noTopPadding>
        <div className="grid lg:grid-cols-12">
          <div className="lg:col-span-9">
            <animated.div style={props}>
              <div className="relative w-full lg:min-h-screen ">
                <img
                  className="object-cover w-full bg-gray-100 bg-cover lg:min-h-screen "
                  src={largeImage}
                  alt={title}
                />
              </div>
            </animated.div>
          </div>

          <div className="relative w-full h-full p-4 lg:p-8">
            <div className="lg:fixed top-4 ">
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

              <p>{description ? <>{description}</> : <>{placeHolderText}</>}</p>
              <div className="hidden mt-4 lg:block">
                <SocialLinks alignLeft />
              </div>
            </div>
          </div>
        </div>
        <div className="fixed transition-all ease-in-out bottom-16 lg:top-4 left-4">
          <ActiveLink href="/" shallow>
            <p className="flex items-center justify-center p-2 text-2xl transition-all duration-200 ease-in-out bg-white rounded-lg hover:shadow-lg dark:bg-purple-700 dark:text-white ">
              <IoArrowBackSharp />
            </p>
          </ActiveLink>
        </div>
      </Main>
      <Footer fixed onlyMobile />
    </>
  );
}

Gallery.propTypes = {
  description: PropTypes.string,
  largeImage: PropTypes.string,
  painting: PropTypes.object,
  slug: PropTypes.object,
  smallImage: PropTypes.string,
  tags: PropTypes.array,
  title: PropTypes.string,
};

export async function getStaticProps({ params, preview = false }) {
  const { slug = "" } = params;
  const data = await getPainting(slug, preview);

  if (data.length < 1) {
    return { props: {} };
  }

  const painting = data[0] || {};

  const { image = {}, title = "", tags = [], description = "" } = painting;

  const smallImage = imageBuilder(image).width(50).url();
  const largeImage = imageBuilder(image).width(1200).url();

  return {
    props: {
      painting: painting,
      title: title,
      description: description,
      tags: tags,
      smallImage: smallImage,
      largeImage: largeImage,
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
