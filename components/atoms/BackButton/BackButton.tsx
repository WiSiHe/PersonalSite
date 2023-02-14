import { useRouter } from "next/router"
import { IoArrowBackSharp } from "react-icons/io5"

const BackButton = () => {
  const router = useRouter()

  const handleGoBack = () => {
    router.back()
  }

  return (
    <div className="fixed z-20 bottom-4 left-4 xl:top-24 xl:left-4">
      <button
        onClick={handleGoBack}
        className="flex items-center justify-center gap-2 px-4 py-2 text-xl text-white transition-all duration-200 ease-in-out shadow-lg bg-primary hover:ring hover:shadow-lg active:bg-highlight focus:outline-none focus:ring focus:ring-highlight "
      >
        <IoArrowBackSharp /> Back
      </button>
    </div>
  )
}

export default BackButton
