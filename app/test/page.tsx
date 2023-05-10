import Main from "components/atoms/Main/Main"
import ScrollSection from "components/templates/ScrollSection/ScrollSection"

export const metadata = {
  title: "My Gallery",
  description: "A gallery of some of my paintings",
  locale: "en-US",
  type: "website",
}

export default async function Home() {
  return (
    <Main>
      <ScrollSection />
    </Main>
  )
}
