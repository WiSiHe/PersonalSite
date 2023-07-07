import { getClient } from "lib/sanity"
import { LiveQueryProvider } from "next-sanity/preview"
import { useMemo } from "react"

export default function PreviewProvider({
  children,
  preview,
}: {
  children: React.ReactNode
  preview: boolean
}) {
  const client = useMemo(() => getClient(preview), [preview])
  return (
    <LiveQueryProvider client={client} logger={console}>
      {children}
    </LiveQueryProvider>
  )
}
