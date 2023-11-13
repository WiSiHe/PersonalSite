"use client"

import { useEffect, useState } from "react"

const ShareButton = () => {
    const [canShare, setCanShare] = useState(false)
    useEffect(() => {
        if (typeof navigator.share === "function") {
            setCanShare(true)
        }
    }, [])

    function shareFunction(): void {
        if (navigator.share) {
            navigator
                .share(sharePayload)
                .then(() => {
                    console.log("Shared successfully")
                })
                .catch((error) => {
                    console.error("Share failed:", error)
                })
        } else {
            console.error("Web Share API is not supported in this browser")
        }
    }

    const sharePayload = {
        title: "Web Share API",
        text: "Take a look at Web Share API",
        url: " https://web.dev/web-share/",
    }

    if (!canShare) return null

    return (
        <button
            onClick={shareFunction}
            className="p-2 text-white bg-red-500 rounded"
        >
            Share
        </button>
    )
}

export default ShareButton
