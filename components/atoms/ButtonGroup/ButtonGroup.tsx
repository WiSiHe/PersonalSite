type ButtonGroup = {
    options: string[]
}

const ButtonGroup = ({ options = [] }: ButtonGroup) => {
    return (
        <ul className="flex flex-row space-x-2">
            {options.map((option, i) => {
                return (
                    <li key={i}>
                        <button className="px-4 py-2 text-white rounded-lg bg-primary hover:bg-primary/90">
                            {option}
                        </button>
                    </li>
                )
            })}
        </ul>
    )
}

export default ButtonGroup
