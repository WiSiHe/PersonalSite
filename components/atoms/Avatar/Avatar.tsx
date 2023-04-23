import clsx from "clsx"
import React from "react"

interface Avatar {
  label?: string
  size?: "default" | "small" | "large"
  color: "primary" | "secondary" | "tertiary" | "white" | "black" | "gray"
  Image?: React.ReactNode
}

const Avatar = ({
  label = "",
  size = "default",
  color = "primary",
  Image,
}: Avatar) => {
  // split label into array of words
  const names = label.split(" ")
  // get first name
  const firstName = names[0]
  // get last name
  const lastName = names[names.length - 1]

  // get initials of first and last name
  const initials = firstName[0] + lastName[0]

  const baseStyle =
    "capitalize rounded-full z-10 flex items-center justify-center overflow-clip flex-shrink-0"

  const sizeStyle = {
    default: "w-8 h-8 text-sm",
    small: "w-6 h-6 text-xs",
    large: "w-12 h-12 text-lg",
  }

  const colorStyle = {
    primary: "bg-primary text-white",
    secondary: "bg-secondary text-white",
    tertiary: "bg-tertiary text-dark",
    white: "bg-white text-dark",
    black: "bg-black text-white",
    gray: "bg-gray-300 text-dark",
  }

  return (
    <div className="relative">
      {/* <span className="absolute w-8 h-8 rounded-full inset-2 animate-ping bg-primary"></span> */}
      <div className={clsx(baseStyle, sizeStyle[size], colorStyle[color])}>
        {Image ? Image : initials}
      </div>
    </div>
  )
}

export default Avatar
