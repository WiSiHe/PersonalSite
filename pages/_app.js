import PropTypes from "prop-types"
import React from "react"
import "tailwindcss/tailwind.css"
import { Analytics } from "@vercel/analytics/react"

const MyApp = function ({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  )
}

MyApp.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any
}

export default MyApp
