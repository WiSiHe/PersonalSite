import Main from "components/atoms/Main/Main"
import Chat from "components/organisms/Chat"

export const metadata = {
    title: "My Gallery",
    description: "A gallery of some of my paintings",
    locale: "en-US",
    type: "website",
}

export default async function Home() {
    return (
        <Main noTopPadding className="min-h-[80vh]">
            <Chat />
        </Main>
    )
}
