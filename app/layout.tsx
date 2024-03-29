import "styles/globals.css"

import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Viewport } from "next"
import dynamic from "next/dynamic"
import { Inter, Oswald } from "next/font/google"
import { draftMode } from "next/headers"
// import VisualEditing from "@/sanity/loader/VisualEditing"
import { VisualEditing } from "next-sanity"
import { Suspense } from "react"

import SkipToMainContentLink from "@/components/atoms/SkipToMainContentLink"
import ThemeProvider from "@/components/atoms/ThemeProvider"
import Navigation from "@/components/organisms/Navigation"
import LiveVisualEditing from "@/sanity/loader/LiveVisaulEditing"
import { cn } from "@/utils/utility"

interface RootProps {
    children: React.ReactNode
}

const Footer = dynamic(() => import("@/components/templates/Footer"))

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter",
})
const oswald = Oswald({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-oswald",
})

export const metadata = {
    metadataBase: new URL("/", "https://wisihe.no"),
    title: "Home | WiSiHe",
    description: "A gallery of some of my paintings and other projects",
    locale: "no_NO",
    lang: "en",
    type: "website",
    url: "https://wisihe.no",
    keywords: [
        "wisihe",
        "art",
        "painting",
        "gallery",
        "projects",
        "portfolio",
        "website",
        "web development",
        "web design",
        "web developer",
        "web designer",
        "developer",
        "designer",
        "react",
        "nextjs",
        "sanity",
        "tailwindcss",
        "typescript",
        "javascript",
        "html",
        "css",
        "scss",
        "sass",
        "git",
        "github",
        "vercel",
        "netlify",
        "nodejs",
        "npm",
        "yarn",
        "vscode",
        "visual studio code",
        "figma",
    ],
    // colorScheme: "light",
    author: { name: "Henrik Wilhelm Sissener", url: "https://wisihe.no" },
    applicationName: "WiSiHe",
    // themeColor: "#DE0D92",
    // openGraph: {
    //     title: "Home | WiSiHe",
    //     description: "A gallery of some of my paintings and other projects",
    //     locale: "en-US",
    //     type: "website",
    //     url: "https://wisihe.no",
    //     site_name: "WiSiHe",
    //     images: [
    //         {
    //             url: "https://cdn.sanity.io/images/cbjsv7wi/production/52654b01089c1b59a58b89c06ac9ddfd151359f8-3840x2160.png?rect=679,0,3161,2160&w=1200&h=820&q=75&fit=max&auto=format",
    //             width: 800,
    //             height: 600,
    //             alt: "WiSiHe",
    //         },
    //     ],
    // },
}

export const viewport: Viewport = {
    themeColor: "#DE0D92",
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
    return (
        <html lang="en" className="scroll-smooth">
            <head>
                <link rel="icon" href="/icons/wisihe.svg" sizes="any" />
                <meta name="theme-color" content="#DE0D92" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(jsonLd),
                    }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(jsonLdSite),
                    }}
                />
            </head>
            <body
                className={cn(
                    inter.variable,
                    oswald.variable,
                    "font-inter selection:bg-primary selection:text-white",
                )}
            >
                <ThemeProvider>
                    <SkipToMainContentLink />
                    {/* <NextTopLoader color="#DE0D92" showSpinner={false} height={5} /> */}
                    <Suspense>
                        <Navigation />
                    </Suspense>
                    <Suspense>{children}</Suspense>
                    <Suspense>
                        <Footer />
                    </Suspense>
                    <Analytics />
                    <SpeedInsights />
                    {draftMode().isEnabled && <LiveVisualEditing />}
                </ThemeProvider>
            </body>
        </html>
    )
}
