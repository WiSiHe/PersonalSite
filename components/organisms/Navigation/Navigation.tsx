"use client"
import clsx from "clsx"
import AnimatedLogo from "components/atoms/AnimatedLogo"
import NavigationModal from "components/molecules/NavigationModal"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { FaHamburger } from "react-icons/fa"

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
          "z-20 flex items-center justify-between py-2 px-4 bg-dark/80 text-white",
          isAbsolute ? "fixed top-0 left-0 right-0" : "relative"
        )}
      >
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="z-20 p-4 transition-all hover:bg-primary active:text-white hover:text-white active:bg-primary"
          aria-expanded={isOpen}
          aria-label="Open Navigation"
        >
          <FaHamburger />
        </button>
        <AnimatedLogo theme="light" />
      </nav>
      <NavigationModal
        isOpen={isOpen}
        closeModal={() => setIsOpen((prev) => !prev)}
      />
    </>
  )
}

export default Navigation
