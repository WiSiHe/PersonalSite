"use client"
import LinkButton from "components/atoms/LinkButton/LinkButton"
import Main from "components/atoms/Main/Main"
import GreeterCard from "components/molecules/GreeterCard"
import { motion } from "framer-motion"
import Image from "next/image"
import Script from "next/script"
import abstract from "public/images/abstract.jpg"
import night from "public/images/night-forest.jpeg"
import { cn } from "utils/utility"

const AboutPage = () => {
  return (
    <>
      <Script
        type="module"
        src="https://unpkg.com/@splinetool/viewer/build/spline-viewer.js"
      />
      <Main noTopPadding className="flex-col lg:min-h-screen ">
        <section
          className={cn(
            "relative grid grid-cols-12 overflow-clip gap-4 lg:gap-10 items-center p-4 min-h-[400px] h-[60vh] lg:h-screen"
          )}
        >
          <Image
            src={abstract}
            fill
            alt="Abstract painting"
            placeholder="blur"
            quality={10}
            className="object-cover scale-150"
          />
          <div
            dangerouslySetInnerHTML={{
              __html:
                '<spline-viewer url="https://prod.spline.design/NJPbTHKSakGvCHjI/scene.splinecode" events-target="global"></spline-viewer>',
            }}
            className="absolute inset-0 w-full h-full scale-150 bg-primary/40"
          />
          <section className="z-10 col-span-full md:col-span-6 ">
            <GreeterCard />
            <div className="flex flex-wrap justify-end gap-6 pt-6">
              <LinkButton href="/paintings">Paintings</LinkButton>
            </div>
          </section>
          <section className="relative hidden col-span-4 rounded-xl aspect-video overflow-clip">
            <Image
              src={night}
              fill
              alt="Dark magical woods made in 3D"
              className="object-cover"
            />
          </section>
        </section>

        <section className="relative xl:aspect-video">
          <div className="sticky top-0 z-20 grid grid-cols-12 px-4 py-10 text-dark xl:px-10">
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
                <strong>Paintings</strong>
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

          {/* <ImageExplotionSection /> */}
        </section>

        <section className="max-w-screen-lg p-4 mx-auto lg:min-h-screen">
          <h3>Game dev</h3>
          <p>
            But it doesn&#39;t stop there. I am an ardent hobbyist in Game
            Development, where I blend my artistic vision with technical
            expertise. Crafting stylized 3D games using Unreal Engine and Unity,
            I strive to provide immersive experiences that evoke emotion and
            provoke thought.
          </p>
        </section>

        <section className="max-w-screen-lg p-4 mx-auto lg:min-h-screen">
          <h3>Frontend</h3>
          <p>
            When I&#39;m not navigating the vastness of space or immersing
            myself in digital landscapes, I work as a Frontend Developer. With a
            keen eye for design and user experience, I build and optimize
            websites for various clients, taking pride in delivering sites that
            not only look good but also function seamlessly.
          </p>
        </section>

        <section className="relative p-4 bg-dark overflow-clip">
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
        </section>
        <section className="max-w-screen-lg p-4 mx-auto bg-blue-200 lg:min-h-screen">
          <p>
            Whether it&#39;s through my digital art, game designs, or web
            development, I am constantly driven by the endless possibilities for
            creation and innovation. I enjoy the process of taking an idea,
            however big or small, and transforming it into something tangible
            that can be shared and enjoyed by others.
          </p>
        </section>
        <section className="max-w-screen-lg p-4 mx-auto bg-red-300 lg:min-h-screen">
          <p>
            Feel free to navigate through my portfolio to catch a glimpse of my
            work. Whether you&#39;re interested in a commissioned piece, need a
            website developed, or simply want to discuss art, technology, or
            gaming, don&#39;t hesitate to get in touch. I&#39;m excited to share
            my passion and creativity with you!
          </p>
        </section>
      </Main>
    </>
  )
}

export default AboutPage
