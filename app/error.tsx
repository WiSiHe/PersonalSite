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
      <div className="p-10 bg-white rounded h-fit">
        <h1>Something went wrong!</h1>
        <div className="py-4">
          <strong>Error:</strong>
          <div className="p-4 bg-gray-200">
            <code>{error.message}.</code>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={() => reset()}
            className="px-4 py-3 text-white rounded bg-primary "
          >
            Try again
          </button>
        </div>
      </div>
    </Main>
  )
}
