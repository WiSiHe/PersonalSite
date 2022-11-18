import client, { previewClient } from "./sanity"

const getUniquePosts = posts => {
  const slugs = new Set()
  return posts.filter(post => {
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

const getClient = preview => (preview ? previewClient : client)

export async function getPreviewPostBySlug(slug) {
  const data = await getClient(true).fetch(
    `*[_type == "post" && slug.current == $slug] | order(publishedAt desc){
      ${postFields}
      body
    }`,
    { slug }
  )
  return data[0]
}

export async function getAllPostsWithSlug() {
  const data = await client.fetch(`*[_type == "post"]{ 'slug': slug.current }`)
  return data
}

export async function getAllPostsForHome(preview) {
  const results = await getClient(preview).fetch(`*[_type == "post"] | order(publishedAt desc){
      ${postFields}
    }`)
  return getUniquePosts(results)
}

export async function getAllPaintings(preview) {
  const results = await getClient(preview).fetch(`*[_type == "painting"]`)
  return results
}

export async function getPainting(slug, preview) {
  const results = await getClient(preview).fetch(
    `*[_type == "painting" && slug.current == $slug]`,
    { slug }
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

export async function getAllTags(preview) {
  const results = await getClient(preview).fetch(`*["tag"]`)
  return results
}

export async function getAllPaintingSlugs() {
  const data = await client.fetch(`*[_type == "painting"]{ 'slug': slug.current }`)
  return data
}

export async function getAllTagsAndPaintings(preview) {
  const paintingQuery = /* groq */ `*[_type == "painting"]{
    title, description, format, image, slug, redbubbleUrl, _id, images, "tagCount": count(tagsV2), "imagesCount": count(images),tagsV2[]->{name}, video
  }`
  const tagsQuery = /* groq */ `*[_type == "tag"]{name}`

  const query = `{
    "paintings": ${paintingQuery},
    "tags": ${tagsQuery},
  }`

  const results = await getClient(preview).fetch(query)
  return results
}

// export async function getPostAndMorePosts(slug, preview) {
//   const curClient = getClient(preview)
//   const [post, morePosts] = await Promise.all([
//     curClient
//       .fetch(
//         `*[_type == "post" && slug.current == $slug] | order(_updatedAt desc) {
//         ${postFields}
//         body,
//         'comments': *[
//                       _type == "comment" &&
//                       post._ref == ^._id &&
//                       approved == true] {
//           _id,
//           name,
//           email,
//           comment,
//           _createdAt
//         }
//       }`,
//         { slug }
//       )
//       .then(res => res?.[0]),
//     curClient.fetch(
//       `*[_type == "post" && slug.current != $slug] | order(publishedAt desc, _updatedAt desc){
//         ${postFields}
//         body,
//       }[0...2]`,
//       { slug }
//     )
//   ])
//   return { post, morePosts: getUniquePosts(morePosts) }
// }

export async function getAllNewTags(preview) {
  const results = await getClient(preview).fetch(`*[_type == "tag"]{name}`)
  return results
}
