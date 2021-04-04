import {
  groq,
  createClient,
  createImageUrlBuilder,
  createPreviewSubscriptionHook,
} from "next-sanity";

const config = {
  projectId: "cbjsv7wi",
  dataset: "production",
  useCdn: false,
};

export const imageBuilder = (source) =>
  createImageUrlBuilder(config).image(source);
export const usePreviewSubscription = createPreviewSubscriptionHook(config);
export const client = createClient(config);
export const previewClient = createClient({
  ...config,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

export const getClient = (usePreview) => (usePreview ? previewClient : client);
export default client;
