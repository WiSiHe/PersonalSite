// getAllProjectsLight

import { PortableText } from "@portabletext/react"
import { Chip, Main } from "components"
import { getAllProjectsLight, getProjectDetails } from "lib/api"
import {
  iSanityProject,
  iSanityProjectLight,
} from "lib/models/objects/sanityProject"
import { imageBuilder } from "lib/sanity"
import Image from "next/image"
import { isEmptyArray } from "utils/array"
import { isEmptyObject } from "utils/object"

interface PageProps {
  project: iSanityProject
}

const ProjectPage = ({ project }: PageProps) => {
  console.log("project", project)
  if (project && isEmptyObject(project)) {
    return <div>404</div>
  }

  return (
    <Main noTopPadding className="flex-col overflow-clip">
      <section className="p-2 xl:p-0">
        <div className="relative w-full aspect-square xl:aspect-video">
          {project?.image && (
            <Image
              src={imageBuilder(project.image).url()}
              fill
              alt={project.title}
            />
          )}

          <div className="absolute inset-0 z-10 flex items-center justify-center text-center text-white bg-dark/60">
            <h1 className="text-4xl xl:text-8xl">
              <strong>{project?.title}</strong>
            </h1>
          </div>
        </div>
        <section className="max-w-screen-xl py-4 mx-auto">
          {project?.tags?.length > 0 && (
            <ul className="flex flex-wrap gap-2 pb-4 ">
              {project?.tags.map((tag) => {
                return (
                  <li className="whitespace-nowrap" key={tag.name}>
                    <Chip>{tag.name}</Chip>
                  </li>
                )
              })}
            </ul>
          )}
          <PortableText value={project?.content} />
          <p>
            {project?.projectStart} - {project?.projectEnd}
          </p>
          <div>
            <h2>Status</h2>

            <p>{project?.status}</p>
          </div>
        </section>
      </section>

      {project?.connectedPaintings?.length > 0 && (
        <section className="px-4 py-10 bg-dark">
          <h2 className="text-white">
            <strong>Related artwork</strong>
          </h2>
          <ul className="grid max-w-screen-xl grid-cols-12 gap-4 mx-auto">
            {project?.connectedPaintings?.map((artwork) => {
              const { _id = "", title = "", image } = artwork
              return (
                <li key={_id} className="relative col-span-3 aspect-square">
                  <h3>{title}</h3>
                  <Image
                    src={imageBuilder(image)
                      .width(400)
                      .height(400)
                      .quality(35)
                      .url()}
                    fill
                    alt={title}
                    className="object-cover w-full h-full"
                    sizes="(max-width: 768px) 100vw,
                  (max-width: 1200px) 50vw,
                  33vw"
                  />
                </li>
              )
            })}
          </ul>
        </section>
      )}
    </Main>
  )
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const { slug = "" } = params
  const data = await getProjectDetails(slug)

  if (isEmptyArray(data)) {
    return {
      notFound: true,
    }
  }

  const project = data[0] || {}

  if (isEmptyObject(project)) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      project,
    },
    //  revalidate evry 3 hour
    revalidate: 60 * 60 * 3,
  }
}

export async function getStaticPaths() {
  const allProjects = (await getAllProjectsLight()) as iSanityProjectLight[]

  const paths =
    allProjects.map((project) => {
      const { slug } = project
      return {
        params: { slug: slug?.current },
      }
    }) || []

  return {
    paths,
    fallback: true,
  }
}

export default ProjectPage
