import clsx from "clsx"
import DebouncedInput from "components/atoms/DebouncedInput"
import { FaImage, FaRobot, FaSpinner } from "react-icons/fa"

type ChatForm = {
    handleSubmitQuestion: (e: React.FormEvent<HTMLFormElement>) => void
    handleSubmitImage: (e: React.MouseEvent<HTMLButtonElement>) => void
    isLoading: boolean
    requestMessage: string
    handleInputChange: (e: string) => void
    isDisabled: boolean
}

const ChatForm = ({
    handleSubmitQuestion,
    handleSubmitImage,
    isLoading,
    requestMessage,
    handleInputChange,
    isDisabled,
}: ChatForm) => {
    return (
        <form
            className="sticky bottom-0 left-0 right-0 flex flex-col items-end gap-4 p-4 bg-white border-t lg:flex-row"
            onSubmit={handleSubmitQuestion}
        >
            <div className="flex flex-col flex-1 w-full">
                <DebouncedInput
                    name="message"
                    onDebounce={handleInputChange}
                    placeholder="Type you message..."
                    type="search"
                    debounceDelay={50}
                />
            </div>
            <div className="flex gap-4">
                <button
                    type="submit"
                    // onClick={handleSubmitQuestion}
                    disabled={isLoading || !requestMessage}
                    className={clsx(
                        "flex items-center gap-2 px-4 py-2 text-white  rounded-md hover:bg-blue-600",
                        isDisabled
                            ? "cursor-not-allowed bg-gray-400"
                            : "bg-blue-500",
                    )}
                >
                    {isLoading ? (
                        <FaSpinner className="animate-spin" />
                    ) : (
                        <FaRobot />
                    )}
                    Send Question
                </button>
                <button
                    type="button"
                    onClick={handleSubmitImage}
                    disabled={isLoading}
                    className={clsx(
                        "flex items-center gap-2 px-4 py-2 text-white rounded-md hover:bg-blue-600",
                        isDisabled
                            ? "cursor-not-allowed bg-gray-400"
                            : "bg-blue-500",
                    )}
                >
                    {isLoading ? (
                        <FaSpinner className="animate-spin" />
                    ) : (
                        <FaImage />
                    )}
                    Generate Image
                </button>
            </div>
        </form>
    )
}

export default ChatForm
