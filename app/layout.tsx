import "styles/globals.css"

import { Analytics } from "@vercel/analytics/react"
import SkipToMainContentLink from "components/atoms/SkipToMainContentLink"
import Navigation from "components/organisms/Navigation"
import Footer from "components/templates/Footer"
import { Inter, Lobster, Roboto } from "next/font/google"

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-roboto",
})

const lobster = Lobster({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-lobster",
})

export const metadata = {
  title: "Home | WiSiHe",
  description: "A gallery of some of my paintings and other projects",
  locale: "en-US",
  type: "website",
}

interface RootProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootProps) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/icons/wisihe.svg" sizes="any" />
      </head>
      <body
        className={`${inter.variable} ${roboto.variable} ${lobster.variable} font-inter`}
      >
        <SkipToMainContentLink />
        <Navigation />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
