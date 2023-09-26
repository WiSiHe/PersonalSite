import Main from "components/atoms/Main/Main"
import AboutPage from "components/pages/AboutPage"

export const metadata = {
    title: "Home | WiSiHe",
    description: "A gallery of some of my paintings",
    locale: "en-US",
    type: "website",
}

export default async function Home() {
    return (
        <Main
            noTopPadding
            className="relative flex flex-col items-start w-full min-h-screen overflow-clip"
        >
            <AboutPage />
        </Main>
    )
}
