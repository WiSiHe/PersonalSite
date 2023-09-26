interface Table {
    children: React.ReactNode
    props?: any
}

const Table = ({ children, ...props }: Table) => {
    return <table {...props}>{children}</table>
}

export default Table
