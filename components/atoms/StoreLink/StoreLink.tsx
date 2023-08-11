import clsx from "clsx"
import Link from "next/link"
import { IconType } from "react-icons"

interface StoreLink {
  Icon: IconType
  href?: string | null
  Label: string
  className?: string
}

const StoreLink = ({ Icon, href, Label = "", className = "" }: StoreLink) => {
  if (!href) return null

  return (
    <>
      <Link
        href={href}
        rel="noreferrer"
        target="_blank"
        aria-label={Label}
        className="relative text-white group focus:outline-none"
      >
        <div
          className={clsx(
            "flex gap-2 items-center text-xs justify-center w-full p-2 group-focus:outline-none group-active:bg-highlight group-focus:ring group-focus:ring-highlight",
            className,
          )}
        >
          {Icon && <Icon className="flex-shrink-0" />}
          <strong>{Label}</strong>
        </div>
      </Link>
    </>
  )
}

export default StoreLink
