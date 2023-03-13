import clsx from "clsx"
import { LinkButton } from "components/atoms"
import { m } from "framer-motion"
import Image from "next/image"
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

const styles1 = [
  "row-start-1 col-start-10 col-end-13 row-end-3",
  "row-start-1 col-start-2 col-end-5 row-end-3",
  "row-start-4 col-start-1 col-end-3 row-end-5",
  "row-start-4 col-start-7 col-end-12 row-end-6",
  "row-start-2 col-start-5 col-end-9 row-end-5",
]

// .div1 { grid-area: 2 / 2 / 4 / 4; }
// .div2 { grid-area: 5 / 3 / 7 / 5; }
// .div3 { grid-area: 3 / 6 / 6 / 9; }
// .div4 { grid-area: 1 / 8 / 4 / 10; }
// .div5 { grid-area: 5 / 10 / 7 / 13; }

// const styles2 = [
//   "row-start-2 row-end-4 col-start-2 col-end-4",
//   "row-start-5 row-end-7 col-start-3 col-end-5",
//   "row-start-3 row-end-6 col-start-6 col-end-9",
//   "row-start-1 row-end-4 col-start-8 col-end-10",
//   "row-start-5 row-end-7 col-start-10 col-end-13",
// ]

const ImageExplotionSection = () => {
  const randomlySortedImages = images.sort(() => Math.random() - 0.5)
  const randomlySortedStyles = styles1.sort(() => Math.random() - 0.5)

  return (
    <section className="relative hidden grid-flow-row-dense grid-cols-12 grid-rows-5 gap-1 py-10 xl:grid">
      {[...Array(5)].map((_, i) => {
        const randomXValue = getRandomArbitrary(-50, 50)
        const randomYValue = getRandomArbitrary(-50, 50)
        const randomScaleValue = getRandomArbitrary(0.8, 0.94)

        const currentImage = randomlySortedImages[i].image
        const currentAlt = randomlySortedImages[i].alt

        const currentStyle = randomlySortedStyles[i]

        return (
          <m.div
            initial={{
              opacity: 0,
              x: randomXValue,
              y: randomYValue,
              scale: 0.1,
              zIndex: 0,
            }}
            whileInView={{
              scale: randomScaleValue,
              opacity: 1,
              zIndex: 10,
              x: 0,
              y: 0,
              transition: {
                duration: 1,
                type: "spring",
              },
            }}
            whileHover={{
              scale: randomScaleValue + 0.02,
              // boxShadow: "0px 0px 37px 8px rgba(255,255,255,0.32)",
              boxShadow: "0px 0px 37px 8px #DE0D92",
              z: 10,
              transition: {
                duration: 1,
                type: "spring",
              },
            }}
            transition={{ duration: 0.4, type: "spring" }}
            viewport={{ once: true }}
            className={clsx(
              "aspect-video",
              "relative flex items-center justify-center text-white bg-primary h-full w-full shadow-2xl",
              currentStyle
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
          </m.div>
        )
      })}
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
