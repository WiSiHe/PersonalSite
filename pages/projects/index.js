import React from "react";
import PropTypes from "prop-types";

import Navigation from "../../components/Navigation";

import Footer from "../../components/Footer";
import Main from "../../components/Main";
import Meta from "../../components/Meta/Meta";
import NavigationDrawer from "../../components/NavigationDrawer";

export default function ProjectsPage() {
  return (
    <>
      <Meta
        title="Projects"
        description="A collection of Henrik Wilhelm Sissener's previous projects"
      />
      <Navigation />
      <NavigationDrawer />
      <Main>
        <div className="p-4 mx-auto min-h-screen">
          <div className="mt-20 text-4xl">
            <h1>My Projects</h1>
          </div>
          <section className=" shadow-lg bg-white dark:bg-gray-900 mt-4 relative md:flex">
            <div className="p-4 ">
              <h2 className=" text-xl">Project Vör</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                ullamcorper lectus et nunc interdum pulvinar. Integer posuere
                magna nec risus elementum tristique.
              </p>
            </div>
            <img
              className="sm: w-full md:w-4/6"
              src="https://cdna.artstation.com/p/assets/images/images/013/991/308/large/henrik-sissener-highresscreenshot00034.jpg?1541992611"
              alt="test"
            />
          </section>
        </div>
      </Main>
      <Footer />
    </>
  );
}

ProjectsPage.propTypes = {
  paintings: PropTypes.array,
};
