"use client"
import { getClient } from "lib/sanity"
import { LiveQueryProvider } from "next-sanity/preview"
import { useMemo } from "react"

interface PreviewProvider {
    children: React.ReactNode
    preview: boolean
}

export default function PreviewProvider({
    children,
    preview,
}: PreviewProvider) {
    const client = useMemo(() => getClient(preview), [preview])

    return (
        <LiveQueryProvider client={client} logger={console}>
            {children}
        </LiveQueryProvider>
    )
}
