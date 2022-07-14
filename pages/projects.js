import React from "react"
import { AnimatePresence } from "framer-motion"

import Image from "next/image"

import Navigation from "../components/Navigation"

import Main from "../components/Main"
import Meta from "../components/Meta/Meta"
import NavigationDrawer from "../components/NavigationDrawer"
import Project from "components/Project"
import Footer from "components/Footer"

import websiteImage from "public/images/wisihesiteTemplate.jpeg"
import websiteQR from "public/images/wisihe.png"
import night from "public/images/night-forest.jpeg"
import hove from "public/images/hove.png"

export default function ProjectsPage() {
  const websiteTags = ["NextJS 12", "Sanity", "Tailwind 3", "FramerMotion 5"]
  const hoveTags = ["Wordpress", "Html", "Css", "Php", "javascript"]
  const babelTags = [
    "Unreal Engine 4",
    "Blender 2.8",
    "SpeedTree 7",
    "zBrush 2019",
    "Substance Painter"
  ]
  const nokkenTags = [
    "Unreal Engine 5",
    "Blender 3",
    "SpeedTree 8",
    "zBrush 2021",
    "Substance Painter"
  ]

  return (
    <>
      <Meta
        title="Projects"
        description="A collection of Henrik Wilhelm Sissener's previous projects"
      />

      <Navigation />
      <NavigationDrawer />
      <Main noTopPadding>
        <section className="relative grid flex-1 flex-grow h-full min-h-screen grid-cols-12">
          {/* <section className="sticky hidden col-span-2 bg-stone-100 xl:block">
            <div className="sticky top-0 w-full h-[fit-content]">
              <SideMenu />
            </div>
          </section> */}
          <section className="relative p-4 pt-10 col-span-full">
            <h1 className="text-4xl">My Projects</h1>
            <p className="max-w-2xl pt-4">
              These are some of my various projects that I have been working on, some of them are
              finished, some are not, but most of them has some sort of learning experience to it.
            </p>

            <div className="relative grid grid-cols-8 gap-10 py-10 xl:gap-16">
              <Project
                title="WiSiHe Website"
                image={websiteImage}
                tags={websiteTags}
                status="Ongoing"
                // imageLeft
                className="xl:col-span-6 xl:flex-row col-span-full">
                <p className="pb-2 text-sm">
                  This is/was a very fun project for me, first of all this is heavely connected to
                  two of my passions, web development and drawing, so in 2021 I got a tattoo that is
                  linked to this domain, which will kinda work like my portfolio / business card. so
                  who knows what this website will be in a few years. But it what I like is that it
                  can be whatever I want it to be.
                </p>
                <Image src={websiteQR} alt="qr" width={75} height={75} />
              </Project>

              <Project
                title="Project Nøkken"
                status="Pre-planning"
                image={night}
                tags={nokkenTags}
                className="xl:col-start-3 xl:col-span-6 xl:flex-row col-span-full"
                // className="xl:col-span-6 xl:flex-row col-span-full"
              >
                <p className="pb-2 text-sm">
                  A small survivor horror game with a Scandinavian setting. it will use a
                  procedurally forest, and the player will have to escape the monster within the
                  forest. Nøkken will change shapes, and move quietly behind trees, tracking the
                  player down, waiting for the right moment to paunch.
                </p>
              </Project>
              <Project
                title="Project Babel"
                status="Paused"
                tags={babelTags}
                // imageLeft
                image="https://cdna.artstation.com/p/assets/images/images/008/386/537/large/henrik-sissener-cloud-valley-2.jpg?1512433162"
                className="xl:col-span-6 xl:flex-row col-span-full">
                <p className="max-w-6xl text-sm">
                  Project Babel as it was called during most of it &rsquo;s development, was
                  supposed to be a third person adventure game set in a post-apocalyptic world. The
                  project was in development for about 2 years, but time constraints and the scope
                  of the project prooved too be to massive for a two person team. We were able to
                  create 3D spaces, with small gameplay elements here and there, following a
                  somewhat stylized approach to the 3D models.
                </p>
                {/* <Link>See more</Link> */}
              </Project>
              <Project
                title="Hove Music Festival 2019"
                status="Cancelled"
                tags={hoveTags}
                image={hove}
                className="xl:col-start-3 xl:col-span-6 xl:flex-row col-span-full"
                // className="xl:col-span-6 xl:flex-row col-span-full"
              >
                <p className="text-sm">
                  Made the website for Hove Music Festival 2019, I got a genereal design to work
                  with, and made the rest of the design decicions myself. The festival did
                  unfortunately go bankrupt just a few days before it was due to go live.
                </p>
              </Project>
            </div>
          </section>
        </section>
      </Main>
      <Footer />
    </>
  )
}
