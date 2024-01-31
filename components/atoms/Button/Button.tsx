import { cn } from "@/utils/utility"

type Button = {
    children: React.ReactNode
    isDisabled?: boolean
    isOutlined?: boolean
    color?: "primary" | "secondary" | "tertiary" | "default"
    size?: "small" | "medium" | "large"
    onClick?: () => void
    label?: string
}

const Button = ({
    children,
    label,
    color = "default",
    size = "medium",
    isDisabled,
    isOutlined,
    onClick,
}: Button) => {
    const buttonStyle = {
        primary: "bg-primary text-white",
        secondary: "bg-secondary text-white",
        tertiary: "bg-tertiary text-white",
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

        default: "bg-primary text-white opacity-50 cursor-not-allowed",
    }[color]

    const outlineStyle = {
        primary: "bg-transparent border-primary text-primary",
        secondary: "bg-transparent border-secondary text-secondary",
        tertiary: "bg-transparent border-tertiary text-tertiary",

        default: "bg-transparent border-primary text-primary",
    }[color]

    return (
        <button
            className={cn(
                "flex gap-2 items-center justify-center rounded",
                buttonStyle,
                buttonSize,
                isOutlined && outlineStyle,
                isOutlined && "border-2",
                isDisabled && isDisabledStyle,
            )}
            aria-label={label}
            disabled={isDisabled}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default Button
