// import clsx from "clsx"
// import { Mask } from "components/atoms"
import { GridStyleWrapper, LinkButton } from "components/atoms"
import {
  m,
  // useMotionValue,
  // useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion"
import Image from "next/image"
import explorer from "public/images/explorer.png"
import night from "public/images/night-forest.jpeg"

import ImageExplotionSection from "../ImageExplotionSection"

// import ImageExplotionSection from "../ImageExplotionSection"

const ScrollSection = () => {
  const { scrollYProgress } = useScroll()

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <>
      <svg
        width="25"
        height="25"
        viewBox="0 0 242 242"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="fixed z-10 top-4 right-4 stroke-primary"
      >
        <m.circle
          cx="121"
          cy="121"
          r="111"
          pathLength={1}
          strokeWidth="20"
          style={{ pathLength: scaleY }}
        />
      </svg>

      <section className="relative xl:aspect-video bg-dark">
        <GridStyleWrapper>
          <div className="sticky top-0 z-20 grid grid-cols-12 p-4 text-white xl:p-10">
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
            <div className="col-start-1 col-span-full xl:sticky xl:col-span-4">
              <m.h2
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
              </m.h2>
              <m.div
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
                  A collection of my paintings, some old, some new. I&#39;m
                  trying out new styles and techniques all the time, but
                  I&#39;ll always have a soft spot for the portraits and
                  landscapes.
                </p>

                <LinkButton href="/paintings">Paintings</LinkButton>
              </m.div>
            </div>
          </div>

          <ImageExplotionSection />
        </GridStyleWrapper>
      </section>

      <section className="px-4 py-20 text-center xl:py-40">
        <m.h2
          initial={{
            opacity: 0,
            scale: 0,
          }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <strong>Still scrolling, huh?</strong>
        </m.h2>
        <p>
          I was kinda hoping that you would have clicked one of the links or
          buttons by now...
        </p>

        <div className="flex justify-center gap-4 pt-4">
          <LinkButton href="/paintings">
            <strong>Paintings</strong>
          </LinkButton>
          <LinkButton href="/3d">
            <strong>3D</strong>
          </LinkButton>
          <LinkButton href="/code">
            <strong>Code</strong>
          </LinkButton>
        </div>
      </section>

      <section className="relative p-4 xl:p-10 bg-dark overflow-clip">
        <div className="grid h-full max-w-screen-xl grid-cols-12 gap-4 mx-auto my-auto items xl:aspect-video">
          <div className="xl:inset-0 xl:-translate-x-72 col-span-full xl:absolute aspect-square xl:aspect-auto ">
            <iframe
              src="https://my.spline.design/untitled-1d78fd428f4d7531d03185f67d730969/"
              width="100%"
              height="100%"
            />
          </div>
          <div className="z-10 p-4 my-auto text-white col-span-full xl:col-start-8 xl:col-span-6">
            <m.h2
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
            </m.h2>
            <m.div
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
                <strong className="inline xl:hidden text-primary">above</strong>{" "}
                is a quick creation I put together using Spline. In the past,
                I&#39;ve designed a variety of game assets including trees,
                rocks, and structures.
                <br />
                <br /> More information coming soon!
              </p>
            </m.div>
          </div>
        </div>
      </section>

      <section className="relative grid h-full grid-flow-col-dense aspect-square xl:aspect-video overflow-clip">
        <m.div
          initial={{ opacity: 0, x: -200 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          className="relative"
        >
          <Image
            src={explorer}
            alt="Female explorer"
            className="object-cover w-full h-full"
            fill
            sizes="(max-width: 768px) 100vw,
      (max-width: 1200px) 50vw,
      33vw"
          />
        </m.div>

        <div className="absolute inset-0 flex flex-col items-center p-4 mx-auto my-auto text-center text-dark h-fit w-fit">
          <div className="text-xs">
            <h2>
              <strong>Still not convinced?</strong>
            </h2>
            <div className="pb-4">Come on, just a little peak, I dare you!</div>
          </div>
          <div className="flex justify-center pt-4">
            <LinkButton href="/paintings">
              <strong>Paintings</strong>
            </LinkButton>
          </div>
        </div>
      </section>

      {/* <section className="flex flex-col items-center justify-center gap-4 px-4 py-10 text-center overflow-clip ">
        <div className="">
          <h2>You win!</h2>
          <b>Here, have a picture of a cute dog</b>
        </div>

        <m.div
          initial={{ opacity: 0, y: 400 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.05 }}
          transition={{ duration: 0.2, type: "spring" }}
          className="relative aspect-square w-96"
        >
          <Image
            src="https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=962&q=80"
            fill
            alt="cute dog"
            className="object-cover w-full h-full"
            sizes="(max-width: 768px) 100vw,
      (max-width: 1200px) 50vw,
      33vw"
          />
        </m.div>
      </section> */}
    </>
  )
}

export default ScrollSection
