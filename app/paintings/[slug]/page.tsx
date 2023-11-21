import clsx from "clsx"
import Main from "components/atoms/Main/Main"
import PaintingPage from "components/pages/PaintingPage"
import { getAllPaintingSlugs, getPaintingDetails } from "lib/api"
import { urlForImage } from "lib/sanity.image"
import { draftMode } from "next/headers"
import { notFound } from "next/navigation"

import { generateStaticSlugs } from "@/sanity/loader/generateStaticSlugs"
import { loadPainting } from "@/sanity/loader/loadQuery"

export const revalidate = 3600 // every hour

// export async function generateStaticParams() {
//     const allPaintings = await getAllPaintingSlugs()

//     const paths = allPaintings?.map((painting) => ({
//         slug: painting.slug,
//     }))

//     return [paths]
// }

export function generateStaticParams() {
    return generateStaticSlugs("painting")
}
// SEO
export async function generateMetadata({ params }: { params: Params }) {
    const preview = draftMode().isEnabled ? true : false
    const painting = await getData(params.slug, preview)

    const {
        title = "Not found",
        seoDescription,
        description = "",
        image,
    } = painting

    const selectedDescription = seoDescription || description

    // regex to remove all html from description text and line breaks
    const regex = /(<([^>]+)>)/gi
    const descriptionText = selectedDescription.replace(regex, "")
    const removedLineBreaks = descriptionText.replace(/(\r\n|\n|\r)/gm, "")

    const paintingImageUrl = urlForImage(image)
        .width(400)
        .height(400)
        .quality(45)
        .url()

    const combinedTitle = clsx(title, " | WiSiHe")

    return {
        title: combinedTitle,
        description: removedLineBreaks,
        locale: "en-US",
        type: "website",
        url: `https://wisihe.no/paintings/${params.slug}`,
        openGraph: {
            title: combinedTitle,
            description: removedLineBreaks,
            images: [
                {
                    url: paintingImageUrl,
                    width: 400,
                    height: 400,
                    alt: painting.title,
                },
            ],
            image: paintingImageUrl,
            url: `https://wisihe.no/paintings/${params.slug}`,
            type: "website",
            site_name: "WiSiHe",
        },
        // twitter: {
        //     title: combinedTitle,
        //     description: removedLineBreaks,
        //     cardType: "summary_large_image",
        //     image: paintingImageUrl,
        //     imageAlt: painting.title,
        //     images: [
        //         {
        //             url: paintingImageUrl,
        //             width: 400,
        //             height: 400,
        //             alt: painting.title,
        //         },
        //     ],
        //     url: `https://wisihe.no/paintings/${params.slug}`,
        //     creator: "@wisihe",
        //     site: "https://wisihe.no",
        // },
    }
}

async function getData(slug: string, preview: boolean) {
    const painting = await getPaintingDetails(slug, preview)

    return painting
}

interface Params {
    slug: string
}

export default async function LandingPage({ params }: { params: Params }) {
    const initial = await loadPainting(params.slug)

    // const painting = await getData(params.slug, draftMode().isEnabled)

    // if (!initial) {
    //     return notFound()
    // }

    const { data } = initial

    if (!data) {
        return notFound()
    }

    const {
        title = "Not found",
        description = "",
        seoDescription,
        slug = "",
        image,
        paintedAt,
    } = data

    const selectedDescription = seoDescription || description

    // regex to remove all html from description text and line breaks
    const regex = /(<([^>]+)>)/gi
    const descriptionText = selectedDescription.replace(regex, "")
    const removedLineBreaks = descriptionText.replace(/(\r\n|\n|\r)/gm, "")

    const paintingUrl = `https://wisihe.no/paintings/${slug}`

    const paintingImageUrl = urlForImage(image)
        .width(400)
        .height(400)
        .quality(75)
        .url()

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "VisualArtwork",
        name: title,
        url: paintingUrl,
        image: paintingImageUrl,
        author: {
            "@type": "Person",
            name: "Henrik Wilhelm Sissener",
            url: "https://wisihe.no/about",
        },
        creator: {
            "@type": "Person",
            name: "Henrik Wilhelm Sissener",
            url: "https://wisihe.no/about",
        },
        artworkSurface: "Digital",
        artMedium: "Digital",
        artform: "Digital Painting",
        dateCreated: paintedAt,
        description: removedLineBreaks,

        inLanguage: "en",
        copyrightHolder: {
            "@type": "Person",
            name: "Henrik Wilhelm Sissener",
            url: "https://wisihe.no/about",
        },
    }

    // if (draftMode().isEnabled) {
    //     return (
    //         <Main className="grid min-h-screen grid-cols-12 p-4 pt-20 mx-auto lg:gap-4 overflow-clip">
    //             <PaintingPagePreview params={params} initial={initial} />
    //         </Main>
    //     )
    // }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Main
                noTopPadding
                className="grid min-h-screen grid-cols-12 p-4 pt-20 mx-auto lg:gap-4 overflow-clip"
            >
                <PaintingPage painting={data!} />
            </Main>
        </>
    )
}
