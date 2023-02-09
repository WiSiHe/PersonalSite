import { Footer, LogoQR, Main, Meta, Project } from "components"
import hove from "public/images/hove.png"
import night from "public/images/night-forest.jpeg"
import websiteImage from "public/images/wisihesiteTemplate.jpeg"
import React from "react"

export default function ProjectsPage() {
  const websiteTags = ["NextJS 12", "Sanity", "Tailwind 3", "FramerMotion 5"]
  const hoveTags = ["Wordpress", "Html", "Css", "Php", "javascript"]
  const babelTags = [
    "Unreal Engine 4",
    "Blender 2.8",
    "SpeedTree 7",
    "zBrush 2019",
    "Substance Painter",
  ]
  const nokkenTags = [
    "Unreal Engine 5",
    "Blender 3",
    "SpeedTree 8",
    "zBrush 2021",
    "Substance Painter",
  ]

  return (
    <>
      <Meta
        title="Projects"
        description="A collection of Henrik Wilhelm Sissener's previous projects"
      />
      <Main noTopPadding className="py-4 xl:py-10">
        <section className="relative grid gap-4 p-4 h-full max-w-screen-xl mx-auto grid-cols-12">
          <div className="col-span-full xl:col-span-8">
            <h1 className="text-4xl">My Projects</h1>
            <p>
              These are some of my various projects that I have been working on,
              some of them are finished, some are not, but most of them has some
              sort of learning experience to it.
            </p>
          </div>

          <Project
            title="WiSiHe Website"
            image={websiteImage}
            tags={websiteTags}
            status="Ongoing"
            // imageLeft
            className="col-span-full xl:flex-row"
          >
            <p className="text-sm">
              This is/was a very fun project for me, first of all this is
              heavely connected to two of my passions, web development and
              drawing, so in 2021 I got a tattoo that is linked to this domain,
              which will kinda work like my portfolio / business card. so who
              knows what this website will be in a few years. But it what I like
              is that it can be whatever I want it to be.
            </p>
            <div className="flex justify-center py-4">
              <LogoQR height="4.0rem" width="4.0rem" />
            </div>
          </Project>

          <Project
            title="Project Nøkken"
            status="Pre-planning"
            image={night}
            tags={nokkenTags}
            className="col-span-full xl:flex-row"
            // className="xl:col-span-6 xl:flex-row col-span-full"
          >
            <p className="text-sm">
              A small survivor horror game with a Scandinavian setting. it will
              use a procedurally forest, and the player will have to escape the
              monster within the forest. Nøkken will change shapes, and move
              quietly behind trees, tracking the player down, waiting for the
              right moment to paunch.
            </p>
          </Project>
          <Project
            title="Project Babel"
            status="Paused"
            tags={babelTags}
            // imageLeft
            image="https://cdna.artstation.com/p/assets/images/images/008/386/537/large/henrik-sissener-cloud-valley-2.jpg?1512433162"
            className="col-span-full xl:flex-row"
          >
            <p className="text-sm">
              Project Babel as it was called during most of it &rsquo;s
              development, was supposed to be a third person adventure game set
              in a post-apocalyptic world. The project was in development for
              about 2 years, but time constraints and the scope of the project
              prooved too be to massive for a two person team. We were able to
              create 3D spaces, with small gameplay elements here and there,
              following a somewhat stylized approach to the 3D models.
            </p>
          </Project>
          <Project
            title="Hove Music Festival 2019"
            status="Cancelled"
            tags={hoveTags}
            image={hove}
            className="col-span-full xl:flex-row"
          >
            <p className="text-sm">
              Made the website for Hove Music Festival 2019, I got a genereal
              design to work with, and made the rest of the design decicions
              myself. The festival did unfortunately go bankrupt just a few days
              before it was due to go live.
            </p>
          </Project>
        </section>
      </Main>
      <Footer />
    </>
  )
}
