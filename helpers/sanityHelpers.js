/* eslint-disable no-unsafe-finally */
import ImageUrlBuilder from "@sanity/image-url";

const builders = {
  default: ImageUrlBuilder({
    projectId: "cbjsv7wi",
    dataset: "production",
    apiVersion: "2021-08-31",
    useCdn: true,
  }),
};

// Helper for tailoring Sanity images.
// Guide: https://www.sanity.io/docs/client-libraries/image-url
function urlFor(source) {
  return builders.default.image(source);
}

export { urlFor, builders };
