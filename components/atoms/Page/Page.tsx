// react page wrapper that receives children
import { motion } from "framer-motion"
import PropTypes from "prop-types"
import React from "react"

const Page = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ type: "spring", duration: 0.5 }}
    >
      {children}
    </motion.div>
  )
}

Page.propTypes = {
  children: PropTypes.any,
}

export default Page
