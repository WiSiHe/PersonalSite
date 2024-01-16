import { ReactNode } from "react"

import { cn } from "@/utils/utility"

export function Marquee({
    children,
    direction = "left",
    pauseOnHover = false,
    reverse = false,
    fade = false,
    className,
    innerClassName,
    numberOfCopies = 2,
}: {
    children: ReactNode
    direction?: "left" | "up"
    pauseOnHover?: boolean
    reverse?: boolean
    fade?: boolean
    className?: string
    innerClassName?: string
    numberOfCopies?: number
}) {
    const directionClass = direction === "left" ? "flex-row" : "flex-col"
    const animationClass =
        direction === "left" ? "animate-marquee-left" : "animate-marquee-up"
    const pauseClass =
        pauseOnHover && "group-hover:[animation-play-state:paused]"

    const reverseClass = reverse && "direction-reverse"

    const maskImage = fade
        ? `linear-gradient(${direction === "left" ? "to right" : "to bottom"}, transparent 0%, rgba(0, 0, 0, 1.0) 10%, rgba(0, 0, 0, 1.0) 90%, transparent 100%)`
        : undefined

    return (
        <div
            className={cn(
                "group flex gap-[1rem] overflow-hidden",
                directionClass,
                className,
            )}
            style={{ maskImage, WebkitMaskImage: maskImage }}
        >
            {Array(numberOfCopies)
                .fill(0)
                .map((_, i) => (
                    <div
                        key={i}
                        className={`flex justify-around gap-[1rem] [--gap:1rem] shrink-0 ${animationClass} ${pauseClass} ${reverseClass} ${innerClassName}`}
                    >
                        {children}
                    </div>
                ))}
        </div>
    )
}
