import clsx from "clsx"
import { Footer, Main, Meta, Project, ScrollToTopButton } from "components"
import { getAllProjectsAndTags } from "lib/api"
import { iSanityProject } from "lib/models/objects/sanityProject"
import { iSanityTag } from "lib/models/objects/SanityTag"
import React, { useState } from "react"
import painting from "schemas/painting"
import { isEven } from "utils/numbers"

interface PageProps {
  projects: iSanityProject[]
  tags: iSanityTag[]
}

export default function ProjectsPage({ projects = [], tags = [] }: PageProps) {
  const [currentFilter, setCurrentFilter] = useState<string>("all")
  console.log("currentFilter", currentFilter)

  const allTags = [{ name: "all", projectCount: projects.length }, ...tags]
  return (
    <>
      <Meta
        title="Projects"
        description="A collection of Henrik Wilhelm Sissener's previous projects"
      />
      <Main noTopPadding className="min-h-screen py-4 xl:py-10">
        <section className="relative grid h-full max-w-screen-xl grid-cols-12 gap-4 p-4 mx-auto">
          <div className="col-span-full xl:col-span-8">
            <h1 className="text-4xl">My Projects</h1>
            <p>
              Discover a collection of my ongoing and completed projects, each
              with unique learning experiences. Explore my portfolio to see my
              creative journey.
            </p>
          </div>

          {tags.length > 0 && (
            <section className="flex gap-2 overflow-x-scroll xl:flex-wrap col-span-full">
              {allTags
                .sort((a, b) => b.projectCount - a.projectCount)
                .map((filter) => {
                  const { name = "", projectCount = 0 } = filter
                  return (
                    <button
                      key={name}
                      className="px-3 py-2 text-xs text-white uppercase bg-gray-800 rounded-full shrink-0 hover:bg-gray-700"
                      onClick={() => {
                        setCurrentFilter(name)
                      }}
                    >
                      <strong>
                        {name}({projectCount})
                      </strong>
                    </button>
                  )
                })}
            </section>
          )}

          {projects
            .filter((project) => {
              const { tags = [] } = project
              if (currentFilter === "all") {
                return true
              }
              if (tags.find((tag) => tag.name === currentFilter)) {
                return true
              }
              return false
            })
            .map((project, i) => {
              const { _id = "" } = project
              const isLeft = isEven(i)
              return (
                <div className={clsx("col-span-full xl:col-span-6")} key={_id}>
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
  // const data = await getAllProjects()
  const data = await getAllProjectsAndTags()

  if (data.length < 1) {
    return { props: {} }
  }

  const {
    projects = [],
    tags = [],
  }: {
    projects: iSanityProject[]
    tags: iSanityTag[]
  } = data

  const filteredTags = tags.filter((tag) => {
    const { projectCount = 0 } = tag
    if (projectCount < 1) {
      return false
    }
    return true
  })

  return {
    props: {
      projects: projects || [],
      tags: filteredTags || [],
    },
    revalidate: 7200, // 120  min
  }
}
