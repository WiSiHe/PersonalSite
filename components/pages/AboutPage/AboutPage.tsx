"use client"
import GridStyleWrapper from "components/atoms/GridStyleWrapper/GridStyleWrapper"
import Main from "components/atoms/Main/Main"
import HeroSectionDesktop from "components/templates/HeroSectionDesktop/HeroSectionDesktop"
import HeroSectionMobile from "components/templates/HeroSectionMobile/HeroSectionMobile"
import ScrollSection from "components/templates/ScrollSection/ScrollSection"
import { iSanityWallpaperPaintings } from "lib/models/objects/sanityPainting"

import { motion } from "framer-motion"
import ImageExplotionSection from "components/templates/ImageExplotionSection/ImageExplotionSection"
import Image from "next/image"

import explorer from "public/images/explorer.png"
import night from "public/images/night-forest.jpeg"
import LinkButton from "components/atoms/LinkButton/LinkButton"

interface iAboutPage {
  wallpapers: iSanityWallpaperPaintings[]
}

const AboutPage = ({ wallpapers = [] }: iAboutPage) => {
  return (
    <Main className="flex-col min-h-screen whitespace-pre-wrap">
      {/* <HeroSectionMobile paintings={wallpapers} />
      <HeroSectionDesktop paintings={wallpapers} /> */}

      <section className="p-4">
        <h1>About me</h1>
        <p>
          Welcome to my world. My name is Henrik Wilhelm Sissener, a digital
          artist, game enthusiast, and web developer, all wrapped into one. Born
          and raised in the scenic landscapes of Norway, I am fortunate enough
          to live in a country that provides daily inspiration for my artistic
          endeavors.
        </p>
      </section>

      <section className="relative xl:aspect-video bg-dark">
        <GridStyleWrapper>
          <div className="sticky top-0 z-20 grid grid-cols-12 px-4 py-10 text-white xl:px-10">
            <div className="relative mt-4 col-span-full xl:hidden aspect-video">
              <Image
                src={night}
                fill
                alt="Dark magical woods made in 3D"
                className="object-cover w-full h-full"
                sizes="(max-width: 768px) 100vw,
(max-width: 1200px) 50vw,
33vw"
              />
            </div>
            <div className="col-start-1 gap-4 pt-4 col-span-full xl:sticky xl:col-span-4">
              <motion.h2
                initial={{
                  opacity: 0,
                  scale: 0,
                }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="pb-2"
              >
                <strong>Paintings!</strong>
              </motion.h2>
              <motion.div
                initial={{
                  opacity: 0,
                  y: 50,
                }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-4 xl:max-w-lg"
              >
                <p>
                  As a Digital Artist, my passion leans towards creating
                  stylized portraits, ethereal landscapes, and artwork that
                  transports you into the cosmos. My unique style has allowed me
                  to venture into the realm of game concept art, and I&#39;ve
                  been privileged to bring many ideas to life, occasionally
                  taking up commissioned work.
                </p>

                <LinkButton href="/paintings">Paintings</LinkButton>
              </motion.div>
            </div>
          </div>

          <ImageExplotionSection />
        </GridStyleWrapper>
      </section>

      <section className="p-4">
        <p>
          But it doesn&#39;t stop there. I am an ardent hobbyist in Game
          Development, where I blend my artistic vision with technical
          expertise. Crafting stylized 3D games using Unreal Engine and Unity, I
          strive to provide immersive experiences that evoke emotion and provoke
          thought.
        </p>
      </section>

      <section className="p-4">
        <p>
          When I&#39;m not navigating the vastness of space or immersing myself
          in digital landscapes, I work as a Frontend Developer. With a keen eye
          for design and user experience, I build and optimize websites for
          various clients, taking pride in delivering sites that not only look
          good but also function seamlessly.
        </p>
      </section>

      <section className="relative p-4 bg-dark overflow-clip">
        <GridStyleWrapper>
          <div className="grid h-full max-w-screen-xl grid-cols-12 gap-4 mx-auto my-auto items xl:aspect-video">
            <div className="xl:inset-0 xl:-translate-x-72 col-span-full xl:absolute aspect-square xl:aspect-auto ">
              <iframe
                src="https://my.spline.design/untitled-1d78fd428f4d7531d03185f67d730969/"
                width="100%"
                height="100%"
              />
            </div>
            <div className="z-10 p-4 my-auto text-white col-span-full xl:col-start-8 xl:col-span-6">
              <motion.h2
                initial={{
                  opacity: 0,
                  scale: 0,
                }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <strong>
                  Fancy <span className="text-primary">animations!</span>
                </strong>
              </motion.h2>
              <motion.div
                initial={{
                  opacity: 0,
                  y: 50,
                }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <p className="drop-shadow">
                  I enjoy playing around with 3D modeling and animation. The
                  object{" "}
                  <strong className="hidden text-xl text-primary xl:inline">
                    on the left
                  </strong>
                  <strong className="inline xl:hidden text-primary">
                    above
                  </strong>{" "}
                  is a quick creation I put together using Spline. In the past,
                  I&#39;ve designed a variety of game assets including trees,
                  rocks, and structures.
                  <br />
                  <br /> More information coming soon!
                </p>
              </motion.div>
            </div>
          </div>
        </GridStyleWrapper>
      </section>
      <section className="p-4">
        <p>
          Whether it&#39;s through my digital art, game designs, or web
          development, I am constantly driven by the endless possibilities for
          creation and innovation. I enjoy the process of taking an idea,
          however big or small, and transforming it into something tangible that
          can be shared and enjoyed by others.
        </p>
      </section>
      <section className="p-4">
        <p>
          Feel free to navigate through my portfolio to catch a glimpse of my
          work. Whether you&#39;re interested in a commissioned piece, need a
          website developed, or simply want to discuss art, technology, or
          gaming, don&#39;t hesitate to get in touch. I&#39;m excited to share
          my passion and creativity with you!
        </p>
      </section>
    </Main>
  )
}

export default AboutPage
