import Head from "next/head"
import React from "react"

type MetaProps = {
    title?: string
    description?: string
    image?: string
    ogTitle?: string
    ogDescription?: string
    ogImage?: string
    jsonLd?: string
    url?: string
}

const DEFAULT_TAGS = {
    title: "WiSiHe",
    description:
        "WiSiHe is a digital agency that creates digital solutions for the web and mobile.",
    image: "/images/wisihe.png",
    url: "https://wisihe.no",
}

const Meta = ({
    title,
    description,
    image,
    ogTitle,
    ogDescription,
    ogImage,
    jsonLd,
    url,
}: MetaProps) => {
    return (
        <Head>
            <title>{title ? `${title} - WiSiHe` : DEFAULT_TAGS.title}</title>
            <link rel="icon" href="/icons/wisihe.svg" />
            {/* <link rel="icon" href="/favicon.png" /> */}
            <link rel="manifest" href="/manifest.json" />
            {url && <link rel="canonical" href={url || DEFAULT_TAGS.url} />}
            <meta
                name="description"
                content={description || DEFAULT_TAGS.description}
            />
            <meta
                property="og:title"
                content={ogTitle || title || DEFAULT_TAGS.title}
                key="title"
            />
            <meta
                property="og:description"
                content={
                    ogDescription || description || DEFAULT_TAGS.description
                }
                key="description"
            />
            <meta
                property="og:image"
                content={ogImage || image || DEFAULT_TAGS.image}
                key="image"
            />
            <meta property="og:url" content="https://wisihe.no" key="url" />
            {jsonLd && (
                <script
                    key={`jobJSON-${title}`}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: jsonLd }}
                />
            )}
        </Head>
    )
}

export default Meta
