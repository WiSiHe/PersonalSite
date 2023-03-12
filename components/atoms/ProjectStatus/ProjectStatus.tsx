import clsx from "clsx"
import { BsCheck, BsFillPauseFill, BsQuestionLg } from "react-icons/bs"
import { FaLightbulb, FaPause, FaRegLightbulb } from "react-icons/fa"
import { MdOutlineCancel } from "react-icons/md"

interface iStatus {
  status:
    | "inProgress"
    | "completed"
    | "onHold"
    | "cancelled"
    | "abandoned"
    | "unknown"
    | "notStarted"
    | "planned"
}

const ProjectStatus = ({ status }: iStatus) => {
  const projectStatusColor = {
    inProgress: "bg-blue-500 text-white",
    completed: "bg-green-500 text-white",
    onHold: "bg-gray-500",
    cancelled: "bg-red-500 text-white",
    abandoned: "bg-yellow-500",
    unknown: "bg-gray-500",
    notStarted: "bg-gray-500 text-white",
    planned: "bg-yellow-500",
  }

  const projectStatusIcon = {
    inProgress: <BsCheck />,
    completed: <BsCheck />,
    onHold: <BsFillPauseFill />,
    cancelled: <MdOutlineCancel />,
    abandoned: <FaRegLightbulb />,
    unknown: <BsQuestionLg />,
    notStarted: <FaPause />,
    planned: <FaLightbulb />,
  }

  return (
    <div
      className={clsx(
        "flex items-center text-xs gap-1 px-2 py-1 backdrop-blur text-dark",
        projectStatusColor[status]
      )}
    >
      <div className={clsx()}>{projectStatusIcon[status]}</div>
      <div className="capitalize">
        <strong>{status}</strong>
      </div>
    </div>
  )
}

export default ProjectStatus
