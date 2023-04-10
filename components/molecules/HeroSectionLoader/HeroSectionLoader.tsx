import clsx from "clsx"
import { motion } from "framer-motion"

interface HeroSectionLoaderProps {
  isDisplayed?: boolean
  color?: "white" | "black" | "dark" | "default" | "primary"
}

const HeroSectionLoader = ({
  isDisplayed = true,
  color = "default",
}: HeroSectionLoaderProps) => {
  if (!isDisplayed) return null

  const backgroundStyle = {
    white: "bg-white",
    black: "bg-black",
    dark: "bg-dark",
    default: "bg-white",
    primary: "bg-primary",
  }

  return (
    <section className="absolute inset-0 z-20 grid w-full h-full grid-cols-12 pointer-events-none">
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 flex items-center justify-center bg-white"
      />

      <motion.div
        initial={{ x: 0 }}
        animate={{ x: -1000 }}
        transition={{ duration: 2, delay: 1, type: "spring" }}
        className={clsx("z-20 col-span-6 col-start-1", backgroundStyle[color])}
      />

      <motion.div
        initial={{ x: 0 }}
        animate={{ x: 1000 }}
        exit={{ x: 0 }}
        transition={{ duration: 2, delay: 1, type: "spring" }}
        className={clsx("z-20 col-span-3 col-start-10", backgroundStyle[color])}
      />

      <motion.div
        initial={{ x: 0 }}
        animate={{ x: -1000 }}
        transition={{ duration: 2, delay: 1.5, type: "spring" }}
        className={clsx("z-20 col-span-1 col-start-1", backgroundStyle[color])}
      />

      <motion.div
        initial={{ x: 0 }}
        animate={{ x: 1000 }}
        transition={{ duration: 2, delay: 1.5, type: "spring" }}
        className={clsx("z-20 col-span-9 col-start-4", backgroundStyle[color])}
      />

      <motion.div
        initial={{ x: 0 }}
        animate={{ x: -1000 }}
        transition={{ duration: 2, delay: 2, type: "spring" }}
        className={clsx("z-20 col-span-8 col-start-1", backgroundStyle[color])}
      />
    </section>
  )
}

export default HeroSectionLoader
