import { Canvas, Main } from "components"

const TestPage = () => {
  // const handleDeleteSanityData = async () => {
  // delete specific document
  // sanity documents delete --dataset=production d3d22cd7-a1b7-4ad3-87c9-f861923249b7
  //   'sanity documents query "*[_type == "video" && _id == "8e2a0bf7-2fcb-4a44-98bf-5dac226e77ee"]._id" --apiVersion 2021-03-25  | groq "*" -o ndjson | xargs sanity documents delete'
  // }

  return (
    <>
      <Main noTopPadding>
        <section className="grid min-w-full min-h-screen bg-dark place-items-center">
          <div className="text-white">
            <Canvas />
          </div>
        </section>
      </Main>
    </>
  )
}

export default TestPage
