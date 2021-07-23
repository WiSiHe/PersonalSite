import React, { useRef, useState } from "react";
import PropTypes from "prop-types";

// import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

import Main from "../components/Main";
import Meta from "../components/Meta/Meta";

import { getAllTagsAndPaintings } from "../lib/api";
import { imageBuilder } from "../lib/sanity";
import Image from "next/image";
// import NavigationDrawer from "../components/NavigationDrawer";
import Filters from "../components/Filters";
import PaintingGrid from "../components/PaintingGrid/PaintingGrid";

import { BsChevronDown } from "react-icons/bs";

export default function Home({
  paintings = [],
  tags = [],

  headerImage,
  thumbnailImage,
}) {
  const [filterTag, setFilterTag] = useState("");
  const flattenedTags = tags.filter((tag) => tag !== null).flat();
  const tagValues = flattenedTags.map((tag) => tag.label);
  const paintingsAmount = paintings.length;

  const myRef = useRef(null);
  const executeScroll = () =>
    myRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });

  let result = {};

  for (var i = 0; i < tagValues.length; ++i) {
    if (!result[tagValues[i]]) result[tagValues[i]] = 0;
    ++result[tagValues[i]];
  }

  const filteredTags = Object.entries(result).filter((w) => w[1] > 10);

  return (
    <>
      <Meta url="https://wisihe.no" />

      <Main noTopPadding>
        <section className="relative w-full h-40v lg:h-screen">
          <Image
            src={headerImage}
            placeholder="blur"
            blurDataURL={thumbnailImage}
            layout="fill"
            className="object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 flex justify-center ">
            <button onClick={executeScroll}>
              <BsChevronDown className="p-1 text-3xl text-center text-white transition rounded-full hover:text-black hover:bg-white animate-bounce" />
            </button>
          </div>
        </section>
        <div
          className="flex flex-col justify-center p-4 text-center bg-dark "
          ref={myRef}
        >
          <h1 className="text-4xl font-playfair">Henrik Wilhelm Sissener</h1>
          <h2 className="text-xl font-roboto">WiSiHe</h2>
        </div>
        <div className="relative ">
          <Filters
            activeFilter={filterTag}
            setFilterTag={setFilterTag}
            paintingsAmount={paintingsAmount}
            filteredTags={filteredTags}
          />
        </div>
        <PaintingGrid paintings={paintings} filterTag={filterTag} />
      </Main>
      <Footer />
    </>
  );
}

Home.propTypes = {
  headerImage: PropTypes.any,
  paintings: PropTypes.array,
  tags: PropTypes.array,
  thumbnailImage: PropTypes.any,
  wallpaperPaintings: PropTypes.shape({
    length: PropTypes.any,
  }),
};

export async function getStaticProps({ preview = false }) {
  const data = await getAllTagsAndPaintings(preview);

  if (data.length < 1) {
    return { props: {} };
  }

  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  const wallpaperPaintings =
    data.paintings.filter(
      (p) => p.tags?.length > 1 && p.tags.find((t) => t.value === "wallpaper")
    ) || [];

  const header = parseInt(getRandomArbitrary(0, wallpaperPaintings.length));

  const headerImage = imageBuilder(wallpaperPaintings[header].image)
    .width(1920)
    .height(1080)
    .fit("fill")
    .quality(75)
    .url();
  const thumbnailImage = imageBuilder(wallpaperPaintings[header].image)
    .width(640)
    .height(360)
    .fit("fill")
    .quality(75)
    .url();

  return {
    props: {
      paintings: data.paintings,
      wallpaperPaintings: wallpaperPaintings,
      tags: data.tags,
      headerImage: headerImage,
      thumbnailImage: thumbnailImage,
    },
    revalidate: 600, // 10 min
  };
}
