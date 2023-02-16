import client from "./sanity"

const getUniquePosts = (posts) => {
  const slugs = new Set()
  return posts.filter((post) => {
    if (slugs.has(post.slug)) {
      return false
    } else {
      slugs.add(post.slug)
      return true
    }
  })
}

const postFields = `
  _id,
  name,
  title,
  'date': publishedAt,
  excerpt,
  'slug': slug.current,
  'coverImage': mainImage,
  'author': author->{name, 'picture': image.asset->url},
`

const getClient = (preview) => (preview ? client : client)

export async function getAllPostsWithSlug() {
  const data = await client.fetch(`*[_type == "post"]{ 'slug': slug.current }`)
  return data
}

export async function getAllPostsForHome() {
  const results = await getClient()
    .fetch(`*[_type == "post"] | order(publishedAt desc){
      ${postFields}
    }`)
  return getUniquePosts(results)
}

export async function getAllPaintings() {
  const results = await getClient().fetch(`*[_type == "painting"]`)
  return results
}

export async function getPainting(slug) {
  const results = await getClient().fetch(
    `*[_type == "painting" && slug.current == $slug]`,
    {
      slug,
    }
  )
  return results
}

export async function getPaintingDetails(slug) {
  const results = await client.fetch(
    `*[_type == "painting" && slug.current == $slug]{
      title, description, format, image, slug, redbubbleUrl, _id, images, "tagCount": count(tagsV2), "imagesCount": count(images),tagsV2[]->{name}, video
    }`,
    { slug }
  )
  return results
}

export async function getAllTags() {
  const results = await getClient().fetch(
    `*[_type == "tag"]{_id,name,"paintingsCount": count(*[_type == "painting" && references(^._id)].title)}`
  )
  return results
}

export async function getAllPaintingSlugs() {
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

  const results = await getClient().fetch(query)
  return results
}

export async function getAllTagsAndPaintingsLight() {
  const paintingQuery = /* groq */ `*[_type == "painting"]| order(_updatedAt asc){
    title, format, image, images, "imagesCount": count(images), slug, redbubbleUrl, _id ,tagsV2[]->{name}, video}`
  const tagsQuery = /* groq */ `*[_type == "tag"]| order(name asc){_id,name,"paintingsCount": count(*[_type == "painting" && references(^._id)].title)}`

  const query = `{
    "paintings": ${paintingQuery},
    "tags": ${tagsQuery},
  }`

  const results = await getClient().fetch(query)
  return results
}

export async function getAllVideos() {
  const results = await getClient().fetch(
    `*[_type == "video"]| order(_updatedAt desc){title,thumbnail,description, content, linkedPainting->{name, image}, videoUrl, _id, "tags": tags[]->{name}}`
  )
  return results
}

export async function getAllNewTags() {
  const results = await getClient().fetch(
    `*[_type == "tag"]{_id,name,"paintingsCount": count(*[_type == "painting" && references(^._id)].title)}`
  )
  return results
}

export async function getAllWallpapers() {
  const results = await getClient().fetch(
    `*[_type == "tag" && name == "Wallpaper"]{_id,  name,"paintings": *[_type == "painting" && references(^._id)]}[0]`
  )

  return results
}

//

export async function getAllProjects() {
  const results = await getClient().fetch(
    `*[_type == "project"]{title, description, projectStart, projectEnd, status,content, name, slug, image, slug, _id, tags[]->{name}}`
  )
  return results
}

export async function getAllProjectsLight() {
  const results = await getClient().fetch(`*[_type == "project"]{slug}`)
  return results
}

export async function getProjectDetails(slug) {
  const results = await getClient().fetch(
    `*[_type == "project" && slug.current == $slug]| order(_updatedAt desc){title, description, extraImages, projectStart, projectEnd, status, content, name, slug, image, slug, _id, connectedVideo->{videoUrl}, connectedPaintings[]->{title, slug, image}, tags[]->{name}}`,
    {
      slug,
    }
  )
  return results
}
