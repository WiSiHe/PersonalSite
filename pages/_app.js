import PropTypes from "prop-types"
import React from "react"
import "tailwindcss/tailwind.css"
import { Analytics } from "@vercel/analytics/react"
import { Page } from "components"
import { AnimatePresence } from "framer-motion"

const MyApp = function ({ Component, pageProps }) {
  return (
    <>
      <AnimatePresence initial={false}>
        <Page>
          <Component {...pageProps} />
        </Page>
      </AnimatePresence>
      <Analytics />
    </>
  )
}

MyApp.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any
}

export default MyApp
