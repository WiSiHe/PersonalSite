type ColumnProps = {
    children: React.ReactNode
    className?: string
}

const Column = ({ children, ...props }: ColumnProps) => {
    return <div {...props}>{children}</div>
}

export default Column
