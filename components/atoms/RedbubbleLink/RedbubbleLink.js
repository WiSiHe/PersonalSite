import clsx from "clsx"
import Link from "next/link"
import PropTypes from "prop-types"
import React from "react"
import { SiRedbubble } from "react-icons/si"

const RedbubbleLink = ({ href = "" }) => {
  if (!href) return null

  return (
    <Link
      href={href}
      rel="noreferrer"
      target="_blank"
      aria-label="redbubble"
      className="group focus:outline-none"
    >
      <div className="flex gap-1 text-white items-center justify-center w-full p-2 rounded-lg  bg-[#e31421] hover:bg-[#e31421]/90 group-focus:outline-none group-active:bg-highlight group-focus:ring group-focus:ring-highlight">
        <SiRedbubble className="text-white " />
        <strong className="text-white">Redbubble</strong>
      </div>
    </Link>
  )
}

RedbubbleLink.propTypes = {
  redbubbleUrl: PropTypes.string,
}

export default RedbubbleLink
