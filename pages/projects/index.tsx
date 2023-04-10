import clsx from "clsx"
import Chip from "components/atoms/Chip/Chip"
import Main from "components/atoms/Main/Main"
import Meta from "components/atoms/Meta/Meta"
import ScrollToTopButton from "components/atoms/ScrollToTopButton/ScrollToTopButton"
import Project from "components/molecules/Project/Project"
import { getAllProjectsAndTags } from "lib/api"
import { iSanityProject } from "lib/models/objects/sanityProject"
import { iSanityProjectTag } from "lib/models/objects/SanityTag"
import React, { useState } from "react"

interface PageProps {
  projects: iSanityProject[]
  tags: iSanityProjectTag[]
}

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
      <Main className="min-h-screen mx-auto max-w-screen-2xl">
        <section className="relative grid h-full grid-cols-12 gap-4 p-4">
          <div className="col-span-full xl:col-span-8">
            <h1>My Projects</h1>
            <p>
              Discover a collection of my ongoing and completed projects, each
              with unique learning experiences.
            </p>
          </div>

          {tags.length > 0 && (
            <section className="flex gap-1 overflow-x-scroll xl:flex-wrap col-span-full">
              {allTags
                .sort((a, b) => b.projectCount - a.projectCount)
                .map((filter) => {
                  const { name = "", projectCount = 0 } = filter

                  const isSelected = name === currentFilter
                  return (
                    <button
                      key={name}
                      onClick={() => {
                        setCurrentFilter(name)
                      }}
                    >
                      <Chip hasStatus={isSelected ? "selected" : "notSelected"}>
                        {name}({projectCount})
                      </Chip>
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
            .map((project) => {
              const { _id = "" } = project

              return (
                <div
                  className={clsx(
                    "col-span-full xl:col-span-4 overflow-clip rounded-lg h-full"
                  )}
                  key={_id}
                >
                  <Project {...project} />
                </div>
              )
            })}
        </section>
        <ScrollToTopButton />
      </Main>
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
    tags: iSanityProjectTag[]
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
