import Main from "components/atoms/Main/Main"
import ContactPage from "components/pages/ContactPage"

export const metadata = {
    title: "Contact | WiSiHe",
    description: "Contact me",
    locale: "en-US",
    type: "website",
    url: "https://wisihe.no/contact",
}

export default async function AppContactPage() {
    return (
        <>
            <Main className="grid items-start min-h-screen grid-cols-12 gap-4 p-4">
                <ContactPage />
            </Main>
        </>
    )
}
