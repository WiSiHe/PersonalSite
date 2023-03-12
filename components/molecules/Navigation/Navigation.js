import clsx from "clsx"
import LogoQR from "components/atoms/icons/LogoQR"
import { NavItems } from "constants/navigation"
import { AnimatePresence, m } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/router"
import PropTypes from "prop-types"
import React from "react"

// const container = {
//   hidden: { opacity: 0 },
//   show: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.2,
//       delayChildren: 0.4,
//       type: "spring",
//     },
//   },
//   transition: {
//     staggerChildren: 0.2,
//     delayChildren: 0.4,
//     type: "spring",
//   },
// }

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

// const animItem = {
//   initial: { opacity: 0, y: -100 },
//   animate: { opacity: 1, y: 0 },
// }

// const listItem = {
//   hidden: { opacity: 0, y: -100 },
//   show: { opacity: 1, y: 0 },
// }

export default function Navigation({ isAbsolute = false }) {
  const router = useRouter()
  const { asPath = "" } = router
  const asPathWithSpacing = asPath.replace(/\//g, "/")

  return (
    <nav
      aria-label="Main Navigation"
      className={clsx(
        "bg-dark backdrop-blur-lg z-20 text-white",
        isAbsolute ? "absolute top-0 left-0 right-0" : "relative",
        "flex items-center justify-between px-2 py-2 mx-auto xl:px-4"
      )}
    >
      <m.div
        initial={{ opacity: 0, x: -100, rotate: -180 }}
        animate={{ opacity: 1, x: 0, rotate: 0 }}
        transition={{ type: "spring", bounce: 0.25 }}
        whileHover={{
          scale: 1.1,
          rotate: 90,
          transition: { type: "spring", delay: 0, duration: 0.5, bounce: 0.25 },
        }}
        className="flex items-center gap-2"
      >
        <Link
          href="/"
          aria-label="Navigate to the homepage"
          className="flex items-center justify-center text-sm text-white focus-visible:fill-primary decoration-4 focus:fill-primary focus:outline-none"
        >
          <LogoQR
            className="transition-all ease-in-out fill-white hover:fill-primary focus:fill-primary"
            width="2.5rem"
            height="2.5rem"
          />
        </Link>
      </m.div>

      <m.ul
        className="flex items-center gap-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <AnimatePresence>
          {NavItems.map((item, i) => {
            const isActive = asPathWithSpacing.includes(item.url)
            return (
              <m.li
                key={i}
                // variants={listItem}
                initial={{ opacity: 0, y: -200, x: -100 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{
                  type: "spring",
                  delay: 0.2 * (i * 0.4),
                  bounce: 0.25,
                }}
              >
                <Link
                  href={item.url}
                  className={clsx(
                    "transition-all hover:text-primary hover:decoration-2 hover:underline underline-offset-2  hover:decoration-primary  active:bg-primary focus:outline-none focus-visible:underline",
                    isActive &&
                      "underline decoration-primary text-primary decoration-2"
                  )}
                >
                  <strong>{item.text}</strong>
                </Link>
              </m.li>
            )
          })}
        </AnimatePresence>
      </m.ul>
    </nav>
  )
}

Navigation.propTypes = {
  isAbsolute: PropTypes.bool,
}
