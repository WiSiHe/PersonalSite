import clsx from "clsx"
import { m } from "framer-motion"
import useWindowDimensions from "hooks/useWindowDimension"
import Image from "next/image"
import night from "public/images/night-forest.jpeg"
import { getRandomArbitrary } from "utils/numbers"

// .div1 { grid-area: 2 / 10 / 4 / 12; }
// .div2 { grid-area: 1 / 3 / 3 / 5; }
// .div3 { grid-area: 4 / 1 / 5 / 3; }
// .div4 { grid-area: 4 / 8 / 6 / 10; }
// .div5 { grid-area: 2 / 5 / 5 / 9; }

// grid-row-start / grid-col-start / grid-row-end / grid-col-end

const ImageExplotionSection = () => {
  return (
    <section className="relative grid grid-cols-2 gap-4 p-10 xl:block">
      <div className="max-w-screen-xl mx-auto col-span-full ">
        <h2>Paintings!</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam</p>
      </div>
      <div className="relative hidden grid-cols-12 grid-rows-5 gap-1 xl:grid">
        {[...Array(5)].map((_, i) => {
          return (
            <m.div
              // initial={{ opacity: 0, x: 0, y: 0, scale: 0.1 }}
              whileInView={{
                scale: getRandomArbitrary(0.8, 0.98),
                opacity: 1,
                x: getRandomArbitrary(-100, 100),
                y: getRandomArbitrary(-100, 100),
                transition: {
                  duration: 1,
                  type: "spring",
                },
              }}
              whileHover={{
                scale: 1.02,
                transition: {
                  duration: 1,
                  type: "spring",
                },
              }}
              transition={{ duration: 0.4, type: "spring" }}
              // viewport={{ once: true, amount: 0.1 }}
              className={clsx(
                "relative flex items-center justify-center text-white bg-primary h-full w-full shadow-2xl",
                i === 0 &&
                  "xl:row-start-2 col-span-full xl:col-start-10 xl:col-end-13 xl:row-end-3",
                i === 1 &&
                  "xl:row-start-1 col-span-full xl:col-start-2 xl:col-end-4 xl:row-end-3 aspect-video",
                i === 2 &&
                  "xl:row-start-4 col-span-full xl:col-start-1 xl:col-end-3 xl:row-end-5 aspect-video",
                i === 3 &&
                  "xl:row-start-4 col-span-full xl:col-start-7 xl:col-end-12 xl:row-end-6 xl:z-10 aspect-video",
                i === 4 &&
                  "xl:row-start-2 col-span-full xl:col-start-5 xl:col-end-9 xl:row-end-5 aspect-square"
              )}
              key={i}
            >
              <Image
                src={night}
                fill
                alt="Dark magical woods made in 3D"
                className="object-cover w-full h-full"
                sizes="(max-width: 768px) 100vw,
(max-width: 1200px) 50vw,
33vw"
              />
              <div className="z-10">{i}</div>
            </m.div>
          )
        })}
      </div>
      <div className="relative col-span-full xl:hidden aspect-video">
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
    </section>
  )
}

{
  /* <m.div
className="relative row-start-2 row-end-4 ring bg-tertiary"

// initial={{ opacity: 0, x: -200 }}
// whileInView={{ opacity: 1, x: 0 }}
// viewport={{ once: false, amount: 0.2 }}
// transition={{ duration: 0.2, type: "spring" }}
// key={1}
>
<Image
  src={night}
  fill
  alt="Dark magical woods made in 3D"
  className="object-cover w-full h-full "
  sizes="(max-width: 768px) 100vw,
(max-width: 1200px) 50vw,
33vw"
/>
</m.div> */
}

export default ImageExplotionSection
