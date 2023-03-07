import { Main } from "components"

const TestPage = () => {
  const callApi = async () => {
    const myMessage = "Hello, world!"

    const response = await fetch("/api/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: myMessage }),
    }).then((res) => res.json())

    if (response.text) {
      console.log(response)
    } else {
      console.log("error")
    }
  }

  return (
    <>
      <Main noTopPadding className="flex-col min-h-screen">
        oepnAI
        <button onClick={callApi}>click me</button>
      </Main>
    </>
  )
}

export default TestPage
