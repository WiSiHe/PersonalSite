"use client" // Error components must be Client components

import Main from "components/atoms/Main/Main"
import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <Main className="items-center justify-center min-h-screen">
      <div className="p-10 bg-white rounded-lg drop-shadow-2xl h-fit">
        <h2>Something went wrong!</h2>
        <p>{error.message}</p>
        <button onClick={() => reset()} className="px-4 py-3 bg-primary">
          Try again
        </button>
      </div>
    </Main>
  )
}
