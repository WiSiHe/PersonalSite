import Main from "components/atoms/Main/Main"
import FunctionPage from "components/pages/FunctionPage"

export const metadata = {
    title: "My Gallery",
    description: "A gallery of some of my paintings",
    locale: "en-US",
    type: "website",
}

export default async function Home() {
    return (
        <Main noTopPadding className="flex-col p-4">
            <FunctionPage />
        </Main>
    )
}
