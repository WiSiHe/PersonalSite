import clsx from "clsx"
import { BiLoaderCircle } from "react-icons/bi"

interface iLoaderProps {
  color?: "white" | "black" | "primary" | "secondary" | "tertiary"
}

const Loader = ({ color = "white" }: iLoaderProps) => {
  const colorStyle = {
    white: "text-white",
    black: "text-black",
    primary: "text-primary",
    secondary: "text-secondary",
    tertiary: "text-tertiary",
  }

  return (
    <div
      className={clsx(
        colorStyle[color],
        "absolute inset-0 flex items-center justify-center"
      )}
    >
      <BiLoaderCircle className="text-2xl animate-spin-slow" />
    </div>
  )
}

export default Loader
