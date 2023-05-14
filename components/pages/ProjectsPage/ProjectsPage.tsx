"use client"
import clsx from "clsx"
import Chip from "components/atoms/Chip/Chip"
import Main from "components/atoms/Main/Main"
import ScrollToTopButton from "components/atoms/ScrollToTopButton/ScrollToTopButton"
import Project from "components/molecules/Project/Project"
import { iSanityProject } from "lib/models/objects/sanityProject"
import { iSanityProjectTag } from "lib/models/objects/SanityTag"
import { useState } from "react"

interface iProjectsPage {
  projects: iSanityProject[]
  tags: iSanityProjectTag[]
}

const ProjectsPage = ({ projects = [], tags = [] }: iProjectsPage) => {
  const [currentFilter, setCurrentFilter] = useState("all")

  const allTags = [{ name: "all", projectCount: projects.length }, ...tags]
  return (
    <>
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
                  "col-span-full xl:col-span-3 overflow-clip h-full"
                )}
                key={_id}
              >
                <Project {...project} />
              </div>
            )
          })}
      </section>
      <ScrollToTopButton />
    </>
  )
}

export default ProjectsPage
