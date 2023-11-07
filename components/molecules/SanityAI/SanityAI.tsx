/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"

interface SanityAIProps {
    value?: string
    inputRef: any
}

const SanityAI = ({ value = "", inputRef }: SanityAIProps) => {
    const [prompt, setPrompt] = useState("")

    const callApi = async () => {
        const response = await fetch("/api/generate-answer", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: prompt }),
        }).then((res) => res.json())

        if (response.text) {
            inputRef.current.value = response.text
        } else {
            console.error("error")
        }
    }

    function generateDescription(e: any) {
        e.preventDefault()

        try {
            callApi()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="mb-4">
            <form onSubmit={generateDescription} className="flex gap-4">
                <div className="flex flex-col flex-1 gap-1">
                    <label className="text-xs">ChatGPT promt</label>
                    <input
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="flex-1 w-full p-2 ring ring-green-800"
                    />
                </div>
                <div>{value}</div>
                <button
                    className="flex-shrink-0 px-3 py-1 text-white bg-green-800 w-fit"
                    onClick={generateDescription}
                >
                    Generate Description
                </button>
            </form>
        </div>
    )
}

export default SanityAI
