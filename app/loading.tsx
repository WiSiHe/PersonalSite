import Main from "components/atoms/Main/Main"
import GreeterCard from "components/molecules/GreeterCard"

export default function Loading() {
  return (
    <Main className="grid min-h-screen grid-cols-12 gap-4 p-4">
      <div className="h-full col-span-full md:col-span-8 lg:col-span-6 xl:col-span-6 2xl:col-span-4">
        <GreeterCard />
      </div>
      {[...Array(25)].map((_, i) => (
        <div
          key={i}
          className="col-span-6 rounded-lg bg-primary/20 aspect-square md:col-span-4 lg:col-span-3 2xl:col-span-2 animate-pulse"
        />
      ))}
    </Main>
  )
}
