import clsx from "clsx"
import { motion } from "framer-motion"
import PropTypes from "prop-types"
import React from "react"

import SocialLinks from "../SocialLinks/SocialLinks"

export default function Footer({ fixed = false, onlyMobile = false }) {
  return (
    <motion.footer
      initial={{ y: 50 }}
      animate={{ y: 0 }}
      exit={{ y: 50 }}
      transition={{
        type: "spring",
      }}
      className={clsx(
        "w-full p-4 text-white bg-primary",
        fixed && "fixed bottom-0",
        onlyMobile && " block lg:hidden"
      )}
    >
      <SocialLinks />
    </motion.footer>
  )
}

Footer.propTypes = {
  fixed: PropTypes.bool,
  onlyMobile: PropTypes.bool,
}
