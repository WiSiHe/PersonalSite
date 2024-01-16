import Main from "components/atoms/Main/Main"
import ScrollSection from "components/templates/ScrollSection/ScrollSection"
import Image from "next/image"

import { Marquee } from "@/components/molecules/Marquee"

const night = "/public/images/explorer.png"

export const metadata = {
    title: "My Gallery",
    description: "A gallery of some of my paintings",
    locale: "en-US",
    type: "website",
}

export default async function Home() {
    return (
        <Main noTopPadding className="flex-col">
            <ScrollSection />
        </Main>
    )
}
