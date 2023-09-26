interface Steps {
    children: React.ReactNode
    props?: any
}

const Steps = ({ children, ...props }: Steps) => {
    return <div {...props}>{children}</div>
}

export default Steps
