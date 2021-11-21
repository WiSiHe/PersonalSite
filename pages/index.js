import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";
import { BsChevronDown, BsChevronLeft, BsChevronRight } from "react-icons/bs";

import { getAllTagsAndPaintings } from "../lib/api";
import { imageBuilder } from "../lib/sanity";

import useWindowDimensions from "hooks/useWindowDimension";

const Footer = dynamic(() => import("components/Footer"));
const PaintingGrid = dynamic(() => import("components/PaintingGrid"));
const Filters = dynamic(() => import("components/Filters"));

import Meta from "components/Meta";
import Main from "components/Main";

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

export default function Home({
  paintings = [],
  tags = [],
  wallpaperPaintings,
  mobileWallpaper,
  desktopWallpaper,
}) {
  const [filterTag, setFilterTag] = useState("");
  const [desktopIndex, setDesktopIndex] = useState(0);
  console.log("desktopIndex", desktopIndex);
  const [mobileIndex, setMobileIndex] = useState(0);

  const { width, height } = useWindowDimensions();

  const paintingsAmount = paintings.length;

  const myRef = useRef(null);

  const executeScroll = () =>
    myRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });

  const handleGoLeft = () => {
    if (desktopIndex === 0) {
      return setDesktopIndex(desktopWallpaper.length - 1);
    }
    return setDesktopIndex(desktopIndex - 1);
  };

  const handleGoRight = () => {
    if (desktopIndex === desktopWallpaper.length - 1) {
      return setDesktopIndex(0);
    }
    return setDesktopIndex(desktopIndex + 1);
  };

  useEffect(() => {
    setDesktopIndex(parseInt(getRandomArbitrary(0, desktopWallpaper.length)));
  }, []);

  return (
    <>
      <Meta url="https://wisihe.no" />

      <Main noTopPadding>
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: "spring" }}
            key="main"
          >
            <section className="relative h-40v xl:h-100v">
              <Image
                src={imageBuilder(desktopWallpaper[desktopIndex].image)
                  .width(1920)
                  .height(1080)
                  .fit("fill")
                  .quality(75)
                  .url()}
                placeholder="blur"
                blurDataURL={imageBuilder(desktopWallpaper[desktopIndex].image)
                  .width(50)
                  .height(50)
                  .fit("fill")
                  .quality(5)
                  .url()}
                layout="fill"
                // width={16}
                // height={9}
                objectFit="cover"
                className="hidden object-cover w-full h-full transition-all duration-1000 ease-in-out transform bg-center bg-cover md:block bg-gray-50 "
                alt="headerImage"
              />
              <div className="absolute top-0 bottom-0 flex items-center justify-between text-2xl left-5 right-5">
                <button
                  onClick={handleGoLeft}
                  className="rounded-full focus:outline-none focus:ring-2 ring-highlight focus:border-transparent"
                >
                  <BsChevronLeft
                    aria-label="Left"
                    className="p-2 text-4xl text-center text-black transition-all bg-white rounded-full "
                  />
                </button>
                <button
                  onClick={handleGoRight}
                  className="rounded-full focus:outline-none focus:ring-2 ring-highlight focus:border-transparent"
                >
                  <BsChevronRight
                    aria-label="Right"
                    className="p-2 text-4xl text-center text-black transition bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  />
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 justify-center hidden xl:flex ">
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
        </AnimatePresence>
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
  wallpaperPaintings: PropTypes.any,
};

export async function getStaticProps({ preview = false }) {
  const data = await getAllTagsAndPaintings(preview);

  if (data.length < 1) {
    return { props: {} };
  }

  const wallpaperPaintings =
    data.paintings.filter(
      (p) => p.tags?.length > 1 && p.tags.find((t) => t.value === "wallpaper")
    ) || [];

  const mobileWallpaper =
    wallpaperPaintings.filter((w) => w.aspectRatio === "9:16") || [];
  const desktopWallpaper =
    wallpaperPaintings.filter((w) => w.aspectRatio === "16:9") || [];

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
      mobileWallpaper: mobileWallpaper,
      desktopWallpaper: desktopWallpaper,
      tags: filteredTags,
    },
    revalidate: 600, // 10 min
  };
}
