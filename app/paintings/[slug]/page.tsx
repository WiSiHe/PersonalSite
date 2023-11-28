import dynamic from "next/dynamic"
import { draftMode } from "next/headers"
import { notFound } from "next/navigation"

import Main from "@/components/atoms/Main/Main"
import PaintingPage from "@/components/pages/PaintingPage"

const PaintingPagePreview = dynamic(
    () => import("components/pages/PaintingPagePreview"),
)

import { Metadata, ResolvingMetadata } from "next"

import { urlForOpenGraphImage } from "@/sanity/lib/utils"
import { generateStaticSlugs } from "@/sanity/loader/generateStaticSlugs"
import { loadPainting } from "@/sanity/loader/loadQuery"

type Props = {
    params: { slug: string }
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata,
): Promise<Metadata> {
    const { data: painting } = await loadPainting(params.slug)

    if (!painting) {
        return {
            title: "Not found",
            description: "",
        }
    }

    const previousImages = (await parent).openGraph?.images || []

    const { title, seoDescription, image } = painting

    const ogImage = urlForOpenGraphImage(image) || ""

    return {
        // metadataBase: new URL(`/paintings/${params.slug}`),
        title: title,
        description: seoDescription,
        openGraph: {
            images: [ogImage, ...previousImages],
        },
    }
}

export const revalidate = 3600 // every hour

export function generateStaticParams() {
    return generateStaticSlugs("painting")
}

export default async function LandingPage({ params }: Props) {
    const initial = await loadPainting(params.slug)

    if (!initial) {
        return notFound()
    }

    const { data } = initial

    if (!data) {
        return notFound()
    }

    // const {
    //     title = "Not found",
    //     description = "",
    //     seoDescription,
    //     slug = "",
    //     image,
    //     paintedAt,
    // } = data

    // const selectedDescription = seoDescription || description

    // regex to remove all html from description text and line breaks
    // const regex = /(<([^>]+)>)/gi
    // const descriptionText = selectedDescription.replace(regex, "")
    // const removedLineBreaks = descriptionText.replace(/(\r\n|\n|\r)/gm, "")

    // const paintingUrl = `https://wisihe.no/paintings/${slug}`

    // const paintingImageUrl = urlForImage(image)
    //     .width(400)
    //     .height(400)
    //     .quality(75)
    //     .url()

    // const jsonLd = {
    //     "@context": "https://schema.org",
    //     "@type": "VisualArtwork",
    //     name: title,
    //     url: paintingUrl,
    //     image: paintingImageUrl,
    //     author: {
    //         "@type": "Person",
    //         name: "Henrik Wilhelm Sissener",
    //         url: "https://wisihe.no/about",
    //     },
    //     creator: {
    //         "@type": "Person",
    //         name: "Henrik Wilhelm Sissener",
    //         url: "https://wisihe.no/about",
    //     },
    //     artworkSurface: "Digital",
    //     artMedium: "Digital",
    //     artform: "Digital Painting",
    //     dateCreated: paintedAt,
    //     description: removedLineBreaks,

    //     inLanguage: "en",
    //     copyrightHolder: {
    //         "@type": "Person",
    //         name: "Henrik Wilhelm Sissener",
    //         url: "https://wisihe.no/about",
    //     },
    // }

    if (draftMode().isEnabled) {
        return (
            <Main className="grid min-h-screen grid-cols-12 pt-16 mx-auto lg:pt-20 lg:p-4 max-w-screen-3xl lg:gap-4 overflow-clip">
                <PaintingPagePreview params={params} initial={initial} />
            </Main>
        )
    }

    return (
        <>
            {/* <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            /> */}
            <Main
                noTopPadding
                className="grid min-h-screen grid-cols-12 pt-16 mx-auto lg:pt-20 lg:p-4 max-w-screen-3xl lg:gap-4 overflow-clip"
            >
                <PaintingPage painting={data!} />
            </Main>
        </>
    )
}
