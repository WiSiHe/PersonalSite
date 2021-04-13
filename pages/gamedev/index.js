import React from "react";
import PropTypes from "prop-types";

import Head from "next/head";

import Navigation from "../../components/Navigation";

import Footer from "../../components/Footer";

export default function GameDevPage() {
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
        <div className="container mx-auto min-h-screen">
          <div className="flex flex-wrap -mx-1 overflow-hidden">
            <div className="py-4">
              <p>Project Vör</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

GameDevPage.propTypes = {
  paintings: PropTypes.array,
};
