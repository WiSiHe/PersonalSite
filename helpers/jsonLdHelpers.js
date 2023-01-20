import { imageBuilder } from "../lib/sanity"

function generatePaintingJsonLd(paintingData) {
  const {
    slug = {},
    desciption = "",
    image = {},
    _createdAt = "",
    title = "",
  } = paintingData

  const smallImage = imageBuilder(image).width(50).url()

  const url = `https://wisihe.no/painting/${slug.current}}`

  const jsonLd = `{
    "@context": "http://schema.org",
    "@type": "Painting",
    "url": "${url}",
    "name": "${title}",
    "datePublished": "${_createdAt}",
    "image": "${smallImage}",
    "about":"${desciption}",
    "creator": {
      "@type": "Person",
      "name": "Henrik Wilhelm Sissener"
    }
  }`

  return jsonLd
}

export default generatePaintingJsonLd
