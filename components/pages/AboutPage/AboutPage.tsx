"use client"
import { iSanityImage } from "lib/models/objects/sanityImage"
import dynamic from "next/dynamic"

const PaintingSection = dynamic(
    () => import("components/templates/PantingSection"),
)

const HeroImageSection = dynamic(
    () => import("components/templates/HeroImageSection"),
)

interface AboutPageProps {
    paintings?: iSanityImage[]
}

const AboutPage = ({ paintings = [] }: AboutPageProps) => {
    return (
        <>
            <HeroImageSection />
            <PaintingSection />
            {/* <section className="flex flex-col items-center justify-center w-full min-h-screen gap-4 p-4 py-24 text-white bg-dark">
        <h2 className="pb-2">Frontend</h2>
        <p className="max-w-2xl">
          I also work as a Frontend Developer. With a keen eye for design and
          user experience, I build and optimize websites for various clients,
          taking pride in delivering sites that not only look good but also
          function seamlessly.
        </p>
      </section>

      <section className="flex flex-col items-center justify-center w-full min-h-screen p-4 py-24 ">
        <h2 className="pb-2">Game dev</h2>
        <p className="max-w-2xl">
          But it doesn&#39;t stop there. I am an ardent hobbyist in Game
          Development, where I blend my artistic vision with technical
          expertise. Crafting stylized 3D games using Unreal Engine and Unity, I
          strive to provide immersive experiences that evoke emotion and provoke
          thought.
        </p>
      </section>

      <section className="flex items-center justify-center w-full p-4 text-white bg-dark lg:min-h-screen">
        <div className="flex items-center justify-center h-full max-w-screen-lg mx-auto">
          <p>
            Whether it&#39;s through my digital art, game designs, or web
            development, I am constantly driven by the endless possibilities for
            creation and innovation. I enjoy the process of taking an idea,
            however big or small, and transforming it into something tangible
            that can be shared and enjoyed by others.
          </p>
        </div>
      </section>
      <section className="max-w-screen-lg p-4 mx-auto lg:min-h-screen">
        <p>
          Feel free to navigate through my portfolio to catch a glimpse of my
          work. Whether you&#39;re interested in a commissioned piece, need a
          website developed, or simply want to discuss art, technology, or
          gaming, don&#39;t hesitate to get in touch. I&#39;m excited to share
          my passion and creativity with you!
        </p>
        <LinkButton href="/contact">Contact me</LinkButton>
      </section> */}
        </>
    )
}

export default AboutPage
