interface Carousel {
    children: React.ReactNode
}
const Carousel = ({ children }: Carousel) => {
    return (
        <div>
            <div>{children}</div>
        </div>
    )
}

export default Carousel
