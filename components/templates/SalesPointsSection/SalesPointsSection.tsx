import Link from "next/link"
import { FaFolder, FaPaintBrush, FaVideo } from "react-icons/fa"

const SalesPointArray = [
  {
    title: "Paintings",
    description:
      "A collection of my paintings, some old, some new. I'm trying out new styles and techniques all the time, but I'll always have a soft spot for the portraits and landscapes. I keep hearing that my art looks Anime inspired, but I'm not sure if I should be happy or sad about that.",
    icon: <FaPaintBrush />,
    link: "/paintings",
  },
  {
    title: "Videos",
    description:
      "A collection of my videos, some old, some new. I'm trying out new styles and techniques all the time, but I'll always have a soft spot for the portraits and landscapes. I keep hearing that my art looks Anime inspired, but I'm not sure if I should be happy or sad about that.",
    icon: <FaVideo />,
    link: "/videos",
  },
  {
    title: "Projects",
    description:
      "A collection of my projects, some old, some new. I'm trying out new styles and techniques all the time, but I'll always have a soft spot for the portraits and landscapes. I keep hearing that my art looks Anime inspired, but I'm not sure if I should be happy or sad about that.",
    icon: <FaFolder />,
    link: "/projects",
  },
]

const SalesPointsSection = () => {
  return (
    <div className="grid max-w-screen-xl grid-cols-12 gap-4 p-4 mx-auto xl:gap-10">
      {SalesPointArray.map((point, i) => (
        <div className="bg-white shadow-xl col-span-full xl:col-span-4" key={i}>
          <div className="flex items-center justify-center gap-2 py-10 text-xl text-white bg-dark shrink-0">
            {point.icon}
            <h2>
              <strong>{point.title}</strong>
            </h2>
          </div>

          <div className="p-4">
            <p>{point.description}</p>
          </div>
          <Link
            href={point.link}
            className="block p-2 text-center text-dark bg-highlight"
          >
            <strong>View</strong>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default SalesPointsSection
