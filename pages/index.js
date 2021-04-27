import React from "react";
import PropTypes from "prop-types";

import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

import Main from "../components/Main";
import Meta from "../components/Meta/Meta";

import { getAllPaintings } from "../lib/api";
import { imageBuilder } from "../lib/sanity";

export default function Home({ paintings = [] }) {
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
    .fit("fill")
    .url();

  return (
    <>
      <Meta url="http://www.wisihe.no" />
      <Navigation />

      <Main>
        <section
          className="container max-w-full  h-screen object-cover  bg-fixed bg-cover flex flex-wrap content-center bg-center  "
          style={{
            backgroundImage: `url(${headerImage})`,
          }}
        />
        <div className="flex justify-center flex-col p-4 text-center">
          <h1 className="text-4xl">Henrik Wilhelm Sissener</h1>
          <h2 className="text-xl">WiSiHe</h2>
        </div>
      </Main>
      <Footer />
    </>
  );
}

Home.propTypes = {
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
