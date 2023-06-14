"use client"
import client, { urlFor } from "lib/sanity"
import { useEffect, useState } from "react"

interface Painting {
  title: string
  name: string
  image: any
}

// use single quotes for sanity queries
// disable eslint for this line
const types = ["painting", "tag", "video", "project"]

const SanitySearch = () => {
  const [paintings, setPaintings] = useState<Painting[]>([])
  const [query, setQuery] = useState<string>("")

  async function search(query: string) {
    if (!query) return []
    console.log("searching for", query)
    const modifiedQuery = `${query}*`
    const results = await client.fetch(
      `*[_type in ['tag', 'video', 'painting', 'project'] && title match $modifiedQuery || name match $modifiedQuery ]{title, image}`,
      { modifiedQuery }
    )
    setPaintings(results)
  }

  //   *[_type in $__types && (_id match $t0 || _type match $t0 || title match $t0 || description match $t0 || ogImage.title match $t0 || pt::text(description[]) match $t0 || format match $t0 || slug.current match $t0 || slug.source match $t0 || seoDescription match $t0 || video match $t0 || redbubbleUrl match $t0 || society6Url match $t0 || artstationUrl match $t0 || inPrintUrl match $t0 || instagramUrl match $t0 || twitterUrl match $t0 || paintedAt match $t0 || name match $t0 || videoUrl match $t0 || status match $t0 || projectStart match $t0 || projectEnd match $t0 || connectedPage.current match $t0 || connectedPage.source match $t0 || pt::text(content[]) match $t0)]

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   const query = e.currentTarget.elements[0].value
  //   await search(query)
  // }

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
              {}
              {image && (
                <img
                  src={urlFor(painting.image).width(200).url()}
                  alt={painting.title}
                  className="object-cover w-full h-full"
                />
              )}
            </div>
          )
        })}
      </section>
    </section>
  )
}

export default SanitySearch
