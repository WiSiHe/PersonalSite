import { apiVersion, dataset, projectId, useCdn } from "lib/sanity.api"
import { SanityClient, createClient } from "next-sanity"

export function getClient(preview?: boolean): SanityClient {
  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn,
    perspective: "published",
  })
  if (preview) {
    const token = process.env.SANITY_API_READ_TOKEN

    // if (!token) {
    //   throw new Error("You must provide a token to preview drafts")
    // }
    return client.withConfig({
      token: token,
      useCdn: false,
      ignoreBrowserTokenWarning: true,
      perspective: "previewDrafts",
    })
  }
  return client
}
