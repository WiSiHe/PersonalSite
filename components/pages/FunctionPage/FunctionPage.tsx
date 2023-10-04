"use client"

import { useAuth, UserButton } from "@clerk/nextjs"
import useSessionStorage from "hooks/useSessionStorage"
import Lottie from "lottie-react"
import walkingAnimation from "public/animations/lottie-walking.json"
import { useEffect, useState } from "react"

// const defaultOptions = {
//     loop: true,
//     autoplay: true,
//     animationData: "/public/animations/lottie1.json",
//     rendererSettings: {
//         preserveAspectRatio: "xMidYMid slice",
//     },
// }

const FunctionPage = () => {
    // const { isLoaded, userId, sessionId, getToken } = useAuth()

    const jwtToken = useSessionStorage("jwtToken")

    // In case the user signs out while on the page.
    // if (!isLoaded || !userId) {
    //     return <div>Loading...</div>
    // }

    // if (userId) {
    //     console.log("userId", userId)
    // }

    const handleAddToSessionStorage = () => {
        // generate 5 random numbers
        const randomNumbers = Array.from(
            { length: 5 },
            () => Math.floor(Math.random() * 40) + 1,
        )

        const newToken = randomNumbers.join("")

        const updateTokenEvent = new Event("updateToken")
        sessionStorage.setItem("jwtToken", newToken)
        window.dispatchEvent(updateTokenEvent)
    }

    const handleRemoveSessionStorage = () => {
        const updateTokenEvent = new Event("updateToken")
        sessionStorage.removeItem("jwtToken")
        window.dispatchEvent(updateTokenEvent)
    }

    return (
        <section>
            <h1>Function Page</h1>

            <hr className="my-10 border-dark" />
            <h3>Session storage item</h3>

            <button
                onClick={handleAddToSessionStorage}
                className="px-4 py-3 text-white bg-primary"
            >
                Add to session storage
            </button>
            <div>Session storage: {jwtToken}</div>
            <button
                onClick={handleRemoveSessionStorage}
                className="px-4 py-3 text-white bg-primary"
            >
                Remove session storage
            </button>
            <hr className="my-10 border-dark" />
            <h2>Lottie animation</h2>
            <section className="grid items-center justify-center grid-cols-12 py-10">
                <Lottie
                    // onLoopComplete={() => console.log("loop complete")}
                    animationData={walkingAnimation}
                    loop
                    className="col-span-4 col-start-5 p-1 mt-4"
                />
            </section>
        </section>
    )
}

export default FunctionPage
