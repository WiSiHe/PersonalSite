import React from "react";
import PropTypes from "prop-types";

import Head from "next/head";

import Navigation from "../../components/Navigation";
import { getAllPaintings, getPainting } from "../../lib/api";
import { imageBuilder } from "../../lib/sanity";

import { IoArrowBackSharp } from "react-icons/io5";
import ActiveLink from "../../components/ActiveLink/ActiveLink";

const placeHolderText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ullamcorper lectus et nunc interdum pulvinar. Integer posuere magna nec risus elementum tristique. ";

export default function Gallery({ painting = {} }) {
  const { image = {}, title = "", tags = [], description = "" } = painting;

  const uniqueTags = [...new Set(tags)];

  const mainCss =
    "flex-grow bg-gray-50 dark:bg-gray-800 transition-all duration-1000 ease-in-out mt-16 min-h-screen dark:text-white";

  return (
    <>
      <Head>
        <title>wisihe.no</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
      <main className={mainCss}>
        <div className=" pb-2 relative">
          <img
            className="bg-cover w-full bg-gray-100 "
            src={imageBuilder(image).width(1200).url()}
          />
        </div>
        <div className="container mx-auto pt-8 pb-32">
          <div className="p-4 md:p-0">
            <h1 className="text-4xl pb-2">{title}</h1>
            <div className="flex pb-2">
              {uniqueTags.map((tag, i) => {
                const { value } = tag;
                return (
                  <p
                    className="p-1 bg-purple-700 mr-2 text-white text-xs"
                    key={i}
                  >
                    {value}
                  </p>
                );
              })}
            </div>
            <div className="md:w-3/5">
              <p>{description ? <>{description}</> : <>{placeHolderText}</>}</p>
            </div>
          </div>
        </div>

        <div className="fixed bottom-4 left-4">
          <ActiveLink href="/gallery" shallow>
            <p className="text-2xl flex justify-center items-center rounded-full shadow bg-white p-2 dark:bg-purple-700 dark:text-white">
              <IoArrowBackSharp /> Back
            </p>
          </ActiveLink>
        </div>
      </main>
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
