import React from "react";
import PropTypes from "prop-types";

import Head from "next/head";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

import { getData } from "../services/sanity/sanity";
import { urlFor } from "../services/sanity/sanityClient";
import { getAllPaintings } from "../lib/api";
import { imageBuilder } from "../lib/sanity";

export default function Home({ paintings = [] }) {
  const mainCss =
    "flex-grow bg-gray-50 dark:bg-gray-800 transition-all duration-1000 ease-in-out";

  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  const header = parseInt(getRandomArbitrary(0, paintings.length));
  const small = parseInt(getRandomArbitrary(0, paintings.length));

  const headerImage = imageBuilder(paintings[header].image).fit("scale").url();

  const smallImage = imageBuilder(paintings[small].image).fit("scale").url();
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
        <div className="container mx-auto">
          <div className="block sm:flex">
            <div className="p-6 w-full lg:w-4/12">
              <h1 className="text-gray-900 dark:text-white">
                Dark mode is here!
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                in augue arcu. Proin mollis, quam tincidunt dictum molestie,
                lorem augue facilisis justo, sed luctus orci massa at urna.
              </p>
              <div className="my-5">
                <button
                  type="button"
                  className="focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-blue-500 hover:bg-blue-600 hover:shadow-lg"
                >
                  Button Name
                </button>
              </div>
            </div>
            <div className="sm:w-8/12 ">
              <picture>
                <source srcSet={smallImage} media="(min-width: 400px)" />
                <img
                  className="p-6 bg-cover bg-center w-full h-full object-cover transition-all"
                  src={smallImage}
                />
              </picture>
            </div>
          </div>
        </div>
      </main>
      <Footer />
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
