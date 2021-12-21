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
            <div className="">
              <h1 className="text-4xl">My Projects</h1>
            </div>
            <p>
              These are some of my various projects that I have been working on, some of them are
              finished, some are not, but most of them has some sort of learning experience to it.
            </p>
            <section className="grid gap-4">
              <article className="relative flex mt-4 overflow-hidden bg-white rounded-lg shadow-lg">
                <div className="p-4">
                  <h2 className="text-xl">
                    <strong>Project Vör / Babel</strong>
                  </h2>
                  <p>
                    Project Babel as it was called during most of it &rsquo;s development, was
                    supposed to be a third person adventure game set in a post-apocalyptic world.
                  </p>
                  {/* <button>Read more</button> */}
                </div>
                <img
                  width={16}
                  height={9}
                  src="https://cdna.artstation.com/p/assets/images/images/013/991/308/large/henrik-sissener-highresscreenshot00034.jpg?1541992611"
                  alt="test"
                  className="w-7/12"
                />
              </article>
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
