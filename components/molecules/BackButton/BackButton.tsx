"use client"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { IoArrowBackSharp } from "react-icons/io5"

const BackButton = () => {
    const router = useRouter()

    const handleGoBack = () => {
        router.back()
    }

    return (
        <div className="fixed z-20 top-24 left-2">
            <button
                key="backButton"
                onClick={handleGoBack}
                className="flex items-center gap-2 min-w-[120px] justify-center px-4 py-2  text-white transition-all ease-in-out duration-500 hover:bg-highlight hover:text-dark group bg-primary active:bg-highlight focus:outline-none focus:ring focus:ring-highlight"
            >
                <motion.div
                    key="icon-1"
                    initial={{ width: 0, scale: 0, x: -100 }}
                    animate={{ width: "auto", scale: 1, x: 0 }}
                    exit={{ width: 0, scale: 0, x: -100 }}
                    transition={{
                        type: "spring",
                        duration: 0.5,
                        bounce: 0.4,
                        delay: 1,
                    }}
                    className="overflow-clip"
                >
                    <IoArrowBackSharp />
                </motion.div>

                <span>Back</span>
            </button>
        </div>
    )
}

export default BackButton
