import { apiVersion, dataset, projectId, useCdn } from "lib/sanity.api"
import { createClient, groq } from "next-sanity"
import { iSanityTag } from "./models/objects/SanityTag"
import { iSanityPainting } from "./models/objects/sanityPainting"
import client from "./sanity"

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
  const data = await client.fetch(`*[_type == "post"]{ 'slug': slug.current }`)
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
  const results = await client.fetch(`*[_type == "painting"]`)
  return results
}

export async function getPainting(slug: string): Promise<iSanityPainting> {
  const results = await client.fetch(
    `*[_type == "painting" && slug.current == $slug]`,
    {
      slug,
    }
  )
  return results
}

const paintingDetailsQuery = groq`
  *[_type == "painting" && slug.current == $slug]{
    title,
    description,
    format,
    image,
    'slug': slug.current,
    redbubbleUrl,
    society6Url,
    _id,
    images,
    "tagCount": count(tagsV2),
    "imagesCount": count(images),
    tagsV2[]->{name},
    video
  }[0]
`

export async function getPaintingDetails(
  slug: string,
  token?: string | null
): Promise<iSanityPainting> {
  if (token) {
    const client = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn,
      token: token || undefined,
    })
    return await client.fetch(paintingDetailsQuery, { slug })
  }

  const results = await client.fetch(
    `*[_type == "painting" && slug.current == $slug]{
      title, description, format, image, 'slug': slug.current, redbubbleUrl, society6Url, _id, images, "tagCount": count(tagsV2), "imagesCount": count(images),tagsV2[]->{name}, video
    }[0]`,
    { slug }
  )
  return results || []
}

export const paintingBySlugQuery = groq`
*[_type == "painting" && slug.current == $slug][0] {
  ${paintingFields}
}
`

export async function getAllTags(): Promise<iSanityTag[]> {
  const results = await client.fetch(
    `*[_type == "tag"]{_id,name,"paintingsCount": count(*[_type == "painting" && references(^._id)].title)}`
  )
  return results
}

export async function getAllPaintingSlugs(): Promise<
  Pick<iSanityPainting, "slug">[]
> {
  const data = await client.fetch(
    `*[_type == "painting"]{ 'slug': slug.current }`
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

  const results = await client.fetch(query)
  return results
}

export async function getAllTagsAndPaintingsLight() {
  const paintingQuery = /* groq */ `*[_type == "painting"]{
    title, image, paintedAt, "imagesCount": count(images), 'slug': slug.current, redbubbleUrl, _id, tagsV2[]->{name}, video}`
  const tagsQuery = /* groq */ `*[_type == "tag"]| order(name asc){_id, name, description, "paintingsCount": count(*[_type == "painting" && references(^._id)].title)}`

  const query = `{
    "paintings": ${paintingQuery},
    "tags": ${tagsQuery},
  }`

  const results = await client.fetch(query)
  return results
}

export async function getAllVideos() {
  const results = await client.fetch(
    `*[_type == "video"]| order(_updatedAt desc){title,thumbnail,description, content, linkedPainting->{name, image}, videoUrl, _id, "tags": tags[]->{name}}`
  )
  return results
}

export async function getAllVideosAndTags() {
  const videoQuery = /* groq */ `*[_type == "video"]| order(_updatedAt desc){title,thumbnail,description, content, linkedPainting->{name, image}, videoUrl, _id, "tags": tags[]->{name}}`
  const tagsQuery = /* groq */ `*[_type == "tag"]| order(name asc){_id, name, "videoCount": count(*[_type == "video" && references(^._id)].title)}`

  const query = `{
    "videos": ${videoQuery},
    "tags": ${tagsQuery},
  }`

  const results = await client.fetch(query)
  return results
}

export async function getAllNewTags() {
  const results = await client.fetch(
    `*[_type == "tag"]{_id,name,"paintingsCount": count(*[_type == "painting" && references(^._id)].title)}`
  )
  return results
}

export async function getAllWallpapers() {
  const results = await client.fetch(
    `*[_type == "tag" && name == "Wallpaper"]{_id,  name, "paintings": *[_type == "painting" && references(^._id)]}[0]`
  )

  return results
}

//

export async function getAllProjects() {
  const results = await client.fetch(
    `*[_type == "project"]| order(projectStart desc){title, description, projectStart, projectEnd, status, content, name, slug, image, slug, _id, tags[]->{name}}`
  )
  return results
}

export async function getAllProjectsAndTags() {
  const projectQuery = /* groq */ `*[_type == "project"]| order(projectStart desc){title, description, projectStart, projectEnd, status, content, name, slug, image, slug, _id, tags[]->{name}}`
  const tagsQuery = /* groq */ `*[_type == "tag"]| order(name asc){_id, name, "projectCount": count(*[_type == "project" && references(^._id)].title)}`

  const query = `{
    "projects": ${projectQuery},
    "tags": ${tagsQuery},
  }`

  const results = await client.fetch(query)
  return results
}

export async function getAllProjectsLight() {
  const results = await client.fetch(`*[_type == "project"]{slug}`)
  return results
}

export async function getProjectDetails(slug: string) {
  const results = await client.fetch(
    `*[_type == "project" && slug.current == $slug]| order(_updatedAt desc){title, description, extraImages, projectStart, projectEnd, status, content, name, slug, image, slug, _id, connectedVideo->{videoUrl}, connectedPaintings[]->{title, slug, image}, tags[]->{name}}`,
    {
      slug,
    }
  )
  return results
}
