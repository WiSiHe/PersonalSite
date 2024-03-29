import { usePathname, useRouter } from "next/navigation"
import React from "react"

interface iActiveLinkProps {
    children: React.ReactNode
    href: string
    scrollToTop?: boolean
    shallow?: boolean
}

function ActiveLink({
    children,
    href,
    scrollToTop = true,
    shallow = false,
}: iActiveLinkProps) {
    const pathName = usePathname()
    const router = useRouter()
    const isActive = href === pathName

    const lightStyle = `text-black hover:border-b-2 border-purple-800  ${
        isActive && "text-purple-800"
    }`

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        router.push(href)
    }

    return (
        <a href={href} onClick={handleClick} className={lightStyle}>
            {children}
        </a>
    )
}

export default ActiveLink
