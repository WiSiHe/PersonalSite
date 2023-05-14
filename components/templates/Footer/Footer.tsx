"use client"

import SocialLinks from "components/molecules/SocialLinks/SocialLinks"
import { motion } from "framer-motion"
import Link from "next/link"
import React from "react"

const Footer = () => {
  return (
    <motion.footer
      initial={{ y: 50 }}
      animate={{ y: 0 }}
      exit={{ y: 50 }}
      transition={{
        type: "spring",
      }}
      className="flex items-center justify-center w-full gap-4 p-10 text-white bg-dark"
    >
      <SocialLinks />
      <Link href="/test">Test Page</Link>
    </motion.footer>
  )
}

export default Footer
