interface ChatBubble {
    message: string
    isMine: boolean
    isLast?: boolean
}

const ChatBubble = ({ message, isMine, isLast }: ChatBubble) => {
    return (
        <div
            className={`flex ${isMine ? "justify-end" : "justify-start"} mb-4`}
        >
            <div className={`relative ${isMine ? "flex-row-reverse" : ""}`}>
                <div
                    className={`px-4 py-2 rounded-lg max-w-xs text-white ${
                        isMine ? "bg-blue-500" : "bg-gray-500"
                    }`}
                    style={{ maxWidth: "80%" }}
                >
                    {message}
                </div>
                <div
                    className={`absolute bottom-0 ${
                        isMine ? "left-0" : "right-0"
                    } transform ${
                        isMine
                            ? "-translate-x-2 translate-y-1"
                            : "translate-x-2 -translate-y-1"
                    } w-0 h-0`}
                    style={{
                        borderLeft: "10px solid transparent",
                        borderRight: "10px solid transparent",
                        borderTop: `10px solid ${isMine ? "blue" : "gray"}`,
                    }}
                ></div>
            </div>
        </div>
    )
}

export default ChatBubble
