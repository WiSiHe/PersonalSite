import Meta from "components/atoms/Meta/Meta"
import ProjectsPage from "components/pages/ProjectsPage"
import { getAllProjectsAndTags } from "lib/api"
import { iSanityProject } from "lib/models/objects/sanityProject"
import { iSanityProjectTag } from "lib/models/objects/SanityTag"
import React from "react"

interface PageProps {
  projects: iSanityProject[]
  tags: iSanityProjectTag[]
}

export default function Page({ projects = [], tags = [] }: PageProps) {
  return (
    <>
      <Meta
        title="Projects"
        description="A collection of Henrik Wilhelm Sissener's previous projects"
      />
      <ProjectsPage projects={projects} tags={tags} />
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
