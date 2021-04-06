import React from "react";
import PropTypes from "prop-types";

import Head from "next/head";
import Navigation from "../components/Navigation";

import { getAllPaintings } from "../lib/api";
import { imageBuilder } from "../lib/sanity";

export default function Home({ paintings = [] }) {
  const mainCss =
    "flex-grow bg-gray-50 dark:bg-gray-800 transition-all duration-1000 ease-in-out";

  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  const header = parseInt(getRandomArbitrary(0, paintings.length));

  const headerImage = imageBuilder(paintings[header].image)
    .width(1200)
    .fit("scale")
    .url();

  return (
    <>
      <Head>
        <title>wisihe.no</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />

      <main className={mainCss}>
        <section
          className="container max-w-full  h-screen object-cover  bg-fixed bg-cover flex flex-wrap content-center bg-center  "
          style={{
            backgroundImage: `url(${headerImage})`,
          }}
        />
      </main>
      {/* <Footer /> */}
    </>
  );
}

Home.propTypes = {
  paintings: PropTypes.array,
};

export async function getStaticProps({ preview = false }) {
  const data = await getAllPaintings(preview);

  if (data.length < 1) {
    return { props: {} };
  }

  return {
    props: {
      paintings: data,
    },
    revalidate: 600, // 10 min
  };
}
