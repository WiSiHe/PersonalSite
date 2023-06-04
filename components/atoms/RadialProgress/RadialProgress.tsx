interface RadialProgress {
  children: React.ReactNode
  props?: any
}

const RadialProgress = ({ children, ...props }: RadialProgress) => {
  return <div {...props}>{children}</div>
}

export default RadialProgress
