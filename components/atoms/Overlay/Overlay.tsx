import clsx from "clsx"
import React, { FC, useEffect, useState } from "react"

type Props = {
  display?: boolean
  handleClose: () => void
}

const Overlay: FC<Props> = ({ display = false }) => {
  return (
    <div
      className={clsx(
        "fixed inset-0 pointer-events-none z-20 transition-all duration-1000 ease-in-out",
        display ? " bg-dark/40" : "bg-dark/0"
      )}
    />
  )
}

export default Overlay
