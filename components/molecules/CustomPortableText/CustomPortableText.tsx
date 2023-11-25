import { PortableText, PortableTextComponents } from "@portabletext/react"
import Link from "next/link"
import { Image, TypedObject } from "sanity"

import ImageBox from "@/components/atoms/ImageBox"

export function CustomPortableText({
    paragraphClasses,
    value,
}: {
    paragraphClasses?: string
    value?: TypedObject[]
}) {
    if (!value) return null

    const components: PortableTextComponents = {
        block: {
            normal: ({ children }) => {
                return <p className={paragraphClasses}>{children}</p>
            },
        },
        marks: {
            link: ({ children, value }) => {
                return (
                    <a
                        className="underline transition hover:opacity-50"
                        href={value?.href}
                        rel="noreferrer noopener"
                    >
                        {children}
                    </a>
                )
            },
            internalLink: ({ children, value }) => {
                const { reference } = value ?? {}
                return (
                    <Link
                        className="underline transition hover:opacity-50"
                        href={reference}
                    >
                        {children}
                    </Link>
                )
            },
        },
        types: {
            image: ({
                value,
            }: {
                value: Image & { alt?: string; caption?: string }
            }) => {
                return (
                    <div className="my-6 space-y-2">
                        <ImageBox
                            image={value}
                            alt={value.alt}
                            classesWrapper="relative aspect-[16/9]"
                        />
                        {value?.caption && (
                            <div className="font-sans text-sm text-gray-600">
                                {value.caption}
                            </div>
                        )}
                    </div>
                )
            },
            //   timeline: ({ value }) => {
            //     const { items } = value || {}
            //     return <TimelineSection timelines={items} />
            //   },
        },
    }

    return <PortableText components={components} value={value} />
}

export default CustomPortableText
