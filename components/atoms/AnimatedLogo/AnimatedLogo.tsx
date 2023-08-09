"use client"
import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"
import { cn } from "utils/utility"

import LogoQR from "../icons/LogoQR"

type theme = "light" | "dark"

interface AnimatedLogo {
  theme: theme
}

const AnimatedLogo = ({ theme }: AnimatedLogo) => {
  const colorTheme = {
    light: "fill-white",
    dark: "fill-dark",
  }
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{
          rotate: 90,
        }}
        transition={{ type: "spring", delay: 0.5, duration: 1 }}
        className="flex items-center gap-2"
      >
        <Link
          href="/"
          aria-label="Navigate to the homepage"
          className="flex items-center justify-center p-1 text-sm drop-shadow decoration-4"
        >
          <LogoQR
            className={(cn("transition-all ease-in-out"), colorTheme[theme])}
            width="2.5rem"
            height="2.5rem"
          />
        </Link>
      </motion.div>
    </AnimatePresence>
  )
}

export default AnimatedLogo
