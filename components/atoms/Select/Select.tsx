type Option = {
    value: string
    label: string
}

type SelectProps = {
    options: Option[]
} & React.SelectHTMLAttributes<HTMLSelectElement>

const Select = ({ options, ...props }: SelectProps) => {
    return (
        <select {...props}>
            {options.map((option, index) => (
                <option key={index} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    )
}

export default Select
