interface Tooltip {
    children: React.ReactNode
    props?: any
}

const Tooltip = ({ children, ...props }: Tooltip) => {
    return <div {...props}>{children}</div>
}

export default Tooltip
