// getAllProjectsLight

import { PortableText } from "@portabletext/react"
import { BackButton, Chip, Footer, Main } from "components"
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
  if (project && isEmptyObject(project)) {
    return <div>404</div>
  }

  return (
    <Main noTopPadding className="flex-col min-h-screen overflow-clip">
      <BackButton />
      <section className="">
        <div className="relative w-full aspect-square xl:aspect-video">
          {project?.image && (
            <Image
              src={imageBuilder(project.image).url()}
              fill
              alt={project.title}
            />
          )}

          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-white bg-dark/60">
            <h1 className="text-4xl xl:text-8xl">
              <strong>{project?.title}</strong>
            </h1>
            <div>
              {project?.projectStart} - {project?.projectEnd}
            </div>
            <div>
              Status: <strong>{project?.status}</strong>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full max-w-screen-xl px-4 py-4 mx-auto xl:py-20">
        {project?.tags?.length > 0 && (
          <ul className="flex flex-wrap max-w-xl gap-2 pb-4">
            {project?.tags.map((tag) => {
              return (
                <li className="whitespace-nowrap" key={tag.name}>
                  <Chip>{tag.name}</Chip>
                </li>
              )
            })}
          </ul>
        )}

        <div className="max-w-xl w-f ">
          <PortableText value={project?.content} />
        </div>
      </section>

      {project?.connectedPaintings?.length > 0 && (
        <section className="px-4 py-10 bg-dark">
          <div className="pb-4 text-center">
            <h2 className="text-center text-white">
              <strong>Related artwork</strong>
            </h2>
          </div>
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
      <Footer />
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
