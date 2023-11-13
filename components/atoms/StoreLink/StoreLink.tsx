import clsx from "clsx"
import Link from "next/link"
import { IconType } from "react-icons"
import { cn } from "utils/utility"

interface StoreLink {
    Icon: IconType
    href?: string | null
    Label: string
    className?: string
}

const StoreLink = ({ Icon, href, Label = "", className = "" }: StoreLink) => {
    if (!href) return null

    return (
        <Link
            href={href}
            rel="noreferrer"
            target="_blank"
            aria-label={Label}
            className="relative text-white group focus:outline-none"
        >
            <div
                className={cn(
                    "flex gap-2 items-center text-xs rounded-sm justify-center w-full px-4 py-3 group-focus:outline-none group-active:bg-highlight group-focus:ring group-focus:ring-highlight",
                    className,
                )}
            >
                {Icon && <Icon className="flex-shrink-0" />}
                <span>{Label}</span>
            </div>
        </Link>
    )
}

export default StoreLink
