import { useState } from "react"

interface SanityAIProps {
  value?: string
  inputRef: any
}

const SanityAI = ({ value = "", inputRef }: SanityAIProps) => {
  const [prompt, setPrompt] = useState("")

  //   console.log("value", value)

  const callApi = async () => {
    // const myMessage = "What does, Hello, world! mean?"

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
      console.log("error")
    }
  }

  function generateDescription(e: any) {
    e.preventDefault()
    // overwrite inputref value with promt value
    try {
      callApi()
    } catch (error) {
      console.log("error", error)
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
