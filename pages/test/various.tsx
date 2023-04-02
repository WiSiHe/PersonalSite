import Main from "components/atoms/Main/Main"

const TestPage = () => {
  // generate random svg shapes
  const shapes = Array.from({ length: 10 }, () => {
    const size = Math.floor(Math.random() * 100)
    const position = Math.floor(Math.random() * 100)
    const color = Math.floor(Math.random() * 360)
    const shape = Math.floor(Math.random() * 2) ? "circle" : "square"
    const animation = Math.floor(Math.random() * 2) ? "spin" : "float"
    const animationDuration = Math.floor(Math.random() * 10) + 5
    const animationDelay = Math.floor(Math.random() * 10) + 5

    return {
      size,
      position,
      color,
      shape,
      animation,
      animationDuration,
      animationDelay,
    }
  })

  return (
    <>
      <Main noTopPadding>
        <section className="grid min-w-full min-h-screen bg-dark place-items-center">
          <div className="relative w-64 h-64">
            {shapes.map((shape, index) => (
              <div
                key={index}
                className={`absolute animate-${shape.animation}`}
                style={{
                  top: `${shape.position}%`,
                  left: `${shape.position}%`,
                  width: `${shape.size}px`,
                  height: `${shape.size}px`,
                  borderRadius: shape.shape === "circle" ? "50%" : "0",
                  backgroundColor: `hsl(${shape.color}, 100%, 50%)`,
                  animationDuration: `${shape.animationDuration}s`,
                  animationDelay: `${shape.animationDelay}s`,
                }}
              ></div>
            ))}
          </div>
        </section>
      </Main>
    </>
  )
}

export default TestPage
