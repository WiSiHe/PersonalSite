import clsx from "clsx"
import { useState } from "react"

type CheckboxProps = {
    label: string
    checked: boolean
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    color?: "primary" | "secondary" | "tertiary" | "white" | "black" | "gray"
    size?: "default" | "small" | "large"
    disabled?: boolean
    className?: string
}

const Checkbox = ({
    label,
    checked,
    onChange,
    color = "primary",
    size = "default",
    disabled = false,
    className,
    ...props
}: CheckboxProps) => {
    const [id] = useState(() => Math.random().toString(36).substring(2))
    const baseStyle = "flex items-center space-x-2"
    const sizeStyle = {
        default: "text-base",
        small: "text-sm",
        large: "text-lg",
    }
    const colorStyle = {
        primary: "text-primary",
        secondary: "text-secondary",
        tertiary: "text-tertiary",
        white: "text-white",
        black: "text-black",
        gray: "text-gray-300",
    }

    return (
        <div className="flex items-center gap-2">
            <input
                id={id}
                type="checkbox"
                checked={checked}
                onChange={onChange}
                disabled={disabled}
                className="accent-primary"
                {...props}
            />
            <label
                htmlFor={id}
                className={clsx(
                    baseStyle,
                    sizeStyle[size],
                    colorStyle[color],
                    disabled && "cursor-not-allowed opacity-50",
                    className,
                )}
            >
                {label}
            </label>
        </div>
    )
}

export default Checkbox
