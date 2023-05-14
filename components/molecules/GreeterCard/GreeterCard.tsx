import { BiGame } from "react-icons/bi"
import { BsFillBrushFill } from "react-icons/bs"
import { HiOutlineDesktopComputer } from "react-icons/hi"

const GreeterCard = () => {
  return (
    <section className="relative flex flex-col justify-center h-full gap-4 p-4 text-white bg-primary">
      <h1 className="text-4xl">
        <strong>Henrik Wilhelm Sissener</strong>
      </h1>
      <ul>
        <li className="flex items-center gap-2">
          <HiOutlineDesktopComputer />
          <span>Senior Front-end developer</span>
        </li>
        <li className="flex items-center gap-2">
          <BsFillBrushFill />
          <span>Digital artist</span>
        </li>
        <li className="flex items-center gap-2">
          <BiGame />
          <span>Game developer</span>
        </li>
      </ul>
    </section>
  )
}

export default GreeterCard