interface Accordion {
    children: React.ReactNode
    className?: string
    props?: any
}

const Accordion = ({ children, className, ...props }: Accordion) => {
    return (
        <details className={className} {...props}>
            {children}
        </details>
    )
}

export default Accordion
