// "use client"
// import Main from "components/atoms/Main/Main"
// import { NextStudio } from "next-sanity/studio"
// import { StudioLayout, StudioProvider } from "sanity"
// import config from "sanity.config"

// export default async function StudioPage() {
//     return (
//         <Main className="flex-col h-[95vh] pt-2">
//             <NextStudio config={config}>
//                 <StudioProvider config={config}>
//                     <StudioLayout />
//                 </StudioProvider>
//             </NextStudio>
//         </Main>
//     )
// }

/**
 * This route is responsible for the built-in authoring environment using Sanity Studio v3.
 * All routes under /studio will be handled by this file using Next.js' catch-all routes:
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 *
 * You can learn more about the next-sanity package here:
 * https://github.com/sanity-io/next-sanity
 */

import Studio from "./Studio"

export const dynamic = "force-static"

export { metadata } from "next-sanity/studio/metadata"
export { viewport } from "next-sanity/studio/viewport"

export default function StudioPage() {
    return <Studio />
}
