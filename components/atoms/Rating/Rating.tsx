import { useEffect, useState } from "react"

interface Star {
    filled: boolean
    size: "small" | "default"
}

const Star = ({ filled, size }: Star) => {
    return (
        <svg
            className={`w-${size === "small" ? "4" : "6"} h-${
                size === "small" ? "4" : "6"
            }`}
            fill={filled ? "yellow" : "none"}
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 2l3.09 6.37L22 9.27l-5 4.86 1.18 6.86L12 17.77l-6.18 3.22L7 14.13l-5-4.86 6.91-.86L12 2z"
            />
        </svg>
    )
}

type RatingProps = {
    rating: number
    max: number
    size: "small" | "default"
}

const Rating = ({ rating, max = 5, size = "default" }: RatingProps) => {
    return (
        <div className="flex">
            {Array.from({ length: max }).map((_, index) => (
                <Star key={index} size={size} filled={index < rating} />
            ))}
        </div>
    )
}

export default Rating
