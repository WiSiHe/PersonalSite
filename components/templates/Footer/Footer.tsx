import clsx from "clsx"
import SocialLinks from "components/molecules/SocialLinks/SocialLinks"
import { motion } from "framer-motion"
import Link from "next/link"
import React from "react"

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
        "w-full p-8 xl:p-4 text-white bg-dark flex  items-center justify-center  gap-4",
        fixed && "fixed bottom-0",
        onlyMobile && " block lg:hidden"
      )}
    >
      <SocialLinks />
      <Link href="/test">Test Page</Link>
    </motion.footer>
  )
}

export default Footer
