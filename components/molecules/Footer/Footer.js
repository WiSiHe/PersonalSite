import clsx from "clsx"
import { m } from "framer-motion"
import PropTypes from "prop-types"
import React from "react"

import SocialLinks from "../../SocialLinks/SocialLinks"

export default function Footer({ fixed = false, onlyMobile = false }) {
  return (
    <m.footer
      initial={{ y: 50 }}
      animate={{ y: 0 }}
      exit={{ y: 50 }}
      transition={{
        type: "spring",
      }}
      className={clsx(
        "w-full p-4 text-white bg-dark",
        fixed && "fixed bottom-0",
        onlyMobile && " block lg:hidden"
      )}
    >
      <SocialLinks />
    </m.footer>
  )
}

Footer.propTypes = {
  fixed: PropTypes.bool,
  onlyMobile: PropTypes.bool,
}
