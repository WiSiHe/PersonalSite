"use client"
import { useEffect, useRef } from "react"

import { cn } from "@/utils/utility"

type InfiniteScroller = {
    children: React.ReactNode
}

const InfiniteScroller = ({ children }: InfiniteScroller) => {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const container = containerRef.current

        if (!container) return

        const handleScroll = () => {
            const scrollLeft = container.scrollLeft
            const scrollWidth = container.scrollWidth
            const clientWidth = container.clientWidth

            // Check if we have reached the end of the scroll
            if (scrollLeft + clientWidth === scrollWidth) {
                // Reset scroll position to create a looping effect
                container.scrollLeft = 0
            }
        }

        // Attach scroll event listener
        container.addEventListener("scroll", handleScroll)

        return () => {
            // Cleanup: remove event listener
            container.removeEventListener("scroll", handleScroll)
        }
    }, [])

    return (
        <div
            ref={containerRef}
            className={cn("flex space-x-4 overflow-hidden animate-scroll")}
        >
            {children}
        </div>
    )
}

export default InfiniteScroller
