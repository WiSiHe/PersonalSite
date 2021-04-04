import React from "react";
import PropTypes from "prop-types";

import Head from "next/head";
import Navigation from "../../components/Navigation";
import { getAllPaintings } from "../../lib/api";
import { imageBuilder } from "../../lib/sanity";
import Footer from "../../components/Footer";

export default function Gallery({ paintings = [] }) {
  const mainCss =
    "flex-grow bg-gray-50 dark:bg-gray-800 transition-all duration-1000 ease-in-out mt-16 h-screen";

  return (
    <>
      <Head>
        <title>wisihe.no</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
      <main className={mainCss}>
        <div className="container mx-auto pt-16">
          <div className="flex flex-wrap -mx-1 overflow-hidden">
            {paintings.map((p) => {
              const { _id } = p;
              return (
                <div
                  className="my-1 px-1 w-1/2 overflow-hidden lg:w-1/4 xl:w-1/6 h-64"
                  key={_id}
                >
                  <img
                    className="g-cover bg-center w-full h-full object-cover transition-all"
                    src={imageBuilder(p.image).width(400).fit("fill").url()}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

Gallery.propTypes = {
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
