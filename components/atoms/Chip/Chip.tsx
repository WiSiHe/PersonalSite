import clsx from "clsx"

interface iChipProps {
  children: React.ReactNode
}

const Chip = ({ children }: iChipProps) => {
  return (
    <span
      className={clsx(
        "py-2 px-4 text-xs whitespace-nowrap shrink-0 text-white bg-primary"
      )}
    >
      {children}
    </span>
  )
}

export default Chip
