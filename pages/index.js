import React, { useRef, useState } from "react";
import PropTypes from "prop-types";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";
import { BsChevronDown } from "react-icons/bs";

import { getAllTagsAndPaintings } from "../lib/api";
import { imageBuilder } from "../lib/sanity";

const Footer = dynamic(() => import("components/Footer"));
const PaintingGrid = dynamic(() => import("components/PaintingGrid"));
const Filters = dynamic(() => import("components/Filters"));

import Meta from "components/Meta";
import Main from "components/Main";

export default function Home({
  paintings = [],
  tags = [],
  wallpaperPaintings,
  header,
}) {
  const [filterTag, setFilterTag] = useState("");

  const paintingsAmount = paintings.length;

  const myRef = useRef(null);

  const executeScroll = () =>
    myRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });

  return (
    <>
      <Meta url="https://wisihe.no" />
      <AnimatePresence>
        <Main noTopPadding>
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: "spring" }}
            key="main"
          >
            <section className="relative block h-50v md:h-100v">
              <Image
                src={imageBuilder(wallpaperPaintings[header].image)
                  .width(1920)
                  .height(1080)
                  .fit("fill")
                  .quality(75)
                  .url()}
                placeholder="blur"
                blurDataURL={imageBuilder(wallpaperPaintings[header].image)
                  .width(50)
                  .height(50)
                  .fit("fill")
                  .quality(5)
                  .url()}
                layout="fill"
                objectFit="cover"
                className="object-cover w-full h-full transition-all duration-1000 ease-in-out transform bg-center bg-cover bg-gray-50 "
                alt="headerImage"
              />
              <div className="absolute bottom-0 left-0 right-0 flex justify-center ">
                <button onClick={executeScroll} aria-label="Scroll">
                  <BsChevronDown className="p-1 text-3xl text-center text-black transition bg-white rounded-full animate-bounce focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" />
                </button>
              </div>
            </section>
            <div
              className="flex flex-col justify-center p-4 text-center bg-dark "
              ref={myRef}
            >
              <h1 className="text-4xl font-playfair">
                Henrik Wilhelm Sissener
              </h1>
              <h2 className="text-xl font-roboto">WiSiHe</h2>
            </div>

            <Filters
              activeFilter={filterTag}
              setFilterTag={setFilterTag}
              paintingsAmount={paintingsAmount}
              filteredTags={tags}
            />
            <PaintingGrid paintings={paintings} filterTag={filterTag} />
          </motion.div>
        </Main>
      </AnimatePresence>
      <Footer />
    </>
  );
}

Home.propTypes = {
  headerImage: PropTypes.any,
  paintings: PropTypes.array,
  tags: PropTypes.array,
  thumbnailImage: PropTypes.any,
  wallpaperPaintings: PropTypes.any,
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

  const flattenedTags = data.tags.filter((tag) => tag !== null).flat();
  const tagValues = flattenedTags.map((tag) => tag.label);

  let result = {};

  for (var i = 0; i < tagValues.length; ++i) {
    if (!result[tagValues[i]]) result[tagValues[i]] = 0;
    ++result[tagValues[i]];
  }

  const filteredTags = Object.entries(result).filter((w) => w[1] > 10);

  return {
    props: {
      paintings: data.paintings,
      wallpaperPaintings: wallpaperPaintings,
      tags: filteredTags,
      header: header,
    },
    revalidate: 600, // 10 min
  };
}
