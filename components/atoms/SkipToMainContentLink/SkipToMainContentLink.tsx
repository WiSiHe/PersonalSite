import Link from "next/link"
import React from "react"

const SkipToMainContentLink = () => {
    return (
        <Link
            href="#main"
            className="fixed z-10 px-4 py-2 text-sm font-bold text-white transition-opacity duration-300 rounded shadow opacity-0 bg-primary bottom-4 left-20 focus:opacity-100"
        >
            Skip to main content
        </Link>
    )
}

export default SkipToMainContentLink
