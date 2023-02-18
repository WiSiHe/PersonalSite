// getAllProjectsLight

import { PortableText } from "@portabletext/react"
import {
  BackButton,
  Chip,
  Footer,
  Main,
  ProjectStatus,
  ScrollToTopButton,
} from "components"
import { getAllProjectsLight, getProjectDetails } from "lib/api"
import {
  iSanityProject,
  iSanityProjectLight,
} from "lib/models/objects/sanityProject"
import { imageBuilder } from "lib/sanity"
import dynamic from "next/dynamic"
import Image from "next/image"
import { Suspense } from "react"
import { isEmptyArray, isNotEmptyArray } from "utils/array"
import { isEmptyObject } from "utils/object"

const ReactPlayer = dynamic(() => import("react-player"), {
  suspense: true,
})
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
              className="object-cover"
            />
          )}

          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-white bg-dark/60">
            <h1 className="text-4xl xl:text-8xl">
              <strong>{project?.title}</strong>
            </h1>
            <div className="pb-1">
              {project?.projectStart} - {project?.projectEnd ?? "Present"}
            </div>
            <ProjectStatus status={project?.status} />
          </div>
        </div>
      </section>
      <section className="w-full max-w-screen-xl py-4 mx-auto xl:py-20">
        <h2>{project?.title}</h2>
        <div className="max-w-xl">
          {project?.tags?.length > 0 && (
            <ul className="flex flex-wrap gap-2 pb-4">
              <ProjectStatus status={project?.status} />
              {project?.tags.map((tag) => {
                return (
                  <li className="capitalize whitespace-nowrap" key={tag.name}>
                    <Chip>{tag.name}</Chip>
                  </li>
                )
              })}
            </ul>
          )}
          <PortableText value={project?.content} />
        </div>
      </section>

      {isNotEmptyArray(project?.extraImages) && (
        <section className="p-4 bg-dark">
          <div className="grid max-w-screen-xl grid-cols-2 gap-4 mx-auto xl:grid-cols-4">
            {project.extraImages.map((image, i) => {
              return (
                <div className="relative aspect-square" key={i}>
                  <Image
                    src={imageBuilder(image)
                      .width(400)
                      .height(400)
                      .quality(35)
                      .url()}
                    sizes="(max-width: 768px) 100vw,
                      (max-width: 1200px) 50vw,
                      25vw"
                    fill
                    className="object-cover"
                    alt={project.title}
                  />
                </div>
              )
            })}
          </div>
        </section>
      )}

      {project?.connectedVideo?.videoUrl && (
        <section className="relative py-10">
          <div className="w-full max-w-screen-xl mx-auto aspect-square xl:aspect-video">
            <Suspense fallback={<div>Loading...</div>}>
              <ReactPlayer
                url={project.connectedVideo.videoUrl}
                loop
                width="100%"
                height="100%"
              />
            </Suspense>
          </div>
        </section>
      )}

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
      <ScrollToTopButton />
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
