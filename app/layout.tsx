import "styles/globals.css"

import { Analytics } from "@vercel/analytics/react"
import SkipToMainContentLink from "components/atoms/SkipToMainContentLink"
import Navigation from "components/organisms/Navigation"
import Footer from "components/templates/Footer"
import { Alice, Inter, Playfair_Display, Roboto, Syne } from "next/font/google"
import NextTopLoader from "nextjs-toploader"

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
})

const playfair = Playfair_Display({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-playfair",
})

const alice = Alice({
  // weight: ["400", "500", "600", "700"],
  weight: "400",
  subsets: ["latin"],
  variable: "--font-alice",
})

// const lobster = Lobster({
//   weight: "400",
//   subsets: ["latin"],
//   variable: "--font-lobster",
// })

export const metadata = {
  title: "Home | WiSiHe",
  description: "A gallery of some of my paintings and other projects",
  locale: "en-US",
  type: "website",
  url: "https://wisihe.no",
  openGraph: {
    title: "Home | WiSiHe",
    description: "A gallery of some of my paintings and other projects",
    locale: "en-US",
    type: "website",
    url: "https://wisihe.no",
    site_name: "WiSiHe",
    images: [
      {
        url: "https://cdn.sanity.io/images/cbjsv7wi/production/52654b01089c1b59a58b89c06ac9ddfd151359f8-3840x2160.png?rect=679,0,3161,2160&w=1200&h=820&q=75&fit=max&auto=format",
        width: 800,
        height: 600,
        alt: "WiSiHe",
      },
    ],
  },
  twitter: {
    image:
      "https://cdn.sanity.io/images/cbjsv7wi/production/52654b01089c1b59a58b89c06ac9ddfd151359f8-3840x2160.png?rect=679,0,3161,2160&w=1200&h=820&q=75&fit=max&auto=format",
    cardType: "summary_large_image",
    title: "Home | WiSiHe",
    description: "A gallery of some of my paintings and other projects",
    url: "https://wisihe.no",
    creator: "@wisihe",
    site: "https://wisihe.no",
    imageAlt: "WiSiHe",
    images: [
      {
        url: "https://cdn.sanity.io/images/cbjsv7wi/production/52654b01089c1b59a58b89c06ac9ddfd151359f8-3840x2160.png?rect=679,0,3161,2160&w=1200&h=820&q=75&fit=max&auto=format",
        width: 800,
        height: 600,
        alt: "WiSiHe",
      },
    ],
  },
}

interface RootProps {
  children: React.ReactNode
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: metadata.title,
  description: metadata.description,
  url: "https://wisihe.no",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://wisihe.no/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
}

const jsonLdSite = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://wisihe.no",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Projects",
      item: "https://wisihe.no/projects",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Project1",
      item: "https://wisihe.no/projects/project1",
    },
  ],
}

export default function RootLayout({ children }: RootProps) {
  // const preview = draftMode().isEnabled ? true : false

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/icons/wisihe.svg" sizes="any" />
        <meta name="theme-color" content="#DE0D92" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSite) }}
        />
      </head>
      <body
        className={`${inter.variable} ${roboto.variable} ${playfair.variable} ${alice.variable} font-alice selection:bg-primary selection:text-white`}
      >
        <SkipToMainContentLink />
        <NextTopLoader color="#DE0D92" showSpinner={false} height={4} />
        <Navigation />
        {/* {preview && (
          <Link
            href="/api/exit-preview"
            className="fixed z-30 p-4 text-white rounded shadow-xl bg-primary top-20 right-4"
          >
            <div>Exit Preview</div>
          </Link>
        )} */}
        {children}

        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
