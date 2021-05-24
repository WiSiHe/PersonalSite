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

export default function Home({ paintings = [], tags = [] }) {
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

  const wallpaperPaintings =
    paintings.filter(
      (p) => p.tags?.length > 1 && p.tags.find((t) => t.value === "wallpaper")
    ) || [];

  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  const header = parseInt(getRandomArbitrary(0, wallpaperPaintings.length));

  const headerImage = imageBuilder(wallpaperPaintings[header].image)
    .width(1200)
    .height(800)
    .url();

  let result = {};

  for (var i = 0; i < tagValues.length; ++i) {
    if (!result[tagValues[i]]) result[tagValues[i]] = 0;
    ++result[tagValues[i]];
  }

  const filteredTags = Object.entries(result).filter((w) => w[1] > 10);

  return (
    <>
      <Meta url="https://wisihe.no" />
      {/* <Navigation />
      <NavigationDrawer /> */}

      <Main noTopPadding>
        <section className="relative w-full h-70v md:h-100v ">
          <Image src={headerImage} layout="fill" className="object-cover" />
          <div className="absolute bottom-0 left-0 right-0 flex justify-center ">
            <button onClick={executeScroll}>
              <BsChevronDown className="p-2 text-4xl text-center transition rounded-full animate-bounce hover:bg-white hover:text-black" />
            </button>
          </div>
        </section>
        <div
          className="flex flex-col justify-center py-4 text-center text-white bg-purple-800 dark:bg-gray-800"
          ref={myRef}
        >
          <h1 className="text-4xl">Henrik Wilhelm Sissener</h1>
          <h2 className="text-xl">WiSiHe</h2>
        </div>
        <div className="relative">
          <Filters
            setFilter={setFilterTag}
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
