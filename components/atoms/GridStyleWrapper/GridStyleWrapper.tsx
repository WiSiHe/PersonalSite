import { m } from "framer-motion"
import { useState } from "react"

interface GridStyleWrapperProps {
  children: React.ReactNode
}

const variant = {
  initial: {
    opacity: 0,
    scale: 0,
  },
  inView: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 5,
    },
  },
}

const GridStyleWrapper = ({ children }: GridStyleWrapperProps) => {
  return (
    <>
      <svg width="100%" height="100%" className="absolute fill-primary">
        <defs>
          <pattern
            id="polka-dots"
            x="0"
            y="0"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <m.circle
              cx="50"
              cy="50"
              r="2.5"
              initial={{ scale: 0 }}
              animate={{
                scale: 1,
                transition: {
                  duration: 5,
                  type: "spring",
                  repeat: Infinity,
                  repeatType: "reverse",
                },
              }}
            />
          </pattern>
        </defs>

        <m.rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="url(#polka-dots)"
        />
      </svg>
      {children}
    </>
  )
}

export default GridStyleWrapper
