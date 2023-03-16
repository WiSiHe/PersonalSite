import clsx from "clsx"
import { Footer, Main, Meta, Project, ScrollToTopButton } from "components"
import { getAllProjectsAndTags } from "lib/api"
import { iSanityProject } from "lib/models/objects/sanityProject"
import { iSanityTag } from "lib/models/objects/SanityTag"
import React, { useState } from "react"
import { isEven } from "utils/numbers"

interface PageProps {
  projects: iSanityProject[]
  tags: iSanityTag[]
}

// const projectStatus = [
//   "completed",
//   "ongoing",
//   "planned",
//   "abandoned",
//   "inProgress",
//   "onHold",
//   "paused",
// ]

export default function ProjectsPage({ projects = [], tags = [] }: PageProps) {
  const [currentFilter, setCurrentFilter] = useState<string>("all")
  // const [currentStatusFilter, setCurrentStatusFilter] = useState<string>("all")

  const allTags = [{ name: "all", projectCount: projects.length }, ...tags]
  return (
    <>
      <Meta
        title="Projects"
        description="A collection of Henrik Wilhelm Sissener's previous projects"
      />
      <Main className="min-h-screen">
        <section className="relative grid h-full max-w-screen-xl grid-cols-12 gap-4 p-4 mx-auto">
          <div className="col-span-full xl:col-span-8">
            <h1>My Projects</h1>
            <p>
              Discover a collection of my ongoing and completed projects, each
              with unique learning experiences. Explore my portfolio to see my
              creative journey.
            </p>
          </div>

          {/* {projectStatus.length > 0 && (
            <section className="flex gap-1 col-span-full">
              {projectStatus.map((status) => {
                return (
                  <button
                    key={status}
                    className="px-3 py-2 text-xs text-white uppercase rounded-full bg-dark hover:bg-gray-700"
                    onClick={() => setCurrentStatusFilter(status)}
                  >
                    <strong>{status}</strong>
                  </button>
                )
              })}
            </section>
          )} */}

          {tags.length > 0 && (
            <section className="flex gap-1 overflow-x-scroll xl:flex-wrap col-span-full">
              {allTags
                .sort((a, b) => b.projectCount - a.projectCount)
                .map((filter) => {
                  const { name = "", projectCount = 0 } = filter
                  return (
                    <button
                      key={name}
                      className="px-3 py-2 text-xs text-white uppercase rounded-full bg-dark shrink-0 hover:bg-gray-700"
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
            // .filter((project) => {
            //   const { status = "" } = project
            //   if (currentStatusFilter === "all") {
            //     return true
            //   }
            //   if (status === currentStatusFilter) {
            //     return true
            //   }
            //   return false
            // })
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
