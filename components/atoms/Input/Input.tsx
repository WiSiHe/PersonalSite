import { forwardRef } from "react"

interface InputProps {
  className?: string
  type?: string
  placeholder?: string
  value?: string
  label: string
  error?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = "",
      type = "text",
      placeholder = "",
      label = "",
      value = "",
      error = "",
      onChange = () => null,
      ...props
    },
    ref
  ) => {
    return (
      <div>
        <label htmlFor="email" className="sr-only">
          {label}
        </label>

        <input
          className={`w-full px-4 py-2 text-gray-900 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 ${className}`}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          ref={ref}
          {...props}
        />
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>
    )
  }
)

Input.displayName = "Input"

export default Input
