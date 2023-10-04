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
            className="grid w-full h-[80dvh] grid-cols-12 gap-4 p-4"
        >
            <Chat />
        </Main>
    )
}
