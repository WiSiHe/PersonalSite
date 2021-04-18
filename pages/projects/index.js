import React from "react";
import PropTypes from "prop-types";

import Head from "next/head";

import Navigation from "../../components/Navigation";

import Footer from "../../components/Footer";
import Main from "../../components/Main";

export default function ProjectsPage() {
  return (
    <>
      <Head>
        <title>wisihe.no</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
      <Main>
        <div className="container mx-auto min-h-screen">
          <div className="mt-20">
            <h1>My Projects</h1>
          </div>
          <div className="p-4 shadow-lg w-8/12 bg-white mt-24">
            <h2>Project vör / Babel</h2>
          </div>
        </div>
      </Main>
      <Footer />
    </>
  );
}

ProjectsPage.propTypes = {
  paintings: PropTypes.array,
};
