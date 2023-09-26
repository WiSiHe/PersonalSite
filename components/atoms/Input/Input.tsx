// import { forwardRef } from "react"

interface InputProps {
    type: "text" | "email" | "password" | "number"
    placeholder: string
    value: string
    label: string
    error?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

// const Input = forwardRef<HTMLInputElement, InputProps>(
//   (
//     {
//       type = "text",
//       placeholder = "",
//       label = "",
//       value = "",
//       error = "",
//       onChange = () => null,
//       ...props
//     },
//     ref
//   ) => {
//     return (
//       <div>
//         <label htmlFor={label}>{label}</label>
//         <input
//           className={
//             "w-full px-4 py-2 text-gray-900 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
//           }
//           type={type}
//           placeholder={placeholder}
//           value={value}
//           onChange={onChange}
//           ref={ref}
//           id={label}
//           {...props}
//         />
//         {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
//       </div>
//     )
//   }
// )

const Input = ({
    type = "text",
    placeholder = "",
    label = "",
    value = "",
    error = "",
    onChange = () => null,
}: InputProps) => {
    return (
        <div className="flex flex-col">
            <label htmlFor="email">{label}</label>
            <input
                className={
                    "w-full px-4 py-2 text-gray-900 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" +
                    (error ? " border-red-500" : "")
                }
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                id="email"
            />
            {error && (
                <span className="mt-2 text-sm text-left text-red-500">
                    {error}
                </span>
            )}
        </div>
    )
}

Input.displayName = "Input"

export default Input
