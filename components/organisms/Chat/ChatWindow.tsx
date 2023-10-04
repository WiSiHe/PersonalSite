import clsx from "clsx"
import Avatar from "components/atoms/Avatar"
import LoadingDots from "components/atoms/LoadingDots"
import Serialiser from "components/atoms/Serialiser"
import { AnimatePresence, motion } from "framer-motion"
import { useOpenAIStore } from "lib/aiStore"
import Image from "next/image"
import { useEffect, useRef } from "react"
import { FaDownload, FaRobot, FaUser } from "react-icons/fa"
import { HiOutlineRefresh } from "react-icons/hi"

type Message = {
    role: "user" | "assistant"
    content?: string
    image?: string
}

const ChatWindow = ({
    isLoading,
    handleRegenerateImage,
}: {
    isLoading: boolean
    handleRegenerateImage: (e: React.MouseEvent<HTMLButtonElement>) => void
}) => {
    const chatLogs: Message[] = useOpenAIStore((state) => state.messages)

    const chatWindowRef = useRef<HTMLDivElement>(null)
    const scrollToBottom = () => {
        chatWindowRef.current?.scrollTo({
            top: chatWindowRef.current.scrollHeight,
            behavior: "smooth",
        })
    }

    const handleDownloadImage = (url: string) => {
        const a = document.createElement("a")
        a.href = url
        a.download = "image.png"
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    }

    useEffect(() => {
        scrollToBottom()
    }, [chatLogs, isLoading])

    return (
        <div
            ref={chatWindowRef}
            className="flex flex-col gap-8 min-h-[700px] px-4 pt-10 pb-32 overflow-y-scroll bg-dark/5"
        >
            {chatLogs.map((message, index) => {
                const { role, content = "", image } = message

                const isBot = role === "assistant"
                const hasImage = image !== undefined

                return (
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 0,
                            x: isBot ? -200 : 200,
                        }}
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
                            isBot ? "self-start" : "self-end",
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
                                <Image
                                    src={image}
                                    alt="image"
                                    width={512}
                                    height={512}
                                />

                                <div className="flex items-end justify-end gap-4 p-4 text-xs">
                                    <button
                                        onClick={handleRegenerateImage}
                                        className="flex items-center gap-2 px-4 py-3 text-white rounded-md top-4 right-4 bg-primary"
                                    >
                                        <HiOutlineRefresh />
                                        Regenerate image
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleDownloadImage(image)
                                        }
                                        className="flex items-center gap-2 px-4 py-3 text-white rounded-md top-4 right-4 bg-primary"
                                    >
                                        <FaDownload />
                                        Download image
                                    </button>
                                    {/* <a
                                        href={image}
                                        download
                                        className="flex items-center gap-2 px-4 py-3 text-white rounded-md bg-primary"
                                        target="_blank"
                                    >
                                        <FaDownload />
                                        Download image
                                    </a> */}
                                </div>
                            </div>
                        ) : (
                            <div className="relative max-w-5xl p-4 bg-white rounded-md drop-shadow">
                                {/* <p className="text-sm whitespace-pre-wrap">{content}</p> */}
                                <Serialiser content={content} />
                            </div>
                        )}

                        {!isBot && (
                            <Avatar
                                size="large"
                                Image={<FaUser />}
                                color="primary"
                            />
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
    )
}

export default ChatWindow
