import Main from "components/atoms/Main/Main"
import { FormEvent, useState } from "react"

const TestPage = () => {
  const [prompt, setPrompt] = useState("")
  const [answer, setAnswer] = useState("")
  // const [joke, setJoke] = useState("")

  const [responses, setResponses] = useState<string[]>([])

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
      setAnswer(response.text)
      setResponses([...responses, response.text])
    } else {
      console.log("error")
    }
  }

  // const getJoke = async () => {
  //   const response = await fetch("/api/getJoke").then((res) => res.json())

  //   setJoke(response.text)
  // }

  const handleSubmission = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    callApi()
  }

  return (
    <>
      <Main className="flex-col items-center justify-center min-h-screen">
        <section className="flex flex-col gap-4">
          <div className="p-4 ring ring-primary">
            <form onSubmit={handleSubmission} className="flex gap-4">
              <div className="flex flex-col">
                <label htmlFor="prompt">Prompt</label>
                <input
                  type="text"
                  name="prompt"
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="p-4 border-none accent-primary ring-primary ring"
                />
              </div>
              <button className="flex-shrink-0 px-4 text-white rounded-lg bg-primary">
                Prompt AI
              </button>
            </form>
            <div>{answer}</div>
            <ul className="flex flex-col gap-4">
              {responses.map((response, i) => (
                <li key={i}>{response}</li>
              ))}
            </ul>
          </div>
          {/* <div>
            joke stuff
            <button onClick={getJoke} className="bg-primary">
              get joke
            </button>
            {joke}
          </div> */}
        </section>
      </Main>
    </>
  )
}

export default TestPage
