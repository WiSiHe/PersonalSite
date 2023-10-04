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
        <Main
            noTopPadding
            className="grid w-full min-h-[70dvh] grid-cols-12 mt-8"
        >
            <Chat />
        </Main>
    )
}
