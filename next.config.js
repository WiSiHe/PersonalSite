/* eslint-disable @typescript-eslint/no-var-requires */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  reactStrictMode: true,
  images: {
    domains: ["cdn.sanity.io", "cdna.artstation.com", "images.unsplash.com"],
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
