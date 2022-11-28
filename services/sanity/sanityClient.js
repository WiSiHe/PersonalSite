// import React from "react";

import imageUrlBuilder from "@sanity/image-url"

import config from "./config"

const builder = imageUrlBuilder({
  projectId: config.projectId,
  dataset: config.dataset
})

// Then we like to make a simple function like this that gives the
// builder an image and returns the builder for you to specify additional
// parameters:
export function urlFor(source) {
  return builder.image(source)
}
