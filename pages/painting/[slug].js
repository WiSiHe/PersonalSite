import React from "react";
import PropTypes from "prop-types";

import Head from "next/head";
import Navigation from "../../components/Navigation";
import { getAllPaintings, getPainting } from "../../lib/api";
import { imageBuilder } from "../../lib/sanity";

import { IoArrowBackSharp } from "react-icons/io5";
import ActiveLink from "../../components/ActiveLink/ActiveLink";

export default function Gallery({ painting = {} }) {
  const { image = {}, title = "" } = painting;

  const mainCss =
    "flex-grow bg-gray-50 dark:bg-gray-800 transition-all duration-1000 ease-in-out mt-16 min-h-screen ";

  return (
    <>
      <Head>
        <title>wisihe.no</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
      <main className={mainCss}>
        <div className="container mx-auto pt-8">
          <div className="fixed bottom-4 left-4">
            <ActiveLink href="/gallery" shallow>
              <p className="text-2xl flex justify-center align-center rounded-full shadow bg-white p-2">
                <IoArrowBackSharp />
              </p>
            </ActiveLink>
          </div>
          <div className="flex justify-center">
            <h1 className="text-4xl">{title}</h1>
          </div>
          <div className="pt-8 pb-8">
            <img className="bg-cover w-full " src={imageBuilder(image).url()} />
          </div>
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
