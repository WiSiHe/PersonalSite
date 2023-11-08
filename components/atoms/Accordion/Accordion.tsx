type Accordion = {
    children: React.ReactNode
    className?: string
    label: string
    open?: boolean
}

const Accordion = ({
    children,
    open,
    className,
    label = "placeholder",
}: Accordion) => {
    return (
        <details className={className} open={open}>
            <summary className="font-bold">{label}</summary>
            {children}
        </details>
    )
}

export default Accordion
