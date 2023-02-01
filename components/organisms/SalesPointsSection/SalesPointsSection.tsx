import Link from "next/link"
import { FaFolder, FaPaintBrush, FaVideo } from "react-icons/fa"

const SalesPointsSection = () => {
  return (
    <div className="grid-cols-12 grid gap-4 xl:gap-10 max-w-screen-xl mx-auto">
      <div className="p-4 col-span-full xl:col-span-6 xl:col-start-3  flex gap-4 items-start xl:items-center text-sm">
        <div className="w-16 h-16 bg-highlight shrink-0 flex justify-center items-center text-dark">
          <FaPaintBrush />
        </div>
        <div>
          <h2>
            <strong>Paintings</strong>
          </h2>
          <p>
            A collection of my paintings, some old, some new. I&#39;m trying out
            new styles and techniques all the time, but I&#39;ll always have a
            soft spot for the portraits and landscapes. I keep hearing that my
            art looks Anime inspired, but I&#39;m not sure if I should be happy
            or sad about that.
          </p>
          <Link
            href="/paintings"
            className="underline underline-offset-2 justify-self-end flex"
          >
            <strong>Take a look at my paintings</strong>
          </Link>
        </div>
      </div>
      <div className="p-4 col-span-full xl:col-span-6 xl:col-start-3 flex gap-4 items-start xl:items-center text-sm">
        <div className="w-16 h-16 bg-secondary shrink-0 flex justify-center items-center text-white">
          <FaFolder />
        </div>
        <div>
          <h2>
            <strong>Projects</strong>
          </h2>
          <p>
            Some of my old, ongoing or future projects. Could be physical or
            digital art, game development or just something I find interresting
            at the time. Never stop learning!
          </p>

          <Link
            href="/projects"
            className="underline underline-offset-2 whitespace-nowrap"
          >
            <strong>Take a look at my projects</strong>
          </Link>
        </div>
      </div>
      <div className="p-4 col-span-full xl:col-span-6 xl:col-start-3 flex gap-4 items-start xl:items-center text-sm">
        <div className="w-16 h-16 bg-primary shrink-0 flex justify-center items-center text-white">
          <FaVideo />
        </div>
        <div>
          <div>
            <h2>
              <strong>Videos</strong>
            </h2>
            <p>
              A collection of some stuff I&#39;ve published to YouTube over the
              years, some of it is associated with music, some of it is
              animations and Game Dev stuff.
            </p>
          </div>
          <Link
            href="/videos"
            className="underline underline-offset-2 whitespace-nowrap"
          >
            <strong>Take a look at my videos</strong>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SalesPointsSection
