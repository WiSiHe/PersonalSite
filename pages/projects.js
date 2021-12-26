/* eslint-disable @next/next/no-img-element */
import React from 'react';

import Image from 'next/image';

import Navigation from '../components/Navigation';

import Main from '../components/Main';
import Meta from '../components/Meta/Meta';
import NavigationDrawer from '../components/NavigationDrawer';

import SideMenu from 'components/SideMenu';
import Link from 'next/link';

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
        <div className="relative grid min-h-screen grid-cols-12">
          <section className="sticky hidden col-span-2 bg-stone-100 xl:block">
            <SideMenu />
          </section>
          <section className="relative p-4 col-col-span-12 xl:col-span-10">
            <h1 className="text-4xl">My Projects</h1>
            <p>
              These are some of my various projects that I have been working on, some of them are
              finished, some are not, but most of them has some sort of learning experience to it.
            </p>
            <div>
              <article className="relative overflow-hidden bg-white rounded-lg shadow-lg col-span-full h-96">
                <div className="flex flex-col justify-between order-2 p-4 xl:order-1">
                  <div>
                    <h2 className="text-xl">
                      <strong>Project Vör / Babel</strong>
                    </h2>
                    <strong>
                      Status: <span>Paused</span>
                    </strong>
                    <ul className="flex flex-wrap text-xs">
                      <li className="p-1 mb-2 mr-2 bg-primary text-bright">Unreal Engine 4</li>
                      <li className="p-1 mb-2 mr-2 bg-primary text-bright">Blender 2.8</li>
                      <li className="p-1 mb-2 mr-2 bg-primary text-bright">SpeedTree 7</li>
                      <li className="p-1 mb-2 mr-2 bg-primary text-bright">zBrush 2019</li>
                      <li className="p-1 mb-2 mr-2 bg-primary text-bright">Substance Painter</li>
                    </ul>
                    <p>
                      Project Babel as it was called during most of it &rsquo;s development, was
                      supposed to be a third person adventure game set in a post-apocalyptic world.
                    </p>
                    <p>
                      The project was underdevelopment for about 2 years, and we managed to craete
                      some really cool stuff! Or atleast I think so :P
                    </p>
                  </div>
                  <div className="mt-4">
                    <Link href="/" passHref>
                      <a className="px-4 py-2 rounded-lg bg-primary text-bright">Read more</a>
                    </Link>
                  </div>
                </div>
                <div className="relative order-1 w-full h-32 xl:order-2 bg-primary">
                  <Image
                    layout="fill"
                    src="https://cdna.artstation.com/p/assets/images/images/013/991/308/large/henrik-sissener-highresscreenshot00034.jpg?1541992611"
                    alt="test"
                    className="object-cover"
                  />
                </div>
              </article>
            </div>
          </section>
        </div>
      </Main>
    </>
  );
}
