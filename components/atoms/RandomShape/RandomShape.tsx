import { motion } from "framer-motion"
import React, { useEffect, useState } from "react"

const getRandomValue = (max: number) => Math.floor(Math.random() * max)

interface iRandomShapesProps {
  top: string
  left: string
}

const RandomShapes = () => {
  const [randomShapes, setRandomShapes] = useState<iRandomShapesProps[]>([])

  useEffect(() => {
    const randomShapes = [...Array(4)].map((_, i) => {
      const randomHeight = getRandomValue(100)
      const randomWidth = getRandomValue(100)
      const styleProps = { top: `${randomHeight}%`, left: `${randomWidth}%` }
      return styleProps
    })

    setRandomShapes(randomShapes)
  }, [])

  return (
    <motion.div
      className="absolute top-0 left-0 w-full h-full "
      transition={{ staggerChildren: 0.5 }}
    >
      {randomShapes.map((shape, i) => {
        const { top, left } = shape

        return (
          <motion.div
            key={i}
            className="absolute z-10 w-32 h-32 p-10 rounded-full bg-dark mix-blend-overlay"
            style={{ top, left }}
            animate={{
              scale: [1, 2, 1],
            }}
            transition={{
              duration: 15 * i,
              delay: 0.5 * i,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        )
      })}
    </motion.div>
  )
}

export default RandomShapes
