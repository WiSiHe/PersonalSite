import clsx from "clsx"
import LogoQR from "components/atoms/icons/LogoQR"
import { NavItems } from "constants/navigation"
import { AnimatePresence, m } from "framer-motion"
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
        "z-20 flex items-center justify-between py-2 mx-auto px-4",
        isAbsolute ? "absolute top-0 left-0 right-0" : "relative"
      )}
    >
      <m.div
        initial={{ opacity: 0, x: -100, rotate: -180 }}
        animate={{ opacity: 1, x: 0, rotate: 0 }}
        transition={{ type: "spring", bounce: 0.25 }}
        whileHover={{
          rotate: 90,
        }}
        className="flex items-center gap-2"
      >
        <Link
          href="/"
          aria-label="Navigate to the homepage"
          className="flex items-center justify-center p-1 text-sm bg-white rounded-lg drop-shadow focus-visible:fill-white decoration-4 focus:fill-white focus:outline-none mix-blend-difference"
        >
          <LogoQR
            className="transition-all ease-in-out fill-dark"
            width="2.5rem"
            height="2.5rem"
          />
        </Link>
      </m.div>

      <m.ul
        variants={container}
        initial="hidden"
        animate="show"
        className="flex items-center gap-1 xl:gap-4"
      >
        <AnimatePresence>
          {NavItems.map((item, i) => {
            const isActive = asPathWithSpacing.includes(item.url)
            return (
              <m.li key={i} variants={listItem}>
                <Link
                  href={item.url}
                  className={clsx(
                    "transition-all mix-blend-difference text-dark px-4 py-2 rounded-lg drop-shadow hover:bg-primary hover:text-white underline-offset-2  hover:decoration-primary  active:bg-primary focus:outline-none",
                    isActive
                      ? "underline decoration-primary text-white decoration-2 bg-primary"
                      : "bg-white"
                  )}
                >
                  <strong className="drop-shadow">{item.text}</strong>
                </Link>
              </m.li>
            )
          })}
        </AnimatePresence>
      </m.ul>
    </nav>
  )
}

export default Navigation