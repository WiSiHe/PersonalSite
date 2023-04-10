import Main from "components/atoms/Main/Main"
import HeroSectionDesktop from "components/organisms/HeroSectionDesktop/HeroSectionDesktop"
import HeroSectionMobile from "components/organisms/HeroSectionMobile/HeroSectionMobile"
import ScrollSection from "components/organisms/ScrollSection/ScrollSection"
import { iSanityPainting } from "lib/models/objects/sanityPainting"

interface iAboutPage {
  wallpapers: iSanityPainting[]
}

const AboutPage = ({ wallpapers = [] }: iAboutPage) => {
  return (
    <Main noTopPadding className="flex-col overflow-clip">
      {/* <HeroSectionMobile paintings={wallpapers} />
      <HeroSectionDesktop paintings={wallpapers} /> */}

      <section
        className="relative w-full max-w-screen-xl px-4 py-10 mx-auto xl:hidden"
        id="main"
      >
        <h1>
          <strong>
            Hi there!
            <br /> My name is <span className="text-primary">He</span>
            nrik <span className="text-primary">Wi</span>
            lhelm <span className="text-primary">Si</span>ssener
          </strong>
        </h1>
        <div className="pt-2 xl:max-w-md">
          <p>
            I&#39;m a digital artist and web developer who enjoys character
            design and landscape painting. In my free time, I create digital art
            and explore programming, game development, and frontend
            technologies.
          </p>
        </div>
      </section>
      <ScrollSection />
    </Main>
  )
}

export default AboutPage
