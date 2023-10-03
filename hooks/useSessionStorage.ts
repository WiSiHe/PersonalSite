"use client"
import { useEffect, useState } from "react"

const useSessionStorage = (name: string) => {
    const [value, setValue] = useState<string | null>(null)

    useEffect(() => {
        const handleTokenUpdate = () => {
            // Handle the token update here
            const updatedToken = sessionStorage.getItem("jwtToken")
            // Do something with the updated token
            setValue(updatedToken)
        }

        // Subscribe to the custom event
        window.addEventListener("updateToken", handleTokenUpdate)

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener("updateToken", handleTokenUpdate)
        }
    }, [])

    return value
}

export default useSessionStorage
