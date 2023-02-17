import clsx from "clsx"
import { Loader, Main } from "components"
import { m, useMotionValueEvent, useTime, useTransform } from "framer-motion"
import { useEffect } from "react"

const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
    test: {
      scale: [1, 2, 2, 1, 1],
      rotate: [0, 0, 270, 270, 0],
      borderRadius: ["20%", "20%", "50%", "50%", "20%"],
      transition: {
        duration: 2,
        ease: "linear",
        times: [0, 0.2, 0.5, 0.8, 1],
        loop: Infinity,
        // repeatDelay: 1,
      },
    },
  },
}

const TestPage = () => {
  // const time = useTime()

  // useMotionValueEvent(time, "change", (latest) => {
  //   console.log("Time: ", latest)
  // })

  // const { timeDelta } = time
  // console.log("timeDelta", timeDelta)

  // const rotate = useTransform(
  //   time,
  //   [0, 5000], // For every 4 seconds...
  //   [0, 360], // ...rotate 360deg
  //   { clamp: false }
  // )

  // const scale = useTransform(
  //   time,
  //   [0, 4000], // For every 4 seconds...
  //   [0, 1]
  //   // { clamp: false, ease: "easeInOut" }
  // )

  // useEffect(() => {
  //   console.log("time", timeDelta)
  // }, [timeDelta])

  return (
    <>
      <Main noTopPadding>
        <section className="grid min-w-full min-h-screen text-white bg-white place-items-center">
          <m.div
            // style={{ rotate, scale }}
            className={clsx(
              "p-4 rounde bg-primary w-64 h-64 flex justify-center items-center"
            )}
            // initial={{ rotate: 0, scale: 0 }}
            // animate={{
            //   scale: [1, 2, 2, 1, 1],
            //   rotate: [0, 0, 270, 270, 0],
            //   borderRadius: ["20%", "20%", "50%", "50%", "20%"],
            //   transition: {
            //     duration: 2,
            //     ease: "linear",
            //     times: [0, 0.2, 0.5, 0.8, 1],
            //     loop: Infinity,
            //     // repeatDelay: 1,
            //   },
            // }}
            variants={container}

            // whileHover="onHover"
          >
            <strong>Hello world!</strong>
            {/* <svg viewBox="0 0 500 500" className="fill-primary">
              <path d="M405.5,323Q334,396,231,428.5Q128,461,97,355.5Q66,250,119.5,183.5Q173,117,266.5,88Q360,59,418.5,154.5Q477,250,405.5,323Z">
                <animate
                  attributeName="d"
                  dur="10s"
                  repeatCount="indefinite"
                  values="M405.5,323Q334,396,231,428.5Q128,461,97,355.5Q66,250,119.5,183.5Q173,117,266.5,88Q360,59,418.5,154.5Q477,250,405.5,323Z;
      M400.5,317.5Q328,385,231,418Q134,451,110,350.5Q86,250,116,159.5Q146,69,241,85Q336,101,404.5,175.5Q473,250,400.5,317.5Z;
      M428.5,355Q371,460,252.5,455.5Q134,451,100,350.5Q66,250,106,160Q146,70,241.5,85Q337,100,411.5,175Q486,250,428.5,355Z;
M377.5,327.5Q340,405,244,416Q148,427,115,338.5Q82,250,114.5,161Q147,72,255,63.5Q363,55,389,152.5Q415,250,377.5,327.5Z;                                                                                          M406,333Q346,416,240.5,432.5Q135,449,73.5,349.5Q12,250,87.5,174.5Q163,99,268.5,67Q374,35,420,142.5Q466,250,406,333Z;
      M405.5,323Q334,396,231,428.5Q128,461,97,355.5Q66,250,119.5,183.5Q173,117,266.5,88Q360,59,418.5,154.5Q477,250,405.5,323Z;"
                />
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  dur="20s"
                  repeatCount="indefinite"
                  from="0,250,250"
                  to="360,250,250"
                />
              </path>
            </svg> */}
          </m.div>
        </section>
      </Main>
    </>
  )
}

export default TestPage
