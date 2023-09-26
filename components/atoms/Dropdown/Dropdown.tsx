interface Dropdown {
    props?: any
}

const Dropdown = ({ props }: Dropdown) => {
    return <div {...props} />
}

export default Dropdown
