import PropTypes from "prop-types"
import React from "react"

export default function Tag({ children }) {
  return <div className="px-2 py-1">{children}</div>
}

Tag.propTypes = {
  children: PropTypes.any
}
