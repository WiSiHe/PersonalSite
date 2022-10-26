import PropTypes from "prop-types"
import React from "react"

import Link from "next/link"
import clsx from "clsx"

import { NavItems } from "constants/navigation"
import { useRouter } from "next/router"

export default function Navigation({ hideOnDesktop = false, isAbsolute = false }) {
  const router = useRouter()
  return (
    <nav
      aria-label="Main Navigation"
      aria-hidden={hideOnDesktop}
      className={clsx(
        "bg-stone-900/70 backdrop-blur-lg text-white",
        hideOnDesktop && "xl:hidden",
        isAbsolute ? "fixed z-10 top-0 left-0 right-0 " : "relative"
      )}>
      <div className="flex items-center justify-between px-4 py-2 mx-auto">
        <div className="flex items-center">
          <Link
            href="/"
            className="flex items-center justify-center p-2 text-sm group-active:bg-highlight group-focus:ring group-focus:ring-highlight ">
            <strong className="font-bold hover:text-highlight">WiSiHe</strong>
          </Link>
          <span>|</span>
          <ul className="flex items-center gap-4 px-4">
            {NavItems.map((item, i) => {
              const { asPath = "" } = router

              const asPathWithSpacing = asPath.replace(/\//g, "/")

              const isActive = asPathWithSpacing.includes(item.url)

              return (
                <li key={i}>
                  <Link
                    href={item.url}
                    className={clsx(
                      "transition-all hover:text-highlight  active:bg-highlight focus:outline-none focus:ring focus:ring-highlight",
                      isActive &&
                        "underline underline-offset-1 decoration-primary text-highlight decoration-2 font-semibold"
                    )}>
                    {item.text}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </nav>
  )
}

Navigation.propTypes = {
  darkMode: PropTypes.bool,
  hideOnDesktop: PropTypes.bool,
  isAbsolute: PropTypes.bool
}
