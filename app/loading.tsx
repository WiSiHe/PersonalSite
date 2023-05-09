import Main from "components/atoms/Main/Main"
import GreeterCard from "components/molecules/GreeterCard"

export default function Loading() {
  return (
    <Main className="grid min-h-screen grid-cols-12 gap-4 p-4">
      <GreeterCard />
      {[...Array(11)].map((_, i) => (
        <div
          key={i}
          className="bg-gray-400 rounded-lg aspect-square col-span-full xl:col-span-3 animate-pulse"
        ></div>
      ))}
    </Main>
  )
}
