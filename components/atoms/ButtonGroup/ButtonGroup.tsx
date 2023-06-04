interface ButtonGroup {
  children: React.ReactNode
  props?: any
}

const ButtonGroup = ({ children, ...props }: ButtonGroup) => {
  return (
    <div className="flex flex-row space-x-2" {...props}>
      {children}
    </div>
  )
}

export default ButtonGroup
