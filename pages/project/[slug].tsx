import Meta from "components/atoms/Meta/Meta"
import ProjectPage from "components/pages/ProjectPage"
import { getAllProjectsLight, getProjectDetails } from "lib/api"
import { iSanityProject } from "lib/models/objects/sanityProject"
import { isEmptyObject } from "utils/object"

interface PageProps {
  project: iSanityProject
}

const Page = ({ project }: PageProps) => {
  return (
    <>
      <Meta
        title={project?.title || ""}
        description={project?.description || ""}
      />
      <ProjectPage project={project} />
    </>
  )
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const { slug = "" } = params
  const projectDetails = await getProjectDetails(slug)

  if (isEmptyObject(projectDetails)) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      project: projectDetails,
    },
    //  revalidate evry 3 hour
    revalidate: 60 * 60 * 3,
  }
}

export async function getStaticPaths() {
  const allProjects = await getAllProjectsLight()

  const paths = allProjects.map((project) => ({
    params: {
      slug: project.slug,
    },
  }))

  return {
    paths,
    fallback: true,
  }
}

export default Page
