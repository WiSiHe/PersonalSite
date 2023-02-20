// import clsx from "clsx"
// import { Mask } from "components/atoms"
import {
  m,
  // useMotionValue,
  // useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion"
import Image from "next/image"
import Link from "next/link"
// import night from "public/images/night-forest.jpeg"
import woods from "public/images/woods.png"

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
      {/* <m.div
        style={{ scaleY }}
        className="fixed top-0 bottom-0 left-0 right-0 z-20 w-2 bg-primary"
      /> */}

      {/* dw */}

      {/* <section className="px-4 py-20 text-center xl:py-40">
        <h2>
          <strong>Still scrolling, huh?</strong>
        </h2>
        <p>
          I was kinda hoping that you would have clicked one of the links or
          buttons by now...
        </p>
      </section> */}

      {/* test */}

      {/* <ImageExplotionSection /> */}

      {/* test */}
      <section className="relative grid grid-cols-12 gap-4 p-4 xl:p-10 xl:aspect-video bg-dark overflow-clip">
        <div className="z-10 my-auto text-white xl:col-start-3 col-span-full xl:col-span-3 ">
          <h2>
            <strong>
              Fancy <span className="text-primary">animations!</span>
            </strong>
          </h2>
          <p className="drop-shadow">
            I enjoy playing around with 3D modeling and animation. The image on
            the{" "}
            <strong className="hidden text-xl underline text-primary xl:inline">
              right
            </strong>
            <strong className="inline underline xl:hidden text-primary">
              below
            </strong>{" "}
            is a quick creation I put together using Spline. In the past,
            I&#39;ve designed a variety of game assets including trees, rocks,
            and structures.
            <br />
            <br /> More information coming soon!
          </p>
        </div>
        <div className="xl:inset-0 xl:translate-x-72 col-span-full xl:absolute aspect-square xl:aspect-auto ">
          <iframe
            src="https://my.spline.design/untitled-1d78fd428f4d7531d03185f67d730969/"
            width="100%"
            height="100%"
            // className="absolute inset-0 w-full h-full "
          ></iframe>
        </div>
      </section>

      <m.section
        initial={{ opacity: 0 }}
        // animate={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        whileInView={{
          opacity: 1,
        }}
        transition={{ duration: 0.5 }}
        className="relative grid h-full grid-flow-col-dense aspect-square xl:aspect-video overflow-clip"
      >
        <Image
          src={woods}
          alt="Two boys in a dark forest"
          className="object-cover w-full h-full"
          style={{ clipPath: "url(#mask)" }}
          fill
          sizes="(max-width: 768px) 100vw,
      (max-width: 1200px) 50vw,
      33vw"
        />

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
      </m.section>

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
