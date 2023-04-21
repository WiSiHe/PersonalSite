import clsx from "clsx"
import React from "react"

interface iMainProps {
  noTopPadding?: boolean
  className?: string
  children: React.ReactNode
}

const Main = ({
  noTopPadding = false,
  className = "",
  children,
}: iMainProps) => {
  const mainCss = "flex flex-1 bg-tertiary relative w-full"

  return (
    <main
      id="main"
      className={clsx(mainCss, className, !noTopPadding && "mt-14")}
    >
      {children}
    </main>
  )
}

export default Main
