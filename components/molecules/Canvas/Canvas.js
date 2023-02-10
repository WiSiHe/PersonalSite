/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { getRandomArbitrary } from "utils/numbers"

function Canvas() {
  const canvasRef = useRef(null)

  const [counter, setCounter] = useState(0)
  const [shouldStop, setShouldStop] = useState(false)
  const particles = 1
  const motionType = "Bounce"

  // box position and speed
  const [positionX, setPositionX] = useState(165)
  const [positionY, setPositionY] = useState(165)

  const [dx, setDx] = useState(1.5)
  const [dy, setDy] = useState(1.5)

  // update the counter
  //   useLayoutEffect(() => {
  //     if (!shouldStop) {
  //       let timerId

  //       const animate = () => {
  //         setCounter((c) => c + 1)

  //         timerId = requestAnimationFrame(animate)
  //       }
  //       timerId = requestAnimationFrame(animate)
  //       return () => cancelAnimationFrame(timerId)
  //     }
  //   }, [shouldStop])

  //   useEffect(() => {
  //     const canvas = canvasRef.current
  //     const context = canvas.getContext("2d")

  //     context.clearRect(0, 0, 350, 350)

  //     // motion
  //     if (motionType === "Circle") {
  //       setPositionX((x) => Math.sin(counter * 0.025) * 130 + 165)
  //       setPositionY((y) => -Math.cos(counter * 0.025) * 130 + 165)
  //     }
  //     if (motionType === "Bounce") {
  //       setPositionX((x) => x + dx)
  //       setPositionY((y) => y + dy)
  //     }

  //     // collision
  //     if (positionX > 300) {
  //       setDx((dxPrev) => dxPrev * -1)
  //       setPositionX((x) => x - 10)
  //     }
  //     if (positionX < 30) {
  //       setDx((dxPrev) => dxPrev * -1)
  //       setPositionX((x) => x + 10)
  //     }
  //     if (positionY > 300) {
  //       setDy((dyPrev) => dyPrev * -1)
  //       setPositionY((y) => y - 10)
  //     }
  //     if (positionY < 30) {
  //       setDy((dyPrev) => dyPrev * -1)
  //       setPositionY((y) => y + 10)
  //     }

  //     context.fillStyle = "#ddeaf8"

  //     for (let i = 0; i < particles; i++) {
  //       context.fillRect(positionX, positionY, 20, 20)
  //       context.fillRect(positionX + 20, positionY, 20, 20)
  //       context.fillRect(positionX + 40, positionY, 20, 20)
  //     }
  //   }, [counter])

  //   useEffect(() => {
  //     const canvas = canvasRef.current
  //     const context = canvas.getContext("2d")

  //     context.clearRect(0, 0, 350, 350)

  //     if (motionType === "Bounce") {
  //       setPositionX((x) => x + dx)
  //       setPositionY((y) => y + dy)
  //     }

  //     // collision
  //     if (positionX > 300) {
  //       setDx((dxPrev) => dxPrev * -1)
  //       setPositionX((x) => x - 5)
  //     }
  //     if (positionX < 30) {
  //       setDx((dxPrev) => dxPrev * -1)
  //       setPositionX((x) => x + 5)
  //     }
  //     if (positionY > 300) {
  //       setDy((dyPrev) => dyPrev * -1)
  //       setPositionY((y) => y - 5)
  //     }
  //     if (positionY < 30) {
  //       setDy((dyPrev) => dyPrev * -1)
  //       setPositionY((y) => y + 5)
  //     }

  //     for (let i = 0; i < particles; i++) {
  //       //   context.fillStyle = `rgba(221, 234, 248, ${1 - i / particles})`
  //       context.fillStyle = `rgba(221, 234, 248, ${1})`
  //       // get random hex color
  //       context.fillStyle = `#${Math.floor(Math.random() * 16777215).toString(
  //         16
  //       )}`
  //       context.fillRect(
  //         positionX + i * getRandomArbitrary(-10, 10),
  //         positionY + i * getRandomArbitrary(-10, 10),
  //         20 - i,
  //         20 - i
  //       )
  //     }
  //   }, [counter])

  const draw = (ctx, frameCount) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.fillStyle = "#000000"
    ctx.beginPath()
    ctx.arc(
      getRandomArbitrary(0, 100),
      getRandomArbitrary(0, 100),
      20 * Math.sin(frameCount * 0.05) ** 2,
      0,
      2 * Math.PI
    )
    ctx.fill()
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext("2d")
    let frameCount = 0
    let animationFrameId

    //Our draw came here
    const render = () => {
      frameCount++
      //   draw(context, frameCount)
      for (let i = 0; i < particles; i++) {
        draw(context, frameCount)
      }
      animationFrameId = window.requestAnimationFrame(render)
    }
    render()

    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [draw])

  return (
    <div className="relative">
      <div className="relative w-fit h-fit">
        <canvas
          ref={canvasRef}
          width="350px"
          height="350px"
          // onClick={changeMotionType}
          className="border border-gray-300 bg-white"
        />
        {/* <div className="bg-red-500/5 absolute inset-0 backdrop-blur-xl" /> */}
      </div>
      <h3>Frame count: {counter}</h3>
      <p>Motion type is {motionType}</p>
      <button onClick={() => setShouldStop(!shouldStop)}>
        {shouldStop ? "Start" : "Stop"}
      </button>
    </div>
  )
}

export default Canvas
