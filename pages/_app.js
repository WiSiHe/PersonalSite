import PropTypes from "prop-types"
import React from "react"
import "tailwindcss/tailwind.css"

const MyApp = function ({ Component, pageProps }) {
  return <Component {...pageProps} />
}

MyApp.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any
}

export default MyApp
