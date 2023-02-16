import "tailwindcss/tailwind.css"

import { Analytics } from "@vercel/analytics/react"
import { Loader, Navigation } from "components"
import { domAnimation, LazyMotion, m } from "framer-motion"
import { AnimatePresence } from "framer-motion"
import PropTypes from "prop-types"
import React from "react"

const MyApp = function ({ Component, pageProps }) {
  return (
    <>
      <LazyMotion features={domAnimation}>
        <AnimatePresence>
          <m.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 0, y: 1000 }}
            transition={{ duration: 1, delay: 1, type: "spring" }}
            className="absolute inset-0 z-30 pointer-events-none bg-dark"
          >
            <Loader />
          </m.div>
        </AnimatePresence>
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
