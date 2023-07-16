"use client"
import { motion } from "framer-motion"
import Link from "next/link"

import LogoQR from "../icons/LogoQR"

const AnimatedLogo = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100, rotate: -180, scale: 0.5 }}
      animate={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
      transition={{ type: "spring" }}
      whileHover={{
        rotate: 90,
        scale: 1.1,
        transition: { type: "spring", stiffness: 300, damping: 10 },
      }}
      className="flex items-center gap-2"
    >
      <Link
        href="/"
        aria-label="Navigate to the homepage"
        className="flex items-center justify-center p-1 text-sm drop-shadow decoration-4"
      >
        <LogoQR
          className="transition-all ease-in-out fill-dark"
          width="2.5rem"
          height="2.5rem"
        />
      </Link>
    </motion.div>
  )
}

export default AnimatedLogo
