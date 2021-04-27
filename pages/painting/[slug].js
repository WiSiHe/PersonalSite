import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import Navigation from "../../components/Navigation";
import { getAllPaintings, getPainting } from "../../lib/api";
import { imageBuilder } from "../../lib/sanity";

import { IoArrowBackSharp } from "react-icons/io5";
import ActiveLink from "../../components/ActiveLink/ActiveLink";

import { useSpring, animated } from "react-spring";
import Main from "../../components/Main";
import Footer from "../../components/Footer";
import Meta from "../../components/Meta/Meta";
import generatePaintingJsonLd from "../../helpers/jsonLdHelpers";

const placeHolderText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ullamcorper lectus et nunc interdum pulvinar. Integer posuere magna nec risus elementum tristique. ";

export default function Gallery({ painting = {} }) {
  const {
    image = {},
    title = "",
    tags = [],
    description = "",
    slug = {},
  } = painting;

  const { current = "" } = slug;

  const [loaded, setLoaded] = useState(false);

  const uniqueTags = [...new Set(tags)];

  const props = useSpring({ opacity: loaded ? 1 : 0 });

  const smallImage = imageBuilder(image).width(50).url();

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
        url={`http://www.wisihe.no/painting/${current}`}
      />
      <Navigation />
      <Main>
        <animated.div style={props}>
          <div className=" pb-2 relative min-h-800">
            <img
              className="bg-cover w-full bg-gray-100 "
              src={imageBuilder(image).width(1200).url()}
            />
          </div>

          <div className="container mx-auto pt-8 pb-32 ">
            <div className="p-4 md:p-0">
              <h1 className="text-4xl pb-2">{title}</h1>
              <div className="flex pb-2">
                {uniqueTags.map((tag, i) => {
                  const { value } = tag;
                  return (
                    <p
                      className="p-1 bg-purple-800 mr-2 text-white text-xs"
                      key={i}
                    >
                      {value}
                    </p>
                  );
                })}
              </div>

              <div className="md:w-3/5">
                <p>
                  {description ? <>{description}</> : <>{placeHolderText}</>}
                </p>
              </div>
            </div>
          </div>

          <div className="fixed bottom-16 left-4">
            <ActiveLink href="/paintings" shallow>
              <p className="text-2xl flex justify-center items-center rounded-full shadow bg-white p-4 transition-all duration-100 ease-in-out dark:bg-purple-700 dark:text-white hover:bg-opacity-80">
                <IoArrowBackSharp />
              </p>
            </ActiveLink>
          </div>
        </animated.div>
      </Main>
      <Footer />
    </>
  );
}

Gallery.propTypes = {
  painting: PropTypes.object,
};

export async function getStaticProps({ params, preview = false }) {
  const { slug = "" } = params;
  const data = await getPainting(slug, preview);

  if (data.length < 1) {
    return { props: {} };
  }

  return {
    props: {
      painting: data[0],
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
    fallback: true,
  };
}
