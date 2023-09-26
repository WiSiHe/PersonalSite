import { motion, useMotionValue, useSpring } from "framer-motion"
import { useEffect } from "react"

const Cursor = () => {
    //   const [cursorXY, setCursorXY] = useState({ x: -100, y: -100 })
    const cursorX = useMotionValue(-100)
    const cursorY = useMotionValue(-100)

    const springConfig = { damping: 25, stiffness: 800 }
    const cursorXSpring = useSpring(cursorX, springConfig)
    const cursorYSpring = useSpring(cursorY, springConfig)

    useEffect(() => {
        const moveCursor = (e: { clientX: number; clientY: number }) => {
            //   const x = e.clientX - 16
            //   const y = e.clientY - 16
            //   setCursorXY({ x, y })
            cursorX.set(e.clientX - 16)
            cursorY.set(e.clientY - 16)
        }
        window.addEventListener("mousemove", moveCursor)
        return () => {
            window.removeEventListener("mousemove", moveCursor)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 z-50 flex items-center justify-center w-8 h-8 bg-white rounded-full pointer-events-none mix-blend-difference cursor-none"
                style={{
                    translateX: cursorXSpring,
                    translateY: cursorYSpring,
                }}
            >
                <motion.div
                    className="w-4 h-4 rounded-full bg-primary"
                    initial={{
                        scale: 0.5,
                    }}
                    animate={{ scale: 1.1 }}
                    transition={{
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 10,
                        type: "spring",
                    }}
                />
            </motion.div>
        </>
    )
}

export default Cursor
