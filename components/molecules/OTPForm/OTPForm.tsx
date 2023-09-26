import clsx from "clsx"

interface iOTPFormProps {
    inputCode: string
    handleChange: (value: string) => void
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    isSubmitting?: boolean
}

const OTPForm = ({
    inputCode,
    handleChange,
    handleSubmit,
    isSubmitting,
}: iOTPFormProps) => {
    const inputCodeArray = inputCode.split("")

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="relative flex gap-2">
                {[...Array(6)].map((_, i) => {
                    const hasValue = inputCodeArray[i] !== undefined
                    return (
                        <label
                            key={i}
                            htmlFor="one-time-code"
                            className="flex items-center justify-center w-10 h-10 p-4 text-3xl leading-tight text-center bg-gray-200"
                        >
                            {hasValue ? inputCodeArray[i] : "*"}
                        </label>
                    )
                })}
                <input
                    type="text"
                    name="one-time-code"
                    id="one-time-code"
                    inputMode="numeric"
                    pattern="\d{6}"
                    autoComplete="one-time-code"
                    maxLength={6}
                    required
                    onChange={(e) => handleChange(e.target.value)}
                    className="w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                />
            </div>

            <div className="flex items-end justify-end">
                <button
                    className={clsx(
                        "flex px-4 py-2 text-white bg-green-500",
                        isSubmitting && "opacity-50",
                    )}
                    disabled={isSubmitting}
                >
                    <strong>Submit me!</strong>
                </button>
            </div>
        </form>
    )
}

export default OTPForm
