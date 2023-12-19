import { groq } from "next-sanity"

export const homePageQuery = groq`
  *[_type == "home"][0]{
    _id,
    title,
    "paintingsCount": count(*[_type == "painting"]),
    paintingsDescription,
    showcasePaintings[]->{
      _type,
      _id,
      altText,
      "slug": slug.current,
      title,
      format,
      image{
        ...,
        "lqip": asset->metadata.lqip
      }
    },
    projectsDescription,
    showcaseProjects[]->{
      _type,
      _id,
      title,
      description,
      projectStart,
      projectEnd,
      status,
      content,
      name,
      "slug": slug.current,
      image{
        ...,
        "lqip": asset->metadata.lqip
      },
    },
  }
`

export const aboutPageQuery = groq`
*[_type == "painting"]{
  title, description, format, likes, paintedAt, artstationUrl, inPrintUrl, image{
    ...,
    "lqip": asset->metadata.lqip
    },
    seoDescription, 'slug': slug.current, altText, redbubbleUrl, society6Url, _id, images, "tagCount": count(tagsV2), "imagesCount": count(images),tagsV2[]->{name}, video
}[0 ... 2]
`

export const pagesBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    body,
    overview,
    title,
    "slug": slug.current,
  }
`

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    client,
    coverImage,
    description,
    duration,
    overview,
    site,
    "slug": slug.current,
    tags,
    title,
  }
`

export const settingsQuery = groq`
  *[_type == "settings"][0]{
    footer,
    menuItems[]->{
      _type,
      "slug": slug.current,
      title
    },
    ogImage,
  }
`

export const paintingQuery = groq`
*[_type == "painting" && slug.current == $slug][0]{
  _id,
  title,
  'slug': slug.current,
  description,
  seoDescription,
  format,
  likes,
  paintedAt,
  artstationUrl,
  redbubbleUrl,
  society6Url,
  inPrintUrl,
  image{
    ...,
    "lqip": asset->metadata.lqip
  },
  altText,
  images,
  tagsV2[]->{name},
  video
}
`
