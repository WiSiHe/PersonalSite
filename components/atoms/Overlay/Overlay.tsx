import React, { FC } from "react"

type Props = {
  display?: boolean
  close: () => void
}

const Overlay: FC<Props> = ({ display = false, close }) => {
  const defaultStyle =
    "fixed top-0 bottom-0 left-0 right-0 bg-black opacity-0 z-20 pointer-events-none transition-all duration-1000 ease-in-out"
  const activeStyle =
    "fixed top-0 bottom-0 left-0 right-0 bg-black opacity-60 z-20 pointer-events-auto transition-all duration-1000 ease-in-out"

  return (
    <div
      className={display ? activeStyle : defaultStyle}
      onClick={() => close()}
    />
  )
}

export default Overlay
