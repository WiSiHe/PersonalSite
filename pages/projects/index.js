import React from "react";
import PropTypes from "prop-types";

import Navigation from "../../components/Navigation";

import Footer from "../../components/Footer";
import Main from "../../components/Main";
import Meta from "../../components/Meta/Meta";

export default function ProjectsPage() {
  return (
    <>
      <Meta
        title="Projects"
        description="A collection of Henrik Wilhelm Sissener's previous projects"
      />
      <Navigation />
      <Main>
        <div className="container mx-auto min-h-screen">
          <div className="mt-20 text-4xl">
            <h1>My Projects</h1>
          </div>
          <div className=" shadow-lg  bg-white mt-4 relative md:flex">
            <div className="p-4">
              <h2 className=" text-xl">Project vör / Babel</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                ullamcorper lectus et nunc interdum pulvinar. Integer posuere
                magna nec risus elementum tristique.
              </p>
            </div>
            <img
              className="sm: w-full md:w-4/6"
              src="https://cdna.artstation.com/p/assets/images/images/013/991/308/large/henrik-sissener-highresscreenshot00034.jpg?1541992611"
            />
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
