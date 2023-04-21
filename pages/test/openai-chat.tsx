import Main from "components/atoms/Main/Main"
import Meta from "components/atoms/Meta/Meta"
import Chat from "components/organisms/Chat"

const OpenAI = () => {
  return (
    <>
      <Meta />
      <Main className="w-full">
        <Chat />
      </Main>
    </>
  )
}

export default OpenAI
