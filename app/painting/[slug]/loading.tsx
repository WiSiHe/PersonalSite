import Loader from "components/atoms/Loader/Loader"
import Main from "components/atoms/Main/Main"

export default function Loading() {
  return (
    <>
      <Main className="grid min-h-screen grid-cols-12 gap-4 p-4">
        <Loader /> <p>Loading...</p>
      </Main>
    </>
  )
}
