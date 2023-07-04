"use client"
import { iSanityImage } from "lib/models/objects/sanityImage"
import { getClient } from "lib/sanity"
import { urlForImage } from "lib/sanity.image"
import Image from "next/image"
import { useEffect, useState } from "react"

interface Painting {
  title: string
  name: string
  image: iSanityImage
}

//  prettier-ignore
const types = ['painting', 'tag', 'video', 'project']

const SanitySearch = () => {
  const [paintings, setPaintings] = useState<Painting[]>([])
  const [query, setQuery] = useState<string>("")

  async function search(query: string) {
    if (!query) return []
    const mQ = `${query}*`
    const limit = 10
    const results = await getClient().fetch(
      `*[_type in $types && title match $mQ || name match $mQ ][0...$limit]{title, name, image}`,
      { mQ, types, limit }
    )
    setPaintings(results)
  }

  //   *[_type in $__types && (_id match $t0 || _type match $t0 || title match $t0 || description match $t0 || ogImage.title match $t0 || pt::text(description[]) match $t0 || format match $t0 || slug.current match $t0 || slug.source match $t0 || seoDescription match $t0 || video match $t0 || redbubbleUrl match $t0 || society6Url match $t0 || artstationUrl match $t0 || inPrintUrl match $t0 || instagramUrl match $t0 || twitterUrl match $t0 || paintedAt match $t0 || name match $t0 || videoUrl match $t0 || status match $t0 || projectStart match $t0 || projectEnd match $t0 || connectedPage.current match $t0 || connectedPage.source match $t0 || pt::text(content[]) match $t0)]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value)
  }

  useEffect(() => {
    if (query.length < 3) return
    search(query)
  }, [query])

  return (
    <section className="p-4">
      <div>
        <label htmlFor="query">Search</label>
        <input
          type="text"
          name="query"
          id="query"
          value={query}
          onChange={handleChange}
        />
      </div>
      <h2>Results: {paintings.length}</h2>
      <section className="grid items-start grid-cols-12 gap-4">
        {paintings.map((painting, i) => {
          const { title, image, name } = painting
          return (
            <div key={i} className="col-span-3 p-4 bg-white aspect-square">
              <h2>{title || name}</h2>

              {image && (
                <div className="relative aspect-square">
                  <Image
                    src={urlForImage(painting.image)
                      .height(200)
                      .width(200)
                      .url()}
                    alt={painting.title}
                    fill
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
            </div>
          )
        })}
      </section>
    </section>
  )
}

export default SanitySearch
