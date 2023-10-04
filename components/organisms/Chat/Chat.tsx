"use client"
import clsx from "clsx"
import Avatar from "components/atoms/Avatar"
import DebouncedInput from "components/atoms/DebouncedInput"
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

import ChatForm from "./ChatForm"
import ChatWindow from "./ChatWindow"

interface Message {
    role: "user" | "assistant"
    content?: string
    image?: string
}

const Chat = () => {
    const chatLogs: Message[] = useOpenAIStore((state) => state.messages)
    const setChatLogs = useOpenAIStore((state) => state.addMessage)
    const clearMessages = useOpenAIStore((state) => state.clearMessages)

    const [lastSentMessage, setLastSentMessage] = useState("")

    const [requestMessage, setRequestMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const isDisabled = !requestMessage || isLoading

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRequestMessage(e.target.value)
    }

    const handleSubmitQuestion = async (
        e: React.FormEvent<HTMLFormElement>,
    ) => {
        e.preventDefault()
        if (!requestMessage) return
        setIsLoading(true)
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
                setChatLogs(response)
            }
        } catch (err) {
            console.error(err)
        }
        setRequestMessage("")
        setIsLoading(false)
    }

    const handleSubmitImage = async (
        e: React.MouseEvent<HTMLButtonElement>,
    ) => {
        e.preventDefault()
        if (!requestMessage) return
        setIsLoading(true)
        setChatLogs({ role: "user", content: requestMessage })
        const newChatLogs = [
            ...chatLogs,
            { role: "user", content: requestMessage },
        ]
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
        e: React.MouseEvent<HTMLButtonElement>,
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

    // useEffect(() => {
    //     setChatState(chatLogs)
    // }, [chatLogs])

    // implement later
    // https://www.youtube.com/watch?v=E0fp2KUWRtQ&ab_channel=aWeekOfExperience
    // const test = useGetFromStore(useOpenAIStore, (state: any) => state.messages)

    return (
        <>
            <div className="relative h-full col-span-8 overflow-y-scroll bg-white rounded shadow-xl">
                <div className="sticky top-0 left-0 right-0 z-10 flex items-end justify-between p-4 bg-white drop-shadow-md">
                    <div>
                        <h1>HenrikGPT</h1>
                        <p>
                            Generate images and text with OpenAI&#39;s GPT-3 and
                            DALL-E
                        </p>
                    </div>
                    <button
                        onClick={clearMessages}
                        className="flex items-center flex-shrink-0 gap-2 px-4 py-3 text-white rounded-md bg-primary"
                    >
                        <MdClear />
                        Clear chat
                    </button>
                </div>
                <ChatWindow
                    isLoading={isLoading}
                    handleRegenerateImage={(e) => handleRegenerateImage(e)}
                />
                <ChatForm
                    handleSubmitQuestion={(e) => handleSubmitQuestion(e)}
                    handleSubmitImage={(e) => handleSubmitImage(e)}
                    isLoading={isLoading}
                    requestMessage={requestMessage}
                    handleInputChange={setRequestMessage}
                    isDisabled={isDisabled}
                />
            </div>
            <div className="col-span-4 p-4 bg-white rounded shadow-xl">
                <p>Test</p>
            </div>
        </>
    )
}

export default Chat
