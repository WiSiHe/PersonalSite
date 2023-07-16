"use client"
import clsx from "clsx"
import AnimatedLogo from "components/atoms/AnimatedLogo"
import NavigationModal from "components/molecules/NavigationModal"
import React, { useState } from "react"
import { FaHamburger } from "react-icons/fa"

interface iNavigationProps {
  isAbsolute?: boolean
}
const Navigation = ({ isAbsolute = true }: iNavigationProps) => {
  const [isOpen, setIsOpen] = useState(false)
  console.log("isOpen", isOpen)
  return (
    <>
      <nav
        aria-label="Main Navigation"
        className={clsx(
          "z-20 flex items-center justify-between py-2 px-4",
          isAbsolute ? "absolute top-0 left-0 right-0" : "relative"
        )}
      >
        <AnimatedLogo />
        <button onClick={() => setIsOpen((prev) => !prev)}>
          <FaHamburger />
        </button>
      </nav>
      <NavigationModal
        isOpen={isOpen}
        closeModal={() => setIsOpen((prev) => !prev)}
      />
    </>
  )
}

export default Navigation
