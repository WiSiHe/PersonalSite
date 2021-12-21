/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';

import Navigation from '../components/Navigation';

import Main from '../components/Main';
import Meta from '../components/Meta/Meta';
import NavigationDrawer from '../components/NavigationDrawer';

import SideMenu from 'components/SideMenu';

export default function ProjectsPage() {
  return (
    <>
      <Meta
        title="Projects"
        description="A collection of Henrik Wilhelm Sissener's previous projects"
      />

      <Navigation hideOnDesktop />
      <NavigationDrawer />
      <Main noTopPadding>
        <section className="relative grid h-screen grid-cols-12">
          <section className="sticky hidden col-span-2 bg-stone-100 xl:block">
            <SideMenu />
          </section>
          <section className="relative col-span-12 p-4 xl:col-span-10">
            <div className="mt-20 text-4xl">
              <h1>My Projects</h1>
            </div>
            <section className="relative mt-4 bg-white shadow-lg dark:bg-gray-900 md:flex">
              <div className="p-4 ">
                <h2 className="text-xl ">Project Vör</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ullamcorper lectus
                  et nunc interdum pulvinar. Integer posuere magna nec risus elementum tristique.
                </p>
              </div>
              <img
                width={16}
                height={9}
                src="https://cdna.artstation.com/p/assets/images/images/013/991/308/large/henrik-sissener-highresscreenshot00034.jpg?1541992611"
                alt="test"
                className="w-8/12"
              />
            </section>
          </section>
        </section>
      </Main>
    </>
  );
}

ProjectsPage.propTypes = {
  paintings: PropTypes.array,
};
