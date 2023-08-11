"use client"
import clsx from "clsx"
import AnimatedLogo from "components/atoms/AnimatedLogo"
import NavigationModal from "components/molecules/NavigationModal"
import { NavItems } from "constants/navigation"
import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { FaHamburger } from "react-icons/fa"
import { cn } from "utils/utility"

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
  const pathName = usePathname()

  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(false)
  }, [pathName])

  return (
    <>
      <nav
        aria-label="Main Navigation"
        className={clsx(
          "z-30 flex items-center justify-between py-2 px-4 bg-dark/40 backdrop-blur-sm text-white",
          isAbsolute ? "fixed top-0 left-0 right-0" : "relative",
        )}
      >
        <AnimatedLogo theme="light" />
        <motion.button
          initial={{ opacity: 0, scale: 0, x: 100 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{
            type: "spring",
            bounce: 0.05,
            // stiffness: 100,
            // damping: 5,
            duration: 1,
            // delay: 0.5,
          }}
          onClick={() => setIsOpen((prev) => !prev)}
          className="p-4 transition-all duration-500 lg:hidden hover:bg-primary active:text-white hover:text-white active:bg-primary"
          aria-expanded={isOpen}
          aria-label="Open Navigation"
        >
          <FaHamburger />
        </motion.button>

        <motion.ul
          key="nav"
          variants={container}
          initial="hidden"
          animate="show"
          className="items-center hidden gap-1 xl:gap-4 lg:flex"
        >
          {NavItems.map((item, i) => {
            const isActive = pathName?.includes(item.url)
            const { url, text, Icon } = item
            return (
              <motion.li key={i} variants={listItem}>
                <Link
                  href={url}
                  className={cn(
                    "transition-all gap-2 flex items-center mix-blend-difference text-white px-4 py-2 hover:bg-primary hover:text-white active:bg-primary",
                    isActive
                      ? "underline decoration-primary text-white decoration-2 bg-primary"
                      : " text-white",
                  )}
                >
                  {Icon && <Icon />}
                  <strong className="drop-shadow">{text}</strong>
                </Link>
              </motion.li>
            )
          })}
        </motion.ul>
      </nav>
      <NavigationModal
        isOpen={isOpen}
        closeModal={() => setIsOpen((prev) => !prev)}
      />
    </>
  )
}

export default Navigation
