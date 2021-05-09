import React, { useState } from "react";
import PropTypes from "prop-types";

import Image from "next/image";

import Navigation from "../../components/Navigation";
import { getAllTagsAndPaintings } from "../../lib/api";
import { imageBuilder } from "../../lib/sanity";
import Footer from "../../components/Footer";
import ActiveLink from "../../components/ActiveLink/ActiveLink";
import Main from "../../components/Main";
import Meta from "../../components/Meta/Meta";

import NavigationDrawer from "../../components/NavigationDrawer";
import Filters from "../../components/Filters";

export default function PaintingsPage({ paintings = [], tags = [] }) {
  const [filterTag, setFilterTag] = useState("");
  const flattenedTags = tags.filter((tag) => tag !== null).flat();
  const tagValues = flattenedTags.map((tag) => tag.label);
  const paintingsAmount = paintings.length;

  let result = {};

  for (var i = 0; i < tagValues.length; ++i) {
    if (!result[tagValues[i]]) result[tagValues[i]] = 0;
    ++result[tagValues[i]];
  }

  const filteredTags = Object.entries(result).filter((w) => w[1] > 10);

  // let uniqueItems = [...new Set(tagValues)];

  return (
    <>
      <Meta
        title="Paintings"
        description="A collection of all of Henrik Wilhelm Sissener's digital drawings"
        url={`https://wisihe.no/paintings`}
      />
      <Navigation />
      <NavigationDrawer />

      <Main>
        <div className="relative">
          <Filters
            setFilter={setFilterTag}
            paintingsAmount={paintingsAmount}
            filteredTags={filteredTags}
          />
          {/* <div className=" bg-gradient-to-r  to-white  dark:to-black from-transparent absolute right-0 top-0 bottom-0 w-60 pointer-events-none" /> */}
        </div>
        <div className="p-4 ">
          <h1 className="text-4xl">Paintings</h1>
          <p>
            Hi! This is a collection of my various digital paintings that I've
            made over the years.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 xl:grid-cols-12 auto-rows-auto">
          {paintings
            .filter(
              (p) => p.tags?.find((t) => t.value === filterTag) || !filterTag
            )
            .map((p, i) => {
              const {
                _id,
                image = {},
                title = "",
                slug: { current = "" } = {},
              } = p;

              const linkString = `/painting/${current}`;
              return (
                <div
                  className="w-full h-40 md:h-40 lg:h-32 relative focus:outline-none group "
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
                      alt={title}
                      className="bg-cover bg-center w-full h-full object-cover transition-all transform duration-1000 ease-in-out hover:scale-110 "
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
      </Main>
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
