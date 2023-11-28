interface Card {
    children: React.ReactNode
    props?: any
}

const Card = ({ children }: Card) => {
    return <div className="p-4 shadow-xl bg-tertiary">{children}</div>
}

export default Card
