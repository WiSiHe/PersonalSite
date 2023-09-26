import AboutPage from "components/pages/AboutPage"

export const metadata = {
    title: "About - WiSiHe",
    description: "About me",
    locale: "en-US",
    type: "website",
    url: "https://wisihe.no/about",
}

export default async function Home() {
    return <AboutPage />
}
