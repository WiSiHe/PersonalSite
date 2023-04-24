import clsx from "clsx"
import LogoQR from "components/atoms/icons/LogoQR"
import { NavItems } from "constants/navigation"
import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
      bounce: 0.05,
      type: "spring",
    },
  },
}

const listItem = {
  hidden: { opacity: 0, y: -100 },
  show: { opacity: 1, y: 0 },
}

interface iNavigationProps {
  isAbsolute?: boolean
}
const Navigation = ({ isAbsolute = true }: iNavigationProps) => {
  const router = useRouter()
  const { asPath = "" } = router
  const asPathWithSpacing = asPath.replace(/\//g, "/")

  return (
    <nav
      aria-label="Main Navigation"
      className={clsx(
        "z-20 flex items-center justify-between py-2 mx-auto px-4 max-w-screen-3xl",
        isAbsolute ? "absolute top-0 left-0 right-0" : "relative"
      )}
    >
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

      <motion.ul
        variants={container}
        initial="hidden"
        animate="show"
        className="flex items-center gap-1 xl:gap-4"
      >
        <AnimatePresence>
          {NavItems.map((item, i) => {
            const isActive = asPathWithSpacing.includes(item.url)
            return (
              <motion.li key={i} variants={listItem}>
                <Link
                  href={item.url}
                  className={clsx(
                    "transition-all mix-blend-difference text-dark px-4 py-2 rounded-lg hover:bg-primary hover:text-white   active:bg-primary",
                    isActive
                      ? "underline decoration-primary text-white decoration-2 bg-primary"
                      : " text-dark"
                  )}
                >
                  <strong className="drop-shadow">{item.text}</strong>
                </Link>
              </motion.li>
            )
          })}
        </AnimatePresence>
      </motion.ul>
    </nav>
  )
}

export default Navigation
