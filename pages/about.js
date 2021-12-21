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
            <h1 className="text-4xl">About me</h1>
            <p>
              Short story: I’m a digital artist / web developer / hobby designer who has been
              drawing my whole life. I mostly do character designs, but I try to step into the big
              world of landscape every now and then, I spend my free time making digital paintings
              paintings and do some tinkering with new Frontend technologies.
            </p>
          </section>
        </section>
      </Main>
    </>
  );
}

ProjectsPage.propTypes = {
  paintings: PropTypes.array,
};
