import clsx from "clsx"
import { Footer, Main, Meta, Project, ScrollToTopButton } from "components"
import { getAllProjects } from "lib/api"
import { iSanityProject } from "lib/models/objects/sanityProject"
import React from "react"
import { isEven } from "utils/numbers"

interface PageProps {
  projects: iSanityProject[]
}

export default function ProjectsPage({ projects = [] }: PageProps) {
  return (
    <>
      <Meta
        title="Projects"
        description="A collection of Henrik Wilhelm Sissener's previous projects"
      />
      <Main noTopPadding className="py-4 xl:py-10">
        <section className="relative grid h-full max-w-screen-xl grid-cols-12 gap-4 p-4 mx-auto xl:gap-10">
          <div className="col-span-full xl:col-span-8">
            <h1 className="text-4xl">My Projects</h1>
            <p>
              These are some of my various projects that I have been working on,
              some of them are finished, some are not, but most of them has some
              sort of learning experience to it.
            </p>
          </div>
          {projects.map((project, i) => {
            const { _id = "" } = project
            const isLeft = isEven(i)
            return (
              <div className={clsx("col-span-full")} key={_id}>
                <Project {...project} imageLeft={isLeft} />
              </div>
            )
          })}
        </section>
        <ScrollToTopButton />
      </Main>
      <Footer />
    </>
  )
}

export async function getStaticProps() {
  const data = await getAllProjects()

  if (data.length < 1) {
    return { props: {} }
  }

  return {
    props: {
      projects: data || [],
    },
    revalidate: 7200, // 120  min
  }
}
