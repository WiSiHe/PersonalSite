import clsx from "clsx"
import { m } from "framer-motion"
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
    <section className="relative hidden p-10 xl:block">
      test section
      <div className="relative grid grid-cols-12 grid-rows-5 gap-1 ring">
        {[...Array(5)].map((_, i) => {
          return (
            <m.div
              initial={{ opacity: 0, x: 0, y: 0, scale: 0.1 }}
              whileInView={{
                scale: getRandomArbitrary(0.8, 0.98),
                opacity: 1,
                x: getRandomArbitrary(-100, 100),
                y: getRandomArbitrary(-100, 100),
              }}
              whileHover={{
                scale: 1.05,
                zIndex: 11,
                transition: { duration: 1, type: "spring" },
              }}
              transition={{ duration: 0.4, type: "spring" }}
              viewport={{ once: true, amount: 0.1 }}
              className={clsx(
                "relative flex items-center justify-center text-white bg-primary h-full w-full shadow-2xl",
                i === 0 && "row-start-2 col-start-10 col-end-13 row-end-3",
                i === 1 &&
                  "row-start-1 col-start-2 col-end-4 row-end-3 aspect-video",
                i === 2 &&
                  "row-start-4 col-start-1 col-end-3 row-end-5 aspect-video",
                i === 3 &&
                  "row-start-4 col-start-7 col-end-12 row-end-6 z-10 aspect-video",
                i === 4 &&
                  "row-start-2 col-start-5 col-end-9 row-end-5 aspect-square"
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
