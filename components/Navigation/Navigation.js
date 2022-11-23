import PropTypes from "prop-types"
import React from "react"

import Link from "next/link"
import clsx from "clsx"

import { NavItems } from "constants/navigation"
import { useRouter } from "next/router"
import { motion } from "framer-motion"
import LogoQR from "icons/LogoQR"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
      delayChildren: 0.5,
      type: "spring"
    }
  }
}

const animItem = {
  hidden: { opacity: 0, y: -20 },
  show: { opacity: 1, y: 0 }
}

export default function Navigation({ isAbsolute = false }) {
  const router = useRouter()
  const { asPath = "" } = router
  const asPathWithSpacing = asPath.replace(/\//g, "/")

  return (
    <motion.nav
      aria-label="Main Navigation"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{
        type: "spring"
      }}
      className={clsx(
        "bg-stone-900/90 backdrop-blur-lg z-20 text-white",
        isAbsolute ? "fixed top-0 left-0 right-0" : "relative"
      )}>
      <div className="flex items-center justify-between px-4 py-2 mx-auto">
        <div className="flex items-center">
          <motion.div
            initial={{ opacity: 0, x: -100, rotate: -180 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ type: "spring", delay: 0.5, bounce: 0.25 }}
            whileHover={{
              scale: 1.1,
              rotate: 90,
              transition: { type: "spring" }
            }}
            className="flex items-center gap-2 hover:text-red-500">
            <Link
              href="/"
              aria-label="Navigate to the homepage"
              className="flex items-center justify-center p-2 text-sm text-white hover:underline decoration-4 group-active:bg-highlight group-focus:ring group-focus:ring-highlight ">
              <LogoQR
                className="transition-all ease-in-out fill-white hover:fill-highlight"
                width="2.5rem"
                height="2.5rem"
              />
            </Link>
          </motion.div>
          <motion.ul
            className="flex items-center gap-4 px-4"
            variants={container}
            initial="hidden"
            animate="show">
            {NavItems.map((item, i) => {
              const isActive = asPathWithSpacing.includes(item.url)

              return (
                <motion.li key={i} variants={animItem}>
                  <Link
                    href={item.url}
                    className={clsx(
                      "transition-all hover:text-highlight hover:decoration-2  hover:decoration-highlight  active:bg-highlight focus:outline-none focus:ring focus:ring-highlight",
                      isActive &&
                        "underline underline-offset-1 decoration-highlight text-highlight decoration-2"
                    )}>
                    <b>{item.text}</b>
                  </Link>
                </motion.li>
              )
            })}
          </motion.ul>
        </div>
      </div>
    </motion.nav>
  )
}

Navigation.propTypes = {
  isAbsolute: PropTypes.bool
}
