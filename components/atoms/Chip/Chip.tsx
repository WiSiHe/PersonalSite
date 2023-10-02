import clsx from "clsx"

interface iChipProps {
    children: React.ReactNode
    hasStatus?: "notSelected" | "selected"
}

const Chip = ({ children, hasStatus = "notSelected" }: iChipProps) => {
    const statusStyle = {
        notSelected: "bg-primary text-white",
        selected: "bg-highlight text-dark",
    }
    return (
        <div
            className={clsx(
                statusStyle[hasStatus],
                "py-2 px-4 text-xs flex rounded uppercase whitespace-nowrap shrink-0 pointer-events-none justify-center items-center",
            )}
        >
            <strong className="flex items-center gap-1">{children}</strong>
        </div>
    )
}

export default Chip
