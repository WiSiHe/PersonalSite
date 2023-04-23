import { motion } from "framer-motion"
import React from "react"

const LoadingDots = () => {
  return (
    <div className="flex items-center justify-center gap-1">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="w-2 h-2 bg-gray-300 rounded-full"
          animate={{
            y: [0, -8, 0],
            opacity: [1, 0.5, 1],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.2,
            // ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

export default LoadingDots
