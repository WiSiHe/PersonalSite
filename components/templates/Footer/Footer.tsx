import clsx from "clsx"
import { motion } from "framer-motion"
import React from "react"

import SocialLinks from "../../molecules/SocialLinks/SocialLinks"

interface iFooterProps {
  fixed?: boolean
  onlyMobile?: boolean
}

const Footer = ({ fixed = false, onlyMobile = false }: iFooterProps) => {
  return (
    <motion.footer
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
    </motion.footer>
  )
}

export default Footer
