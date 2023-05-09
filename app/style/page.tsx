import Main from "components/atoms/Main/Main"

export const metadata = {
  title: "Style guide - WiSiHe",
  description: "A gallery of some of my paintings",
  locale: "en-US",
  type: "website",
}

export default async function Home() {
  return (
    <>
      <Main className="min-h-screen p-4">
        <div className="w-full space-y-2 capitalize">
          <h1>h1</h1>
          <h2>h2</h2>
          <h3>h3</h3>
          <h4>h4</h4>
          <h5>h5</h5>
          <h6>h6</h6>
          <hr />
          <div>
            <strong>strong</strong>
          </div>
          <div>
            <b>b</b>
          </div>
          <div>
            <em>em</em>
          </div>
          <p>p</p>
          <a href="#">a</a>
        </div>
      </Main>
    </>
  )
}
