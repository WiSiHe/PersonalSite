import clsx from "clsx"
import {
  Filters,
  Footer,
  Main,
  Meta,
  Painting,
  ScrollToTopButton,
} from "components"
import { getAllTags, getAllTagsAndPaintingsLight } from "lib/api"
import { iSanityPainting } from "lib/models/objects/sanityPainting"
import { iSanityTag } from "lib/models/objects/SanityTag"
import React from "react"
import { isEmptyArray } from "utils/array"
import { slugify } from "utils/string"
// import { imageBuilder } from "lib/sanity"

export interface iTag {
  label: string
  name: string
  count: number
  description: string
}
export interface iPaintingTag {
  label: string
  value: string
}

export interface iPainting {
  _id: string
  _type: string
  _rev: string
  _createdAt: string
  _updatedAt: string
  aspectRatio?: string
  redbubbleUrl?: string
  format?: string
  title: string
  slug: {
    current: string
    _type: string
  }
  image: {
    _type: string
    asset: {
      _ref: string
      _type: string
    }
  }
  tags: iPaintingTag[]
  tagsV2: iSanityTag[]
}

export interface PaintingsPageProps {
  slug: string
  paintings: iPainting[]
  tags: iTag[]
}

const PaintingsPage = ({
  slug = "",
  paintings = [],
  tags = [],
}: PaintingsPageProps) => {
  const tagsWithAll = [{ name: "All" }, ...tags]

  const currentTag = tags.find((t) => slugify(t.name) === slug)

  const { description = "" } = currentTag || {
    description: "",
  }

  return (
    <>
      <Meta
        title="Gallery"
        url="https://wisihe.no/gallery"
        description={description ?? "A gallery of some of my paintings"}
      />
      <Main>
        <section className="relative grid flex-1 flex-grow h-full min-h-screen grid-cols-12 overflow-clip">
          <section className="col-span-full">
            <div className="p-2 xl:p-4">
              <h1 className="capitalize">{slug} gallery</h1>
              <p className="max-w-lg">{description}</p>
            </div>
            <div className="sticky top-0 z-20 p-4 bg-stone-200 bg-opacity-10 backdrop-blur-lg">
              <Filters
                filteredTags={tagsWithAll}
                activeFilter={slug}
                amountOfPaintings={paintings.length}
              />
            </div>
            <div className="grid grid-cols-12 gap-2 p-2 mb-10 xl:gap-4 xl:p-4">
              {paintings.map((p) => {
                const { _id } = p
                return (
                  <div
                    key={_id}
                    className={clsx("col-span-6 xl:col-span-3 aspect-square")}
                  >
                    <Painting paintingData={p} />
                  </div>
                )
              })}
            </div>
          </section>
        </section>
        <ScrollToTopButton />
      </Main>
      <Footer />
    </>
  )
}

export default PaintingsPage

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const { slug = "" } = params

  const data = await getAllTagsAndPaintingsLight()

  if (data.length < 1) {
    return {
      notFound: true,
    }
  }

  const {
    paintings = [],
    tags = [],
  }: { paintings: iSanityPainting[]; tags: iSanityTag[] } = data

  if (isEmptyArray(paintings) || isEmptyArray(tags)) {
    return {
      notFound: true,
    }
  }

  // sort paintings by paintingsCount
  const sortedTags = tags
    .filter((p) => p.paintingsCount > 5)
    .sort((a, b) => b.paintingsCount - a.paintingsCount)

  const filteredPaintings = paintings.filter((p) =>
    p.tagsV2?.find((t) => slugify(t?.name) === slugify(slug))
  )

  return {
    props: {
      paintings: filteredPaintings,
      slug: slug,
      tags: sortedTags,
    },
    revalidate: 7200, // 120  min
  }
}

export async function getStaticPaths() {
  const allTags = (await getAllTags()) as iSanityTag[]

  const paths = allTags
    .filter((p) => p.paintingsCount < 5)
    .map((tag) => {
      const { name = "" } = tag
      const slug = slugify(name)
      return {
        params: { slug: slug },
      }
    })

  return {
    paths,
    fallback: true,
  }
}
