interface Stack {
    children: React.ReactNode
    props?: any
}

const Stack = ({ children, ...props }: Stack) => {
    return <div {...props}>{children}</div>
}

export default Stack
