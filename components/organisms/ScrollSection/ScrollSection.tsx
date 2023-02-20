// import clsx from "clsx"
// import { Mask } from "components/atoms"
import { GridStyleWrapper } from "components/atoms"
import {
  m,
  // useMotionValue,
  // useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import explorer from "public/images/explorer.png"

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
          stroke-width="20"
          style={{ pathLength: scaleY }}
        />
      </svg>

      <section className="relative text-white xl:aspect-video bg-dark">
        <GridStyleWrapper>
          <ImageExplotionSection />
        </GridStyleWrapper>
      </section>

      <section className="px-4 py-20 text-center xl:py-40">
        <h2>
          <strong>Still scrolling, huh?</strong>
        </h2>
        <p>
          I was kinda hoping that you would have clicked one of the links or
          buttons by now...
        </p>
      </section>

      <section className="relative p-4 xl:p-10 bg-dark overflow-clip">
        <div className="grid h-full max-w-screen-xl grid-cols-12 gap-4 mx-auto my-auto items xl:aspect-video">
          <div className="z-10 p-4 my-auto text-white col-span-full xl:col-span-6">
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
                I enjoy playing around with 3D modeling and animation. The image
                on the{" "}
                <strong className="hidden text-xl underline text-primary xl:inline">
                  right
                </strong>
                <strong className="inline underline xl:hidden text-primary">
                  below
                </strong>{" "}
                is a quick creation I put together using Spline. In the past,
                I&#39;ve designed a variety of game assets including trees,
                rocks, and structures.
                <br />
                <br /> More information coming soon!
              </p>
            </m.div>
          </div>
          <div className="xl:inset-0 xl:translate-x-72 col-span-full xl:absolute aspect-square xl:aspect-auto ">
            <iframe
              src="https://my.spline.design/untitled-1d78fd428f4d7531d03185f67d730969/"
              width="100%"
              height="100%"
              // className="absolute inset-0 w-full h-full "
            ></iframe>
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

        <div className="absolute inset-0 flex flex-col items-center p-4 mx-auto my-auto text-center text-white h-fit w-fit">
          <div className="text-xs">
            <h2>
              <strong>Still not convinced?</strong>
            </h2>
            <div className="pb-4">Come on, just a little peak, I dare you!</div>
          </div>
          <Link
            href="/paintings"
            className="relative py-2 text-sm text-center text-white transition bg-primary px-7 hover:ring focus:outline-none focus:ring-highlight focus:ring-2 focus:border-transparent"
          >
            <b>Go to gallery</b>
          </Link>
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
