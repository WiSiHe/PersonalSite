import clsx from "clsx"
import Avatar from "components/atoms/Avatar"
import LoadingDots from "components/atoms/LoadingDots"
import Serialiser from "components/atoms/Serialiser"
import { AnimatePresence, motion } from "framer-motion"
// import { useGetFromStore } from "hooks/useZustand"
import { useOpenAIStore } from "lib/aiStore"
import Image from "next/image"
import React, { useEffect, useRef, useState } from "react"
import { FaDownload, FaImage, FaRobot, FaSpinner, FaUser } from "react-icons/fa"
import { HiOutlineRefresh } from "react-icons/hi"
import { MdClear } from "react-icons/md"
import { isNotEmptyObject } from "utils/object"

interface Message {
  role: "user" | "assistant"
  content?: string
  image?: string
}

const Chat = () => {
  const chatWindowRef = useRef<HTMLDivElement>(null)

  const [chatState, setChatState] = useState<Message[]>([])

  const chatLogs: Message[] = useOpenAIStore((state) => state.messages)
  const setChatLogs = useOpenAIStore((state) => state.addMessage)
  const clearMessages = useOpenAIStore((state) => state.clearMessages)

  const [lastSentMessage, setLastSentMessage] = useState("")

  const [requestMessage, setRequestMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const isDisabled = !requestMessage || isLoading

  const scrollToBottom = () => {
    chatWindowRef.current?.scrollTo({
      top: chatWindowRef.current.scrollHeight,
      behavior: "smooth",
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRequestMessage(e.target.value)
  }

  const handleSubmitQuestion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!requestMessage) return
    setIsLoading(true)
    // setChatLogs([...chatLogs, { role: "user", content: requestMessage }])
    setChatLogs({ role: "user", content: requestMessage })
    const filteredChatLogs = chatLogs.filter((message) => {
      return message.image === undefined
    })
    const newChatLogs = [
      ...filteredChatLogs,
      { role: "user", content: requestMessage },
    ]
    setLastSentMessage(requestMessage)

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
        // setChatLogs([
        //   ...chatLogs,
        //   { role: "user", content: requestMessage },
        //   response,
        // ])
        setChatLogs(response)
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
    setChatLogs({ role: "user", content: requestMessage })
    const newChatLogs = [...chatLogs, { role: "user", content: requestMessage }]
    setLastSentMessage(requestMessage)

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

      if (isNotEmptyObject(response)) {
        setChatLogs({ role: "assistant", image: response.text })
      }
    } catch (err) {
      console.error(err)
    }
    setRequestMessage("")
    setIsLoading(false)
  }

  const handleRegenerateImage = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault()
    if (!lastSentMessage) return
    setIsLoading(true)

    try {
      const response = await fetch("/api/openai-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: lastSentMessage,
          messages: chatLogs,
        }),
      }).then((res) => res.json())
      if (isNotEmptyObject(response)) {
        setChatLogs({ role: "assistant", image: response.text })
      }
    } catch (err) {
      console.error(err)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    scrollToBottom()
  }, [chatLogs, isLoading])

  useEffect(() => {
    setChatState(chatLogs)
  }, [chatLogs])

  // implement later
  // https://www.youtube.com/watch?v=E0fp2KUWRtQ&ab_channel=aWeekOfExperience
  // const test = useGetFromStore(useOpenAIStore, (state: any) => state.messages)

  return (
    <div className="flex flex-col h-[90vh] w-full">
      <div className="flex items-end justify-between p-4 border-b border-b-primary drop-shadow-md">
        <div>
          <h1>HenrikGPT</h1>
          <p>Generate images and text with OpenAI&#39;s GPT-3 and DALL-E</p>
        </div>
        <button
          onClick={clearMessages}
          className="flex items-center flex-shrink-0 gap-2 px-4 py-3 text-white rounded-md bg-primary"
        >
          <MdClear />
          Clear chat
        </button>
      </div>

      <div
        ref={chatWindowRef}
        className="flex flex-col flex-1 gap-4 px-4 py-10 overflow-y-auto bg-white/20"
      >
        {/* Chat messages */}
        {chatState.map((message, index) => {
          const { role, content = "", image } = message

          const isBot = role === "assistant"
          const hasImage = image !== undefined

          return (
            <motion.div
              initial={{ opacity: 0, y: 0, x: isBot ? -200 : 200 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30,
                duration: 0.5,
                staggerChildren: 0.1,
                delayChildren: 0.3,
              }}
              key={index}
              className={clsx(
                "flex gap-2 items-start",
                isBot ? "self-start" : "self-end"
              )}
            >
              {isBot && (
                <Avatar
                  size="large"
                  Image={!isBot ? <FaUser /> : <FaRobot />}
                  color="gray"
                />
              )}

              {hasImage ? (
                <div className="relative bg-white rounded-md overflow-clip drop-shadow">
                  <Image src={image} alt="image" width={512} height={512} />
                  <div className="flex items-end justify-end gap-4 p-4 text-xs">
                    <button
                      onClick={handleRegenerateImage}
                      className="flex items-center gap-2 px-4 py-3 text-white rounded-md top-4 right-4 bg-primary"
                    >
                      <HiOutlineRefresh />
                      Regenerate image
                    </button>

                    <a
                      href={image}
                      download
                      className="flex items-center gap-2 px-4 py-3 text-white rounded-md bg-primary"
                      target="_blank"
                    >
                      <FaDownload />
                      Download image
                    </a>
                  </div>
                </div>
              ) : (
                <div className="relative max-w-5xl p-4 bg-white rounded-md drop-shadow">
                  {/* <p className="text-sm whitespace-pre-wrap">{content}</p> */}
                  <Serialiser content={content} />
                </div>
              )}

              {!isBot && (
                <Avatar size="large" Image={<FaUser />} color="primary" />
              )}
            </motion.div>
          )
        })}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 0, x: -200 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, y: 0, x: -200 }}
              transition={{ type: "spring", duration: 1 }}
              className="flex self-start gap-2"
            >
              <Avatar size="large" Image={<FaRobot />} color="gray" />

              <div className="relative flex items-center justify-center gap-4 px-4 py-2 bg-white rounded-md drop-shadow">
                <LoadingDots />
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
            {isLoading ? <FaSpinner className="animate-spin" /> : <FaRobot />}
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
            {isLoading ? <FaSpinner className="animate-spin" /> : <FaImage />}
            Generate Image
          </button>
        </div>
      </form>
    </div>
  )
}

export default Chat
