import { SanityImageSource } from "@sanity/asset-utils"
import { createClient, createImageUrlBuilder, createPreviewSubscriptionHook } from "next-sanity"
import { ImageItem } from "./models/objects/image-item"
import { Image as MainImage } from "./models/sections/image"

const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "undefined",
  apiVersion: "2021-08-31",
  // useCdn: process.env.NODE_ENV === "production"
  // useCdn:
  //   typeof document !== 'undefined' && process.env.NODE_ENV === 'production',
  useCdn: true
}

export const urlFor = (source: SanityImageSource | MainImage | ImageItem) =>
  createImageUrlBuilder(config).image(source)

export const imageBuilder = source =>
  createImageUrlBuilder(config).image(source).auto("format").fit("max")

export const usePreviewSubscription = createPreviewSubscriptionHook(config)

export const client = createClient(config)

export const previewClient = createClient({
  ...config,
  useCdn: true
  // token: process.env.SANITY_API_TOKEN,
})

export const getClient = usePreview => (usePreview ? previewClient : client)
export default client
