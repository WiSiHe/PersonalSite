import Main from "components/atoms/Main/Main"

export default function Loading() {
  return (
    <Main className="grid min-h-screen grid-cols-12 gap-4 p-4">
      {[...Array(25)].map((_, i) => (
        <div
          key={i}
          className="col-span-6 rounded-lg bg-primary/20 aspect-square md:col-span-4 lg:col-span-3 animate-pulse"
        />
      ))}
    </Main>
  )
}
