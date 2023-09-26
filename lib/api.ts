import { groq } from "next-sanity"
import {
    iSanityPaintingTag,
    iSanityProjectTag,
    iSanityTag,
    iSanityVideoTag,
} from "./models/objects/SanityTag"
import {
    iSanityPainting,
    iSanityWallpaperPaintings,
} from "./models/objects/sanityPainting"

import { iSanityProject } from "./models/objects/sanityProject"
import { iSanityVideo } from "./models/objects/sanityVideo"
import { getClient } from "./sanity"

// const getUniquePosts = (posts) => {
//   const slugs = new Set()
//   return posts.filter((post) => {
//     if (slugs.has(post.slug)) {
//       return false
//     } else {
//       slugs.add(post.slug)
//       return true
//     }
//   })
// }

const paintingFields = `
  title,
  description,
  format,
  image,
  'slug': slug.current,
  redbubbleUrl,
  society6Url,
  likes,
  paintedAt,
  tagsV2,
  video,
  images,
  imagesCount
`

// const postFields = `
//   _id,
//   name,
//   title,
//   'date': publishedAt,
//   excerpt,
//   'slug': slug.current,
//   'coverImage': mainImage,
//   'author': author->{name, 'picture': image.asset->url},
// `

// const getClient = (preview) => (preview ? client : client)

export async function getAllPostsWithSlug() {
    const data = await getClient().fetch(
        `*[_type == "post"]{ 'slug': slug.current }`,
    )
    return data
}

// export async function getAllPostsForHome() {
//   const results =
//     await client.fetch(`*[_type == "post"] | order(publishedAt desc){
//       ${postFields}
//     }`)
//   return getUniquePosts(results)
// }

export async function getAllPaintings(): Promise<iSanityPainting[]> {
    const results = await getClient().fetch(`*[_type == "painting"]`)
    return results
}

export async function getPainting(slug: string): Promise<iSanityPainting> {
    const results = await getClient().fetch(
        `*[_type == "painting" && slug.current == $slug]`,
        {
            slug,
        },
    )
    return results
}

// export const paintingDetailsQuery = groq`
// *[_type == "painting" && slug.current == $slug]{
//   title, description, format, likes, paintedAt, artstationUrl, inPrintUrl, image, seoDescription, 'slug': slug.current, redbubbleUrl, society6Url, _id, images, "tagCount": count(tagsV2), "imagesCount": count(images),tagsV2[]->{name}, video
// }[0]
// `

export const paintingDetailsQuery = groq`
*[_type == "painting" && slug.current == $slug]{
  title, description, format, likes, paintedAt, artstationUrl, inPrintUrl, image{
    ...,
    "lqip": asset->metadata.lqip
    },
    seoDescription, 'slug': slug.current, redbubbleUrl, society6Url, _id, images, "tagCount": count(tagsV2), "imagesCount": count(images),tagsV2[]->{name}, video
}[0]
`

export async function getPaintingDetails(
    slug: string,
    preview: boolean,
): Promise<iSanityPainting> {
    if (preview) {
        const results = await getClient(preview).fetch(paintingDetailsQuery, {
            slug,
        })
        return results || {}
    }

    const results = await getClient().fetch(paintingDetailsQuery, { slug })
    return results || {}
}

export async function getPaintingTags(slug: string): Promise<iSanityTag[]> {
    const results = await getClient().fetch(
        `*[_type == "painting" && slug.current == $slug]{
      tagsV2[]->{name},
    }[0]`,
        { slug },
    )

    const { tagsV2 } = results
    return tagsV2 || []
}

export const paintingBySlugQuery = groq`
*[_type == "painting" && slug.current == $slug][0] {
  ${paintingFields}
}
`

export async function getAllTags(): Promise<iSanityTag[]> {
    const results = await getClient().fetch(
        `*[_type == "tag"]{_id,name,"paintingsCount": count(*[_type == "painting" && references(^._id)].title)}`,
    )
    return results
}

export async function getAllPaintingSlugs(): Promise<
    Pick<iSanityPainting, "slug">[]
> {
    const data = await getClient().fetch(
        `*[_type == "painting"]{ 'slug': slug.current }`,
    )
    return data
}

export async function getAllTagsAndPaintings() {
    const paintingQuery = /* groq */ `*[_type == "painting"]{
    title, description, format, image, slug, redbubbleUrl, _id, images, "tagCount": count(tagsV2), "imagesCount": count(images),tagsV2[]->{name}, video
  }`
    const tagsQuery = /* groq */ `*[_type == "tag"]{name}`

    const query = `{
    "paintings": ${paintingQuery},
    "tags": ${tagsQuery},
  }`

    const results = await getClient().fetch(query)
    return results
}

export async function getAllTagsAndPaintingsLight(): Promise<{
    tags: iSanityPaintingTag[]
    paintings: iSanityPainting[]
}> {
    const paintingQuery = /* groq */ `*[_type == "painting"]{
    title, paintedAt, "imagesCount": count(images), 'slug': slug.current, redbubbleUrl, _id,
    image{
      ...,
      "lqip": asset->metadata.lqip
      },
    tagsV2[]->{name}, video}`
    const tagsQuery = /* groq */ `*[_type == "tag"]| order(name asc){_id, name, "paintingsCount": count(*[_type == "painting" && references(^._id)].title)}`

    const query = `{
    "paintings": ${paintingQuery},
    "tags": ${tagsQuery},
  }`

    const results = await getClient().fetch(query)
    return results
}

export async function getAllVideos() {
    const results = await getClient().fetch(
        `*[_type == "video"]| order(_updatedAt desc){title,thumbnail,description, content, linkedPainting->{name, image}, videoUrl, _id, "tags": tags[]->{name}}`,
    )
    return results
}

export async function getAllVideosAndTags(): Promise<{
    videos: iSanityVideo[]
    tags: iSanityVideoTag[]
}> {
    const videoQuery = /* groq */ `*[_type == "video"]| order(_updatedAt desc){title,thumbnail,description, content, linkedPainting->{name, image}, videoUrl, _id, "tags": tags[]->{name}}`
    const tagsQuery = /* groq */ `*[_type == "tag"]| order(name asc){_id, name, "videoCount": count(*[_type == "video" && references(^._id)].title)}`

    const query = `{
    "videos": ${videoQuery},
    "tags": ${tagsQuery},
  }`

    const results = await getClient().fetch(query)
    return results
}

export async function getAllNewTags() {
    const results = await getClient().fetch(
        `*[_type == "tag"]{_id,name,"paintingsCount": count(*[_type == "painting" && references(^._id)].title)}`,
    )
    return results
}

export async function getAllWallpapers(): Promise<{
    paintings: iSanityWallpaperPaintings[]
}> {
    const results = await getClient().fetch(
        `*[_type == "tag" && name == "Wallpaper"]{"paintings": *[_type == "painting" && references(^._id)]{_id, image}}[0]`,
    )

    return results
}

//

export async function getAllProjects() {
    const results = await getClient().fetch(
        `*[_type == "project"]| order(projectStart desc){title, description, projectStart, projectEnd, status, content, name, image, 'slug': slug.current, _id, tags[]->{name}}`,
    )
    return results
}

export async function getAllProjectsAndTags(): Promise<{
    projects: iSanityProject[]
    tags: iSanityProjectTag[]
}> {
    const projectQuery = /* groq */ `*[_type == "project"]| order(projectStart desc){title, description, projectStart, projectEnd, status, content, name, slug, image, slug, _id, tags[]->{name}}`
    const tagsQuery = /* groq */ `*[_type == "tag"]| order(name asc){_id, name, "projectCount": count(*[_type == "project" && references(^._id)].title)}`

    const query = `{
    "projects": ${projectQuery},
    "tags": ${tagsQuery},
  }`

    const results = await getClient().fetch(query)
    return results
}

export async function getAllProjectsLight(): Promise<
    Pick<iSanityPainting, "slug">[]
> {
    const results = await getClient().fetch(
        `*[_type == "project"]{'slug': slug.current}`,
    )
    return results
}

export async function getProjectDetails(slug: string): Promise<iSanityProject> {
    const results = await getClient().fetch(
        `*[_type == "project" && slug.current == $slug]| order(_updatedAt desc){title, description, extraImages, projectStart, projectEnd, status, content, name, 'slug': slug.current, image, slug, _id, connectedVideo->{videoUrl}, connectedPaintings[]->{title, 'slug': slug.current, format, image}, tags[]->{name}}[0]`,
        {
            slug,
        },
    )
    return results
}

export async function getAllProjectsSlugs(): Promise<
    Pick<iSanityPainting, "slug">[]
> {
    const data = await getClient().fetch(
        `*[_type == "project"]{ 'slug': slug.current }`,
    )
    return data
}
