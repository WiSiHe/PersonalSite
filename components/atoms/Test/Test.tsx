import { motion } from "framer-motion"
import Image from "next/image"

const Test = () => {
  return (
    <div>
      <h1>Hello World</h1>
      <div className="relative aspect-video">
        <Image src="images/explorer.png" fill alt="" />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        hey
      </motion.div>
    </div>
  )
}

export default Test
