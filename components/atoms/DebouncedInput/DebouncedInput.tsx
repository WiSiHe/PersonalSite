import React, { HTMLInputTypeAttribute, useEffect, useState } from "react"
import { cn } from "utils/utility"

type DebouncedInputProps = {
    placeholder: string
    onDebounce: (value: string) => void
    debounceDelay?: number
    type?: HTMLInputTypeAttribute
    name?: string
    hiddenLabel?: boolean
}

const DebouncedInput = ({
    placeholder,
    onDebounce,
    debounceDelay = 500,
    type = "text",
    name = "search",
    hiddenLabel = false,
}: DebouncedInputProps) => {
    const [inputValue, setInputValue] = useState("")

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            onDebounce(inputValue)
        }, debounceDelay)

        return () => {
            clearTimeout(debounceTimer)
        }
    }, [inputValue, onDebounce, debounceDelay])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    return (
        <div className="flex flex-col">
            <label
                htmlFor={name}
                className={cn("capitalize pb-1", hiddenLabel && "sr-only")}
            >
                <strong>{placeholder}</strong>
            </label>
            <input
                id={name}
                type={type}
                placeholder={placeholder}
                value={inputValue}
                onChange={handleInputChange}
                className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
        </div>
    )
}

export default DebouncedInput
