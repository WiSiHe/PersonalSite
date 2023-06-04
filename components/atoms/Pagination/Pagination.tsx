interface Pagination {
  children: React.ReactNode
  props?: any
}

const Pagination = ({ children, ...props }: Pagination) => {
  return <div {...props}>{children}</div>
}

export default Pagination
