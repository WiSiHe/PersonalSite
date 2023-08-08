import { motion } from "framer-motion"
import Link from "next/link"
import { FaChevronRight } from "react-icons/fa"

interface LinkButtonProps {
  href: string
  children: React.ReactNode
}

const LinkButton = ({ children, href }: LinkButtonProps) => {
  return (
    <Link
      href={href}
      className="relative block focus-visible:outline-none max-w-min group focus-visible:ring ring-highlight focus-visible:border-transparent"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", bounce: 0.4, duration: 1 }}
        whileHover={{ scale: 1.1, boxShadow: "0 0 10px #DE0D92" }}
        className="flex items-center justify-center px-6 py-2 transition-all ease-linear rounded-lg w-fit whitespace-nowrap text-dark bg-highlight hover:bg-primary group-focus-visible:bg-primary group-focus-visible:text-white hover:text-white"
      >
        {children}
        <FaChevronRight className="inline-block ml-2 text-base" />
      </motion.div>
    </Link>
  )
}

export default LinkButton
