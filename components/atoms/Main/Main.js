import clsx from "clsx"
import PropTypes from "prop-types"
import React from "react"

const Main = ({ noTopPadding = false, className = "", children }) => {
  const mainCss = "flex flex-1 bg-bright relative w-full dark:text-white"

  return (
    <main className={clsx(mainCss, className, !noTopPadding && "mt-14")}>
      {children}
    </main>
  )
}

Main.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  noTopPadding: PropTypes.bool,
}

export default Main
