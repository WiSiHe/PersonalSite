import { motion } from "framer-motion"
import { useEffect, useState } from "react"

type ToasterType = "info" | "success" | "warning" | "error"

interface ToasterProps {
    title: string
    subtitle: string
    type?: ToasterType
}

const Toaster = ({ title, subtitle, type = "info" }: ToasterProps) => {
    const [isVisible, setIsVisible] = useState(true)

    const colorMap = {
        info: "blue",
        success: "green",
        warning: "yellow",
        error: "red",
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsVisible(false)
        }, 5000)

        return () => {
            clearTimeout(timeout)
        }
    }, [])

    if (!isVisible) {
        return null
    }

    return (
        <div
            className={`fixed bottom-4 left-4 bg-${colorMap[type]}-200 p-4 rounded-md shadow-lg`}
        >
            <h3 className={`text-${colorMap[type]}-700 font-bold`}>{title}</h3>
            <p className={`text-${colorMap[type]}-700`}>{subtitle}</p>
            <div className="relative h-2 mt-2 overflow-hidden bg-gray-200 rounded">
                <motion.div
                    className={`absolute left-0 top-0 h-full bg-${colorMap[type]}-500`}
                    initial={{ width: "100%" }}
                    animate={{ width: "0" }}
                    transition={{ duration: 5, ease: "linear" }}
                />
            </div>
        </div>
    )
}

export default Toaster
