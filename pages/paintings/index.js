import React from "react";
import PropTypes from "prop-types";

import Head from "next/head";
import Image from "next/image";

import Navigation from "../../components/Navigation";
import { getAllTagsAndPaintings } from "../../lib/api";
import { imageBuilder } from "../../lib/sanity";
import Footer from "../../components/Footer";
import ActiveLink from "../../components/ActiveLink/ActiveLink";

export default function PaintingsPage({ paintings = [], tags = [] }) {
  const filteredTags = tags.filter((tag) => tag !== null).flat();
  const tagValues = filteredTags.map((tag) => tag.label);

  let result = {};

  for (var i = 0; i < tagValues.length; ++i) {
    if (!result[tagValues[i]]) result[tagValues[i]] = 0;
    ++result[tagValues[i]];
  }

  // const sortable = Object.entries(result).sort((a, b) => console.log(a));
  // console.log("result", result);
  // console.log("test", sortable);

  let uniqueItems = [...new Set(tagValues)];

  const mainCss =
    "flex-grow bg-gray-50 dark:bg-gray-800 transition-all duration-1000 ease-in-out mt-16 dark:text-white overflow-hidden";

  return (
    <>
      <Head>
        <title>wisihe.no</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Navigation />
      <main className={mainCss}>
        <div className="flex py-4">
          {uniqueItems.map((tag, i) => {
            return (
              <p
                className="bg-purple-800 text-white text-xs px-2 py-1  whitespace-nowrap ml-2 select-none cursor-pointer hover:bg-purple-500 rounded-lg"
                key={i}
              >
                {tag}
              </p>
            );
          })}
        </div>
        <div className="flex flex-wrap -mx-1 overflow-hidden">
          {paintings.map((p) => {
            const {
              _id,
              image = {},
              title = "",
              slug: { current = "" } = {},
            } = p;

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
                    alt="title"
                    className="g-cover bg-center w-full h-full object-cover transition-all transform duration-1000 ease-in-out hover:scale-110 "
                  />
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
      <Footer />
    </>
  );
}

PaintingsPage.propTypes = {
  paintings: PropTypes.array,
  tags: PropTypes.array,
};

export async function getStaticProps({ preview = false }) {
  const data = await getAllTagsAndPaintings(preview);

  if (data.length < 1) {
    return { props: {} };
  }

  return {
    props: {
      paintings: data.paintings,
      tags: data.tags,
    },
    revalidate: 600, // 10 min
  };
}
