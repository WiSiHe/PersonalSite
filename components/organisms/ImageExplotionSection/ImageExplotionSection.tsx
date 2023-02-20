import clsx from "clsx"
import { m } from "framer-motion"
import Image from "next/image"
import night from "public/images/night-forest.jpeg"
import bathtub from "public/images/paintings/bathtub.jpg"
import celestial from "public/images/paintings/Celestial.jpg"
import creepy from "public/images/paintings/creepy.jpg"
import cute from "public/images/paintings/cute.jpg"
import darksouls from "public/images/paintings/darksouls.jpg"
import morningWoods from "public/images/paintings/forestMorning.jpg"
import hell from "public/images/paintings/hell.jpg"
import space from "public/images/paintings/Space.jpg"
import sunday from "public/images/paintings/sundays.jpg"
import sunlight from "public/images/paintings/sunlight.jpg"
import winter from "public/images/paintings/winter.jpg"
import portrait from "public/images/selfPortrait.png"
import { getRandomArbitrary } from "utils/numbers"

const images = [
  {
    image: celestial,
    alt: "Kid vitnesing a celestial creature",
    format: "aspect-video",
  },
  { image: portrait, alt: "Self portrait", format: "aspect-square" },
  {
    image: bathtub,
    alt: "painting of woman in bathtub",
    format: "aspect-square",
  },
  { image: hell, alt: "Two boys lost in dark woods", format: "aspect-video" },
  {
    image: morningWoods,
    alt: "Morning woods in the mountains",
    format: "aspect-video",
  },
  {
    image: space,
    alt: "woman in space",
    format: "aspect-video",
  },
  {
    image: sunday,
    alt: "painting of a lazy sundays",
    format: "aspect-video",
  },
  {
    image: creepy,
    alt: "creepy painting",
    format: "aspect-video",
  },
  {
    image: darksouls,
    alt: "darksouls painting",
    format: "aspect-video",
  },
  {
    image: sunlight,
    alt: "woman with sunlight",
    format: "aspect-video",
  },
  {
    image: winter,
    alt: "painting of a snowy tundra",
    format: "aspect-video",
  },
  {
    image: cute,
    alt: "cute painting",
    format: "aspect-video",
  },
]

const ImageExplotionSection = () => {
  const randomlySortedImages = images.sort(() => Math.random() - 0.5)

  return (
    <section className="relative grid grid-cols-2 gap-4 p-10 xl:block">
      <div className="z-20 max-w-screen-xl mx-auto col-span-full ">
        <m.h2
          className="text-primary"
          initial={{
            opacity: 0,
            scale: 0,
          }}
          whileInView={{ opacity: 1, scale: 1 }}
        >
          Paintings!
        </m.h2>
        <m.div
          className="max-w-lg pt-2"
          initial={{ opacity: 0, x: 0, y: 0, scale: 0.1 }}
          whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          transition={{ duration: 0.4, type: "spring" }}
        >
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            voluptas, quod, quia, voluptates quae voluptatibus quibusdam
            voluptatum quidem quos quas nesciunt.
          </p>
        </m.div>
      </div>
      <div className="relative hidden grid-flow-row-dense grid-cols-12 grid-rows-5 gap-1 pt-4 xl:grid">
        {[...Array(5)].map((_, i) => {
          const randomXValue = getRandomArbitrary(-50, 50)
          const randomYValue = getRandomArbitrary(-50, 50)
          const randomScaleValue = getRandomArbitrary(0.8, 0.94)

          const currentImage = randomlySortedImages[i].image
          const currentAlt = randomlySortedImages[i].alt

          return (
            <m.div
              initial={{ opacity: 0, x: 0, y: 0, scale: 0.1, zIndex: 0 }}
              whileInView={{
                scale: randomScaleValue,
                opacity: 1,
                zIndex: 10,
                x: randomXValue,
                y: randomYValue,
                transition: {
                  duration: 1,
                  type: "spring",
                },
              }}
              whileHover={{
                scale: randomScaleValue + 0.1,
                z: 10,
                transition: {
                  duration: 1,

                  type: "spring",
                },
              }}
              transition={{ duration: 0.4, type: "spring" }}
              className={clsx(
                "aspect-video",
                "relative flex items-center justify-center text-white bg-primary h-full w-full shadow-2xl",
                i === 0 &&
                  "xl:row-start-1 col-span-full xl:col-start-10 xl:col-end-13 xl:row-end-3",
                i === 1 &&
                  "xl:row-start-1 col-span-full xl:col-start-2 xl:col-end-5 xl:row-end-3",
                i === 2 &&
                  "xl:row-start-4 col-span-full xl:col-start-1 xl:col-end-3 xl:row-end-5",
                i === 3 &&
                  "xl:row-start-4 col-span-full xl:col-start-7 xl:col-end-12 xl:row-end-6 z-[11]",
                i === 4 &&
                  "xl:row-start-2 col-span-full xl:col-start-5 xl:col-end-9 xl:row-end-5"
              )}
              key={i}
            >
              <Image
                src={currentImage}
                fill
                alt={currentAlt}
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
