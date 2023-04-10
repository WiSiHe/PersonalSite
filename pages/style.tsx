import Main from "components/atoms/Main/Main"
import Meta from "components/atoms/Meta/Meta"

const StylePage = () => {
  return (
    <>
      <Meta />
      <Main noTopPadding className="p-4">
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

export default StylePage
