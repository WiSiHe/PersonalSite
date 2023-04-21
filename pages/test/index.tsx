import Main from "components/atoms/Main/Main"
import ScrollSection from "components/templates/ScrollSection/ScrollSection"
import Link from "next/link"

const TestPage = () => {
  return (
    <>
      <Main className="flex-col">
        <nav className="p-4 bg-white">
          <ul className="flex gap-4">
            <li>
              <Link href="/test/openai-chat">OpenAI Chat</Link>
            </li>
            <li>
              <Link href="/test/spline">spline</Link>
            </li>
            <li>
              <Link href="/test/svg">svg</Link>
            </li>
            <li>
              <Link href="/test/various">various</Link>
            </li>
          </ul>
        </nav>
        <ScrollSection />
      </Main>
    </>
  )
}

export default TestPage
