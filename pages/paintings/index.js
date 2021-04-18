import React, { useState } from "react";
import PropTypes from "prop-types";

import Head from "next/head";
import Image from "next/image";

import Navigation from "../../components/Navigation";
import { getAllTagsAndPaintings } from "../../lib/api";
import { imageBuilder } from "../../lib/sanity";
import Footer from "../../components/Footer";
import ActiveLink from "../../components/ActiveLink/ActiveLink";

export default function PaintingsPage({ paintings = [], tags = [] }) {
  const [filterTag, setFilterTag] = useState("");
  const flattenedTags = tags.filter((tag) => tag !== null).flat();
  const tagValues = flattenedTags.map((tag) => tag.label);

  let result = {};

  for (var i = 0; i < tagValues.length; ++i) {
    if (!result[tagValues[i]]) result[tagValues[i]] = 0;
    ++result[tagValues[i]];
  }

  const filteredTags = Object.entries(result).filter((w) => w[1] > 10);

  // console.log("result", result);
  // console.log("test", sortable);

  let uniqueItems = [...new Set(tagValues)];

  const mainCss =
    "flex-grow bg-gray-50 dark:bg-gray-800 transition-all duration-1000 ease-in-out mt-16 dark:text-white overflow-hidden min-h-screen";

  return (
    <>
      <Head>
        <title>wisihe.no</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Navigation />
      <main className={mainCss}>
        <div className=" relative">
          <div className="flex py-4 overflow-x-auto">
            <p
              onClick={() => setFilterTag("")}
              className="bg-purple-800 text-white text-xs p-2 whitespace-nowrap ml-2 select-none cursor-pointer hover:bg-purple-500 rounded-lg"
            >
              All
            </p>

            {filteredTags
              .sort((a, b) => b[1] - a[1])
              .map((tag, i) => {
                const label = tag[0];
                console.log("label", label);
                const amount = tag[1];
                return (
                  <p
                    className="bg-purple-800 text-white text-xs p-2 whitespace-nowrap ml-2 select-none cursor-pointer hover:bg-purple-500 rounded-lg"
                    key={i}
                    onClick={() => setFilterTag(label)}
                  >
                    {label} ({amount})
                  </p>
                );
              })}
          </div>
          <div className=" bg-gradient-to-r  to-white  dark:to-black from-transparent absolute right-0 top-0 bottom-0 w-60 pointer-events-none" />
        </div>
        <div className="flex flex-wrap -mx-1 overflow-hidden">
          {paintings
            .filter(
              (p) => p.tags?.find((t) => t.value === filterTag) || !filterTag
            )
            .map((p) => {
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
