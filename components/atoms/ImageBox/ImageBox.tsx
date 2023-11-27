import Image from "next/image"

import { iSanityImage } from "@/lib/models/objects/sanityImage"
import { urlForImage } from "@/sanity/lib/utils"

interface ImageBoxProps {
    image?: iSanityImage
    alt?: string
    width?: number
    height?: number
    size?: string
    classesWrapper?: string
    "data-sanity"?: string
}

export default function ImageBox({
    image,
    alt = "Cover image",
    width = 3500,
    height = 2000,
    size = "100vw",
    classesWrapper,
    ...props
}: ImageBoxProps) {
    const imageUrl =
        image &&
        urlForImage(image)?.height(height).width(width).fit("crop").url()

    return (
        <div
            className={`w-full overflow-hidden rounded-[3px] bg-gray-50 ${classesWrapper}`}
            data-sanity={props["data-sanity"]}
        >
            {imageUrl && (
                <Image
                    className="absolute w-full h-full"
                    alt={alt}
                    width={width}
                    height={height}
                    sizes={size}
                    src={imageUrl}
                />
            )}
        </div>
    )
}
