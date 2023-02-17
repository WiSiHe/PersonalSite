import "styles/globals.css"

import { Analytics } from "@vercel/analytics/react"
import { Cursor, Navigation } from "components"
import { domAnimation, LazyMotion } from "framer-motion"
import PropTypes from "prop-types"
import React from "react"

const MyApp = function ({ Component, pageProps }) {
  return (
    <>
      <LazyMotion features={domAnimation}>
        {/* <div className="cursor-none"> */}
        <Navigation />
        <Cursor />
        <Component {...pageProps} />
        {/* </div> */}
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
