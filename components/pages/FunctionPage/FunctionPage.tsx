"use client"

import useSessionStorage from "hooks/useSessionStorage"
import Lottie from "lottie-react"
import walkingAnimation from "public/animations/lottie-walking.json"

const FunctionPage = () => {
    const jwtToken = useSessionStorage("jwtToken")

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
                    animationData={walkingAnimation}
                    loop
                    className="col-span-4 col-start-5 p-1 mt-4"
                />
            </section>
        </section>
    )
}

export default FunctionPage
