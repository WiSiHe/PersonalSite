interface Countdown {
  children: React.ReactNode
  props?: any
}

const Countdown = ({ children, ...props }: Countdown) => {
  return <div {...props}>{children}</div>
}

export default Countdown
