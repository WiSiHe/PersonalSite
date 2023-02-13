import { Canvas, Main } from "components"
import { useState } from "react"

const TestPage = () => {
  const [inputCode, setInputCode] = useState("")
  const inputCodeArray = inputCode.split("")

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  // const handleDeleteSanityData = async () => {
  // delete specific document
  // sanity documents delete --dataset=production d3d22cd7-a1b7-4ad3-87c9-f861923249b7
  //   'sanity documents query "*[_type == "video" && _id == "8e2a0bf7-2fcb-4a44-98bf-5dac226e77ee"]._id" --apiVersion 2021-03-25  | groq "*" -o ndjson | xargs sanity documents delete'
  // }

  return (
    <>
      <Main noTopPadding className="">
        <section className="flex flex-col items-center justify-center w-full p-4 bg-gray-400">
          {/* input field where every character is styled in a box */}
          <form className="space-y-6" onSubmit={onSubmit}>
            <div className="flex gap-2">
              {[...Array(6)].map((_, i) => {
                const hasValue = inputCodeArray[i] !== undefined
                return (
                  <label
                    key={i}
                    htmlFor="one-time-code"
                    className="flex items-center justify-center w-10 h-10 text-2xl text-center bg-gray-200"
                  >
                    {hasValue ? inputCodeArray[i] : "*"}
                  </label>
                )
              })}
            </div>
            <input
              type="text"
              name="one-time-code"
              id="one-time-code"
              inputMode="numeric"
              pattern="\d{6}"
              autoComplete="one-time-code"
              maxLength={6}
              required
              onChange={(e) => setInputCode(e.target.value)}
              className="w-full px-4 py-2 text-gray-900 bg-gray-200 border border-gray-300 rounded-md sr-only focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
            />
            <div className="flex items-end justify-end">
              <button className="flex px-4 py-2 text-white bg-green-500">
                <strong>Submit me!</strong>
              </button>
            </div>
          </form>
        </section>
        <section>
          <div className="absolute inset-0 ring">
            <Canvas />
          </div>
        </section>
      </Main>
    </>
  )
}

export default TestPage
