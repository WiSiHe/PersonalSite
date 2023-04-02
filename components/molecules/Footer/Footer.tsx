import clsx from "clsx"
import { m } from "framer-motion"
import React from "react"

import SocialLinks from "../SocialLinks/SocialLinks"

interface iFooterProps {
  fixed?: boolean
  onlyMobile?: boolean
}

const Footer = ({ fixed = false, onlyMobile = false }: iFooterProps) => {
  return (
    <m.footer
      initial={{ y: 50 }}
      animate={{ y: 0 }}
      exit={{ y: 50 }}
      transition={{
        type: "spring",
      }}
      className={clsx(
        "w-full p-8 xl:p-4 text-white bg-dark",
        fixed && "fixed bottom-0",
        onlyMobile && " block lg:hidden"
      )}
    >
      <SocialLinks />
    </m.footer>
  )
}

export default Footer
