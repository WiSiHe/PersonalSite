import React, { ChangeEvent, FocusEvent } from "react"

type TextFieldProps = {
  label: string
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  onBlur: (event: FocusEvent<HTMLInputElement>) => void
  error?: boolean
  helperText?: string
  id?: string
}

const TextField = (props: TextFieldProps) => {
  const { label, value, onChange, onBlur, error, helperText, id, ...rest } =
    props

  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`mt-1 block w-full rounded-md shadow-sm ${
          error
            ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
            : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
        } sm:text-sm`}
        {...rest}
      />
      {error && (
        <p className="mt-2 text-sm text-red-600" id={`${id}-error`}>
          {helperText}
        </p>
      )}
    </div>
  )
}

export default TextField
