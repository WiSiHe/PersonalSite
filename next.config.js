/* eslint-disable @typescript-eslint/no-var-requires */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: true,
  },
  images: {
    domains: [
      "cdn.sanity.io",
      "cdna.artstation.com",
      "images.unsplash.com",
      "oaidalleapiprodscus.blob.core.windows.net",
    ],
  },
}

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

module.exports = withBundleAnalyzer(nextConfig)

// module.exports = {
//   /* config options here */
//   images: {
//     domains: ["cdn.sanity.io", "cdna.artstation.com"]
//   }
// }

// module.exports = (phase, { defaultConfig }) => {
//   return withBundleAnalyzer(nextConfig)
// }
