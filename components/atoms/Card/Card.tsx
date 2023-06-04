interface Card {
  children: React.ReactNode
  props?: any
}

const Card = ({ children, ...props }: Card) => {
  return <div {...props}>{children}</div>
}

export default Card
