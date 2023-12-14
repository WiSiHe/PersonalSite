import { useState } from "react"
import { Button as AriaButton } from "react-aria-components"

import { cn } from "@/utils/utility"

// interface Button {
//     children: React.ReactNode
//     isDisabled?: boolean
//     isOutlined?: boolean
//     color?: "primary" | "secondary" | "tertiary" | "dark" | "light" | "default"
//     size?: "small" | "medium" | "large"
//     onClick?: () => void
//     label?: string
// }

// const Button = ({
//     children,
//     label,
//     color = "default",
//     size = "medium",
//     isDisabled,
//     isOutlined,
//     onClick,
// }: Button) => {

//     return (
//         <button
//             className={cn(
//                 "flex gap-2 items-center justify-center rounded",
//                 buttonStyle,
//                 buttonSize,
//                 isOutlined && outlineStyle,
//                 isOutlined && "border-2",
//                 isDisabled && isDisabledStyle,
//             )}
//             aria-label={label}
//             disabled={isDisabled}
//             onClick={onClick}
//         >
//             {children}
//         </button>
//     )
// }

// export default Button

type Button = {
    children: React.ReactNode
    isDisabled?: boolean
    isOutlined?: boolean
    color?: "primary" | "secondary" | "tertiary" | "dark" | "light" | "default"
    size?: "small" | "medium" | "large"
    onClick?: () => void
    label?: string
}

const Button = ({
    children,
    color = "default",
    size = "medium",
    isDisabled,
    isOutlined,
    ...props
}: Button) => {
    const [pointerType, setPointerType] = useState("")

    const buttonStyle = {
        primary: "bg-primary text-white",
        secondary: "bg-secondary text-white",
        tertiary: "bg-tertiary text-white",
        dark: "bg-dark text-white",
        light: "bg-light text-black",
        default: "bg-primary text-white",
    }[color]

    const buttonSize = {
        small: "py-1 px-2 text-sm",
        medium: "py-2 px-4 text-base",
        large: "py-3 px-6 text-lg",
    }[size]

    const isDisabledStyle = {
        primary: "bg-primary text-white opacity-50 cursor-not-allowed",
        secondary: "bg-secondary text-white opacity-50 cursor-not-allowed",
        tertiary: "bg-tertiary text-white opacity-50 cursor-not-allowed",
        dark: "bg-dark text-white opacity-50 cursor-not-allowed",
        light: "bg-light text-black opacity-50 cursor-not-allowed",
        default: "bg-primary text-white opacity-50 cursor-not-allowed",
    }[color]

    const outlineStyle = {
        primary: "bg-transparent border-primary text-primary",
        secondary: "bg-transparent border-secondary text-secondary",
        tertiary: "bg-transparent border-tertiary text-tertiary",
        dark: "bg-transparent border-dark text-dark",
        light: "bg-transparent border-light text-light",
        default: "bg-transparent border-primary text-primary",
    }[color]

    return (
        <>
            <AriaButton
                onPressStart={(e) => setPointerType(e.pointerType)}
                onPressEnd={() => setPointerType("")}
                {...props}
                className={({
                    isPressed,
                    isFocused,
                    isHovered,
                    isFocusVisible,
                    isDisabled,
                }) =>
                    cn(
                        "transition-all duration-300 ease-in-out flex gap-2 items-center justify-center rounded",
                        buttonStyle,
                        buttonSize,
                        isOutlined && outlineStyle,
                        isOutlined && "border-2",
                        // isFocusVisible &&
                        //     "ring-2 ring-offset-2 ring-offset-gray-100 ring-white ring-opacity-60",
                        // isFocused &&
                        //     "ring-2 ring-offset-2 ring-offset-gray-100 ring-white ring-opacity-60",
                        // isPressed &&
                        //     "ring-2 ring-offset-2 ring-offset-gray-100 ring-white ring-opacity-60",
                        // isHovered && "bg-gray-700",
                        isHovered && "opacity-90",
                        isDisabled && isDisabledStyle,
                    )
                }
            >
                {children}
            </AriaButton>
            <p>
                {pointerType
                    ? `You are pressing the button with a ${pointerType}!`
                    : "Ready to be pressed."}
            </p>
        </>
    )
}

export default Button
