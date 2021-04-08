import React from "react";
import PropTypes from "prop-types";

import Head from "next/head";
import Image from "next/image";

import Navigation from "../../components/Navigation";
import { getAllPaintings } from "../../lib/api";
import { imageBuilder } from "../../lib/sanity";
// import Footer from "../../components/Footer";
import ActiveLink from "../../components/ActiveLink/ActiveLink";

export default function Gallery({ paintings = [] }) {
  const mainCss =
    "flex-grow bg-gray-50 dark:bg-gray-800 transition-all duration-1000 ease-in-out mt-16 dark:text-white";

  return (
    <>
      <Head>
        <title>wisihe.no</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
      <main className={mainCss}>
        <div className="flex flex-wrap -mx-1 overflow-hidden">
          {paintings.map((p) => {
            const {
              _id,
              image = {},
              title = "",
              slug: { current = "" } = {},
            } = p;
            const { hotspot = {}, crop = {} } = image;
            console.log("crop", crop);
            console.log("hotspot", hotspot);
            const linkString = `/painting/${current}`;
            return (
              <div
                className="group w-1/2 overflow-hidden lg:w-1/4 xl:w-1/6 h-64 relative"
                key={_id}
              >
                <ActiveLink href={linkString}>
                  <Image
                    src={imageBuilder(image)
                      .width(300)
                      .height(300)
                      .fit("fill")
                      .url()}
                    layout="fill"
                    className="g-cover bg-center w-full h-full object-cover transition-all transform duration-1000 ease-in-out hover:scale-110 "
                  />
                  {/* <img
                    className="g-cover bg-center w-full h-full object-cover transition-all transform duration-1000 ease-in-out hover:scale-110 "
                    src={imageBuilder(p.image).width(400).fit("fill").url()}
                  /> */}
                  {title && (
                    <div className="bg-gray-800 opacity-0 transition-all duration-500 ease-in-out absolute bottom-0 left-0 right-0 bg-opacity-40 font text-white p-2 group-hover:opacity-100">
                      <p>{title}</p>
                    </div>
                  )}
                </ActiveLink>
              </div>
            );
          })}
        </div>
      </main>
      {/* <Footer /> */}
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
