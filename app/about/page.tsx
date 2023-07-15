import AboutPage from "components/pages/AboutPage"

export const metadata = {
  title: "About - WiSiHe",
  description: "About me",
  locale: "en-US",
  type: "website",
}

export default async function Home() {
  return <AboutPage />
}
