"use client"

import Lottie from "lottie-react"
import walkingAnimation from "public/animations/lottie-walking.json"
import { useState } from "react"

// const defaultOptions = {
//     loop: true,
//     autoplay: true,
//     animationData: "/public/animations/lottie1.json",
//     rendererSettings: {
//         preserveAspectRatio: "xMidYMid slice",
//     },
// }

const FunctionPage = () => {
    const [url, setUrl] = useState("")
    const [smallUrl, setSmallUrl] = useState("")

    function generateShortenedUrl(originalUrl: string): string {
        const characters =
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
        const shortLength = 6
        let shortenedUrl = originalUrl

        for (let i = 0; i < shortLength; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length)
            shortenedUrl += characters[randomIndex]
        }

        return shortenedUrl
    }

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setSmallUrl(generateShortenedUrl(url))
    }

    return (
        <section>
            <h1>Function Page</h1>
            <div>URL:{url}</div>
            <div>Small URL: {smallUrl}</div>
            <hr className="my-10 border-dark" />
            <input type="text" onChange={(e) => setUrl(e.target.value)} />
            <div className="">
                <button
                    className="px-3 py-2 ring ring-primary"
                    onClick={handleSubmit}
                >
                    Click me
                </button>
            </div>
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
