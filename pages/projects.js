/* eslint-disable @next/next/no-img-element */
import React from 'react';

import Image from 'next/image';

import Navigation from '../components/Navigation';

import Main from '../components/Main';
import Meta from '../components/Meta/Meta';
import NavigationDrawer from '../components/NavigationDrawer';

import SideMenu from 'components/SideMenu';

import websiteImage from 'public/images/wisihesiteTemplate.jpeg';
import websiteQR from 'public/images/wisihe.png';
import night from 'public/images/night-forest.jpeg';
import Tag from 'components/Tag';

export default function ProjectsPage() {
  return (
    <>
      <Meta
        title="Projects"
        description="A collection of Henrik Wilhelm Sissener's previous projects"
      />

      <Navigation hideOnDesktop darkMode />
      <NavigationDrawer />
      <Main noTopPadding>
        <section className="relative grid flex-1 flex-grow h-full min-h-screen grid-cols-12">
          <section className="sticky hidden col-span-2 bg-stone-100 xl:block">
            <div className="sticky top-0 w-full h-[fit-content]">
              <SideMenu />
            </div>
          </section>
          <section className="relative col-span-12 p-4 pt-10 xl:col-span-10">
            <h1 className="text-4xl">My Projects</h1>
            <p className="max-w-2xl pt-4">
              These are some of my various projects that I have been working on, some of them are
              finished, some are not, but most of them has some sort of learning experience to it.
            </p>
            <div className="relative grid grid-cols-8 gap-10 py-10">
              <article className="relative flex flex-col overflow-hidden bg-white rounded-lg shadow-xl xl:col-span-6 xl:flex-row col-span-full xl:h-96">
                <div className="flex flex-col justify-between order-2 p-4 xl:order-1">
                  <div>
                    <h2 className="text-xl">
                      <strong>WiSiHe website</strong>
                    </h2>
                    <strong>
                      Status: <span className="text-primary">Ongoing</span>
                    </strong>
                    <ul className="flex flex-wrap mt-2 text-xs">
                      <li className="mb-2 mr-2 rounded-lg bg-primary text-bright">
                        <Tag>NextJS 12</Tag>
                      </li>
                      <li className="mb-2 mr-2 rounded-lg bg-primary text-bright">
                        <Tag>Sanity</Tag>
                      </li>
                      <li className="mb-2 mr-2 rounded-lg bg-primary text-bright">
                        <Tag>Tailwind 3</Tag>
                      </li>
                      <li className="mb-2 mr-2 rounded-lg bg-primary text-bright">
                        <Tag>FramerMotion 5</Tag>
                      </li>
                    </ul>
                    <p className="max-w-6xl pb-2 text-sm">
                      This is/was a very fun project for me, first of all this is heavely connected
                      to two of my passions, web development and drawing, so in 2021 I got a tattoo
                      that is linked to this domain, which will kinda work like my portfolio /
                      business card. so who knows what this website will be in a few years. But it
                      what I like is that it can be whatever I want it to be.
                    </p>
                    <Image src={websiteQR} alt="qr" width={75} height={75} />
                  </div>
                </div>
                {/* Use template with mac image here later */}
                <div className="relative order-1 w-full h-96 xl:h-full xl:order-2 bg-primary">
                  <Image src={websiteImage} alt="test" className="object-cover" layout="fill" />
                </div>
              </article>
              <article className="relative flex flex-col overflow-hidden bg-white rounded-lg shadow-xl xl:col-start-3 xl:col-span-6 xl:flex-row col-span-full xl:h-96">
                <div className="flex flex-col justify-between order-2 p-4">
                  <div>
                    <h2 className="text-xl">
                      <strong>Project Vör / Babel</strong>
                    </h2>
                    <strong>
                      Status: <span className="text-primary">Paused</span>
                    </strong>
                    <ul className="flex flex-wrap mt-2 text-xs">
                      <li className="mb-2 mr-2 rounded-lg bg-primary text-bright">
                        <Tag>Unreal Engine 4</Tag>
                      </li>
                      <li className="mb-2 mr-2 rounded-lg bg-primary text-bright">
                        <Tag>Blender 2.8</Tag>
                      </li>
                      <li className="mb-2 mr-2 rounded-lg bg-primary text-bright">
                        <Tag>SpeedTree 7</Tag>
                      </li>
                      <li className="mb-2 mr-2 rounded-lg bg-primary text-bright">
                        <Tag>zBrush 2019</Tag>
                      </li>
                      <li className="mb-2 mr-2 rounded-lg bg-primary text-bright">
                        <Tag>Substance Painter</Tag>
                      </li>
                    </ul>
                    <p className="max-w-6xl text-sm">
                      Project Babel as it was called during most of it &rsquo;s development, was
                      supposed to be a third person adventure game set in a post-apocalyptic world.
                      The project was in development for about 2 years, but time constraints and the
                      scope of the project prooved too be to massive for a two person team. We were
                      able to create 3D spaces, with small gameplay elements here and there,
                      following a somewhat stylized approach to the 3D models.
                    </p>
                  </div>
                  {/* link to filter in gallery */}
                  {/* <div><button>Check out some of the images for this projects</button></div> */}
                </div>
                <div className="relative order-1 w-full h-96 xl:h-full bg-primary">
                  <Image
                    layout="fill"
                    src="https://cdna.artstation.com/p/assets/images/images/013/991/308/large/henrik-sissener-highresscreenshot00034.jpg?1541992611"
                    alt="babel example image"
                    className="object-cover"
                  />
                </div>
              </article>
              <article className="relative flex flex-col overflow-hidden bg-white rounded-lg shadow-xl xl:col-span-6 xl:flex-row col-span-full xl:h-96">
                <div className="flex flex-col justify-between order-2 p-4 xl:order-1">
                  <div>
                    <h2 className="text-xl">
                      <strong>Nøkken</strong>
                    </h2>
                    <strong>
                      Status: <span className="text-primary">Planning</span>
                    </strong>
                    <ul className="flex flex-wrap mt-2 text-xs">
                      <li className="mb-2 mr-2 rounded-lg bg-primary text-bright">
                        <Tag>Unreal Engine 5</Tag>
                      </li>
                      <li className="mb-2 mr-2 rounded-lg bg-primary text-bright">
                        <Tag>Blender 3</Tag>
                      </li>
                      <li className="mb-2 mr-2 rounded-lg bg-primary text-bright">
                        <Tag>SpeedTree 8</Tag>
                      </li>
                      <li className="mb-2 mr-2 rounded-lg bg-primary text-bright">
                        <Tag>zBrush 2021</Tag>
                      </li>
                      <li className="mb-2 mr-2 rounded-lg bg-primary text-bright">
                        <Tag>Substance Painter</Tag>
                      </li>
                    </ul>
                    <p className="max-w-6xl pb-2 text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse odio
                      tellus, faucibus at arcu porta, ultricies egestas turpis. In laoreet est ut
                      velit rhoncus hendrerit. Vivamus nec faucibus felis, vel ultrices nulla.
                      Pellentesque felis velit, tristique ut venenatis non, efficitur et mi.
                    </p>
                  </div>
                </div>
                {/* Use template with mac image here later */}
                <div className="relative order-1 w-full h-96 xl:h-full xl:order-2 bg-primary">
                  <Image src={night} alt="test" className="object-cover" layout="fill" />
                </div>
              </article>
            </div>
          </section>
        </section>
      </Main>
    </>
  );
}
