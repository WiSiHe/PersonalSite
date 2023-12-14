import { cn } from "@/utils/utility"

type item = {
    label: string
    value: string
    Icon?: React.ReactNode
}

type ButtonGroup = {
    activeValue: string
    items: item[]
    handleChangeItem: (item: string) => void
}

const ButtonGroup = ({
    activeValue,
    handleChangeItem,
    items = [],
}: ButtonGroup) => {
    return (
        <div className="items-stretch rounded lg:flex ring ring-dark justify-stretch overflow-clip strech">
            {items.map((item) => {
                const isActive = activeValue === item.value || false
                return (
                    <button
                        key={item.value}
                        onClick={() => handleChangeItem(item.value)}
                        className={cn(
                            "w-full px-2 py-2 hover:bg-primary hover:text-tertiary active:bg-primary/90 active:text-white",
                            isActive
                                ? "bg-primary text-white"
                                : "bg-white text-dark",
                        )}
                    >
                        {item.label}
                    </button>
                )
            })}
        </div>
    )
}

export default ButtonGroup
