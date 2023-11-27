import createImageUrlBuilder from "@sanity/image-url"

import { iSanityImage } from "@/lib/models/objects/sanityImage"

import { dataset, projectId } from "./api"

const imageBuilder = createImageUrlBuilder({
    projectId: projectId || "",
    dataset: dataset || "",
})

export const urlForImage = (source: iSanityImage | undefined) => {
    // Ensure that source image contains a valid reference
    if (!source?.asset?._ref) {
        return undefined
    }

    return imageBuilder?.image(source).auto("format").fit("max")
}

export function urlForOpenGraphImage(image: iSanityImage | undefined) {
    return urlForImage(image)?.width(1200).height(627).fit("crop").url()
}

export function resolveHref(
    documentType?: string,
    slug?: string,
): string | undefined {
    switch (documentType) {
        case "home":
            return "/"
        case "painting":
            return slug ? `/paintings/${slug}` : undefined
        case "page":
            return slug ? `/${slug}` : undefined
        case "project":
            return slug ? `/projects/${slug}` : undefined
        default:
            console.warn("Invalid document type:", documentType)
            return undefined
    }
}
