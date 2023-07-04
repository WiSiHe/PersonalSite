import { apiVersion, dataset, projectId, useCdn } from "lib/sanity.api"
import { SanityClient, createClient } from "next-sanity"

// import { Image as MainImage } from "./models/sections/image"

// const config = {
//   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "undefined",
//   dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
//   apiVersion: "2021-08-31",
//   useCdn: process.env.NODE_ENV === "production",
//   perspective: "published",
//   // useCdn:
//   //   typeof document !== 'undefined' && process.env.NODE_ENV === 'production',
//   // useCdn: true,
// }

export function getClient(preview?: { token: string }): SanityClient {
  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn,
    perspective: "published",
  })
  if (preview) {
    if (!preview.token) {
      throw new Error("You must provide a token to preview drafts")
    }
    return client.withConfig({
      token: preview.token,
      useCdn: false,
      ignoreBrowserTokenWarning: true,
      perspective: "previewDrafts",
    })
  }
  return client
}
