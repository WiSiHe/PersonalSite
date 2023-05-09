import Loader from "components/atoms/Loader/Loader"
import Main from "components/atoms/Main/Main"

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <>
      <Main className="items-center justify-center min-h-screen">
        <div className="">
          Loading...
          <Loader />
        </div>
      </Main>
    </>
  )
}
