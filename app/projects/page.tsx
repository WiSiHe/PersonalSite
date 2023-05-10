import ProjectsPage from "components/pages/ProjectsPage"
import { getAllProjectsAndTags } from "lib/api"
import { notFound } from "next/navigation"

export const metadata = {
  title: "Projects | WiSiHe",
  description: "A gallery of some of my paintings",
  locale: "en-US",
  type: "website",
}

export const revalidate = 60 * 60 * 3 // 3 hours

async function getAllProjects() {
  // const data = await getAllProjects()
  const { projects = [], tags = [] } = await getAllProjectsAndTags()

  const filteredTags = tags.filter((tag) => {
    const { projectCount = 0 } = tag
    if (projectCount < 1) {
      return false
    }
    return true
  })

  return { projects: projects || [], tags: filteredTags || [] }
}

export default async function ProjectsHomePage() {
  const allProjects = await getAllProjects()

  if (!allProjects) {
    return notFound()
  }

  const { projects, tags } = allProjects

  return <ProjectsPage projects={projects} tags={tags} />
}
