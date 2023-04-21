import clsx from "clsx"
import Avatar from "components/atoms/Avatar"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import React, { useState } from "react"
import { FaImage, FaRobot, FaSpinner, FaUser } from "react-icons/fa"
import { isNotEmptyObject } from "utils/object"

interface Message {
  role: "user" | "assistant"
  content?: string
  image?: string
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

  const isDisabled = !requestMessage || isLoading

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRequestMessage(e.target.value)
  }

  const handleSubmitQuestion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!requestMessage) return
    setIsLoading(true)
    setChatLogs([...chatLogs, { role: "user", content: requestMessage }])
    const filteredChatLogs = chatLogs.filter((message) => {
      return message.image === undefined
    })
    const newChatLogs = [
      ...filteredChatLogs,
      { role: "user", content: requestMessage },
    ]

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

  const handleSubmitImage = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!requestMessage) return
    setIsLoading(true)
    setChatLogs([...chatLogs, { role: "user", content: requestMessage }])
    const newChatLogs = [...chatLogs, { role: "user", content: requestMessage }]
    try {
      const response = await fetch("/api/openai-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: requestMessage,
          messages: newChatLogs,
        }),
      }).then((res) => res.json())
      console.log(response)
      if (isNotEmptyObject(response)) {
        setChatLogs([
          ...chatLogs,
          { role: "user", content: requestMessage },
          { role: "assistant", image: response.text },
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
        <h1>HenrikGPT</h1>
        <p>Powered by OpenAI</p>
        <button
          onClick={() =>
            setChatLogs([
              {
                role: "assistant",
                content: "Hi, I'm ChatGPT. How can I help you today? 🤖",
              },
            ])
          }
          className="px-4 py-3 text-white rounded-md bg-primary"
        >
          Clear chat logs
        </button>
      </div>

      <div className="flex flex-col flex-1 gap-4 px-4 py-10 overflow-y-auto">
        {/* Chat messages */}
        {chatLogs.map((message, index) => {
          const { role, content, image } = message
          const isBot = role === "assistant"
          const hasImage = image !== undefined
          return (
            <motion.div
              initial={{ opacity: 0, y: 20, x: isBot ? -200 : 200 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30,
                duration: 0.5,
              }}
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

              <div className="relative max-w-5xl px-4 py-2 bg-white rounded-md drop-shadow">
                {hasImage ? (
                  <Image src={image} alt="image" width={512} height={512} />
                ) : (
                  <p className="text-sm whitespace-pre-wrap">{content}</p>
                )}
              </div>
              {!isBot && (
                <Avatar size="large" Image={<FaUser />} color="primary" />
              )}
            </motion.div>
          )
        })}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20, x: -200 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, y: -20, x: -200 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className={clsx("flex gap-2 self-start")}
            >
              <Avatar size="large" Image={<FaRobot />} color="secondary" />

              <div className="relative flex items-center justify-center gap-4 px-4 py-2 bg-white rounded-md drop-shadow">
                <span className="text-sm ">Loading...</span>
                <FaSpinner className="animate-spin" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <form
        className="flex flex-col items-end gap-4 p-4 border-t border-gray-300 lg:flex-row"
        onSubmit={handleSubmitQuestion}
      >
        <div className="flex flex-col flex-1 w-full">
          <label htmlFor="message">Message</label>
          <input
            id="message"
            type="text"
            placeholder="Type your message..."
            value={requestMessage}
            onChange={handleInputChange}
            className="w-full' px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            // onClick={handleSubmitQuestion}
            disabled={isLoading || !requestMessage}
            className={clsx(
              "flex items-center gap-2 px-4 py-2 text-white  rounded-md focus:outline-none hover:bg-blue-600",
              isDisabled ? "cursor-not-allowed bg-gray-400" : "bg-blue-500"
            )}
          >
            {isLoading && <FaSpinner className="animate-spin" />}
            Send Question
          </button>
          <button
            type="button"
            onClick={handleSubmitImage}
            disabled={isLoading}
            className={clsx(
              "flex items-center gap-2 px-4 py-2 text-white rounded-md focus:outline-none hover:bg-blue-600",
              isDisabled ? "cursor-not-allowed bg-gray-400" : "bg-blue-500"
            )}
          >
            <FaImage />
            Generate Image
          </button>
        </div>
      </form>
    </div>
  )
}

export default Chat
