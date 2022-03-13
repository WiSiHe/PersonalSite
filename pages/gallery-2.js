import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import Meta from "components/Meta";
import Main from "components/Main";

import Navigation from "components/Navigation";

import SideMenu from "components/SideMenu";
import NavigationDrawer from "components/NavigationDrawer";

import { getAllTagsAndPaintings } from "../lib/api";
import { motion } from "framer-motion";

import Carousel from "components/Carousel";
import { BiRightArrowAlt } from "react-icons/bi";

const cardVariants = {
  offscreen: {
    y: 100,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 1,
    },
  },
};

export default function Home({ paintings = [], tags = [] }) {
  return (
    <>
      <Meta
        title="Gallery"
        url="https://wisihe.no/gallery-2"
        description="A gallery of some of my paintings"
      />
      <Navigation hideOnDesktop darkMode />
      <NavigationDrawer />
      <Main noTopPadding>
        <section className="relative grid flex-1 flex-grow h-full min-h-screen grid-cols-12">
          <section className="relative hidden h-full col-span-2 bg-stone-100 xl:block">
            <div className="sticky  top-0 w-full h-[fit-content]">
              <SideMenu />
            </div>
          </section>
          <section className="relative col-span-12 xl:col-span-10">
            <div className="p-4 pt-10 xl:items-start ">
              <h1 className="text-4xl">My Gallery</h1>
              <p className="max-w-2xl pt-4">
                My little gallery of digital paintings that I have made over the years. Some of
                these are for sale, if you find one you like, and it&apos;s not for sale, feel free
                to contact me, and I&apos;m sure that I can fix something :)
              </p>
            </div>

            <div className="space-y-4">
              {tags.map((tag) => {
                const tagFilter = tag[0].toLowerCase();
                const tagCount = tag[1];

                return (
                  <div className={clsx("relative ")} key={tagFilter}>
                    <motion.div
                      className="relative "
                      initial="offscreen"
                      whileInView="onscreen"
                      viewport={{ once: true, amount: 0.1 }}
                      variants={cardVariants}
                    >
                      <div className="relative flex items-center justify-between px-4 mb-2">
                        <div className="flex items-center">
                          <h2 className="text-2xl capitalize">
                            <strong>{tagFilter}</strong>
                          </h2>
                          <span className="text-xs">({tagCount})</span>
                        </div>
                      </div>

                      <Carousel paintings={paintings} filterTag={tagFilter} />
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </section>
        </section>
      </Main>
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

  const flattenedTags = data.tags.filter((tag) => tag !== null).flat();

  const tagValues = flattenedTags.map((tag) => tag.label);

  const result = {};

  for (let i = 0; i < tagValues.length; ++i) {
    if (!result[tagValues[i]]) result[tagValues[i]] = 0;
    ++result[tagValues[i]];
  }

  const filteredTags = Object.entries(result).filter((w) => w[1] > 10);

  const salesTagObject = filteredTags.find((t) => t[0] === "Buyable") || {};
  const tags = filteredTags.filter((t) => t[0] !== "Buyable");

  const sortedtags = [salesTagObject, ...tags];

  const paintings = data.paintings;

  const randomPaintings = paintings.sort(() => Math.random() - 0.5);

  return {
    props: {
      paintings: randomPaintings,
      tags: sortedtags,
    },
    revalidate: 7200, // 120  min
  };
}
