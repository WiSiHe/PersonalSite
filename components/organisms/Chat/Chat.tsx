import clsx from "clsx"
import Avatar from "components/atoms/Avatar"
import React, { useState } from "react"
import { FaRobot, FaSpinner, FaUser } from "react-icons/fa"
import { isNotEmptyObject } from "utils/object"

interface Message {
  role: "user" | "assistant"
  content: string
}

const Chat = () => {
  const [chatLogs, setChatLogs] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi, I'm ChatGPT. How can I help you today? 🤖",
    },
  ])
  const [requestMessage, setRequestMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRequestMessage(e.target.value)
  }

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!requestMessage) return
    setIsLoading(true)
    setChatLogs([...chatLogs, { role: "user", content: requestMessage }])
    const newChatLogs = [...chatLogs, { role: "user", content: requestMessage }]

    try {
      const response = await fetch("/api/openai-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: requestMessage,
          messages: newChatLogs,
        }),
      }).then((res) => res.json())
      if (isNotEmptyObject(response)) {
        console.log("response", response)
        setChatLogs([
          ...chatLogs,
          { role: "user", content: requestMessage },
          response,
        ])
      }
    } catch (err) {
      console.error(err)
    }
    setRequestMessage("")
    setIsLoading(false)
  }

  return (
    <div className="flex flex-col h-[90vh] w-full">
      <div className="p-4">
        <h1>ChatGPT</h1>
        <p>Powered by OpenAI</p>
      </div>

      <div className="flex flex-col flex-1 gap-4 px-4 py-10 overflow-y-auto">
        {/* Chat messages */}
        {chatLogs.map((message, index) => {
          const { role, content } = message
          const isBot = role === "assistant"
          return (
            <div
              key={index}
              className={clsx("flex gap-2", isBot ? "self-start" : "self-end")}
            >
              {isBot && (
                <Avatar
                  size="large"
                  Image={!isBot ? <FaUser /> : <FaRobot />}
                  color="secondary"
                />
              )}
              <div className="max-w-5xl px-4 py-2 bg-white rounded-md drop-shadow">
                <p className="text-sm whitespace-pre-wrap">{content}</p>
              </div>
              {!isBot && (
                <Avatar size="large" Image={<FaUser />} color="primary" />
              )}
            </div>
          )
        })}
        {isLoading && (
          <div className="flex items-center justify-center w-full h-10">
            <span className="text-sm font-medium leading-none text-gray-600">
              Loading...
            </span>
            <FaSpinner className="animate-spin" />
          </div>
        )}
      </div>
      <form
        className="flex items-center gap-4 p-4 border-t border-gray-300"
        onSubmit={handleFormSubmit}
      >
        <label htmlFor="message">Message</label>
        <input
          id="message"
          type="text"
          placeholder="Type your message..."
          value={requestMessage}
          onChange={handleInputChange}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        {/* Chat send button */}
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 text-white bg-blue-500 rounded-md focus:outline-none hover:bg-blue-600"
        >
          {isLoading && <FaSpinner className="animate-spin" />}
          Send
        </button>
      </form>
    </div>
  )
}

export default Chat
