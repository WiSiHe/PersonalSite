import { Main } from "components"
import { FormEvent, useState } from "react"

const TestPage = () => {
  const [prompt, setPrompt] = useState("")
  const [answer, setAnswer] = useState("")
  const callApi = async () => {
    // const myMessage = "What does, Hello, world! mean?"

    const response = await fetch("/api/generate-answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: prompt }),
    }).then((res) => res.json())

    console.log(response)

    if (response.text) {
      console.log(response)
      setAnswer(response.text)
    } else {
      console.log("error")
    }
  }

  const handleSubmission = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    callApi()
  }

  return (
    <>
      <Main noTopPadding className="flex-col min-h-screen">
        oepnAI
        <form onSubmit={handleSubmission}>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button>click me</button>
        </form>
        {answer}
      </Main>
    </>
  )
}

export default TestPage
