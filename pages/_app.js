import "styles/globals.css"

import { Analytics } from "@vercel/analytics/react"
import Navigation from "components/molecules/Navigation/Navigation"
import { domAnimation, LazyMotion } from "framer-motion"
import { Inter, Lobster, Roboto } from "next/font/google"
import PropTypes from "prop-types"
import React from "react"

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

// import localFont from "@next/font/local"
// const myFont = localFont({ src: "/fonts/MyFont.woff2", name: "MyFont" })

const MyApp = function ({ Component, pageProps }) {
  return (
    <>
      <LazyMotion features={domAnimation}>
        <div
          className={`${inter.variable} ${roboto.variable} ${lobster.variable} font-inter`}
          // className={`${lobster.variable} font-lobster`}
        >
          {/* <div className="cursor-none"> */}
          <Navigation />
          {/* <Cursor /> */}
          <Component {...pageProps} />
          {/* </div> */}
        </div>
      </LazyMotion>
      <Analytics
        beforeSend={(event) => {
          // Ignore all events that have a `/private` inside the URL
          if (event.url.includes("studio")) {
            return null
          }
          if (event.url.includes("test")) {
            return null
          }
          return event
        }}
      />
    </>
  )
}

MyApp.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any,
}

export default MyApp
