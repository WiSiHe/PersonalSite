interface Button {
  children: React.ReactNode
  props?: any
}

const Button = ({ children, ...props }: Button) => {
  return <button {...props}>{children}</button>
}

export default Button
