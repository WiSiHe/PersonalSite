// react page wrapper that receives children
import { m } from "framer-motion"
import React from "react"

interface iPageProps {
  children: React.ReactNode
}
const Page = ({ children }: iPageProps) => {
  return (
    <m.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ type: "spring", duration: 0.5 }}
    >
      {children}
    </m.div>
  )
}

export default Page
