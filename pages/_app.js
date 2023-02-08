import "tailwindcss/tailwind.css"

import { Analytics } from "@vercel/analytics/react"
import { Navigation } from "components"
import { domAnimation, LazyMotion } from "framer-motion"
import PropTypes from "prop-types"
import React from "react"

const MyApp = function ({ Component, pageProps }) {
  return (
    <>
      <LazyMotion features={domAnimation}>
        <Navigation />
        <Component {...pageProps} />
      </LazyMotion>
      <Analytics />
    </>
  )
}

MyApp.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any,
}

export default MyApp
