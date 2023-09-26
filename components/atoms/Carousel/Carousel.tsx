interface Carousel {
    children: React.ReactNode
}
const Carousel = ({ children, ...props }: Carousel) => {
    return <div {...props} />
}

export default Carousel
