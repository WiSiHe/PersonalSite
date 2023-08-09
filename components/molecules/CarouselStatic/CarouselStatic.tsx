import Image from "next/image"
import night from "public/images/night-forest.jpeg"
import bath from "public/images/paintings/bathtub.jpg"
import celestial from "public/images/paintings/Celestial.jpg"
import creepy from "public/images/paintings/creepy.jpg"
import darkSouls from "public/images/paintings/darksouls.jpg"
import hell from "public/images/paintings/hell.jpg"
import space from "public/images/paintings/Space.jpg"
import sundays from "public/images/paintings/sundays.jpg"
import sunlight from "public/images/paintings/sunlight.jpg"
import winter from "public/images/paintings/winter.jpg"

const Paintings = [
  {
    id: 1,
    name: "Celestial",
    image: celestial,
    description: "Celesital",
  },
  {
    id: 2,
    name: "Sundays",
    image: sundays,
    description: "Sundays",
  },
  {
    id: 3,
    name: "Bathtub",
    image: bath,
    description: "Bathtub",
  },
  {
    id: 4,
    name: "Night",
    image: night,
    description: "Night",
  },
  {
    id: 5,
    name: "Space",
    image: space,
    description: "Space",
  },
  {
    id: 6,
    name: "Hell",
    image: hell,
    description: "Hell",
  },
  {
    id: 7,
    name: "Creepy",
    image: creepy,
    description: "Creepy",
  },
  {
    id: 8,
    name: "Sunlight",
    image: sunlight,
    description: "Sunlight",
  },
  {
    id: 9,
    name: "Winter",
    image: winter,
    description: "Winter",
  },
  {
    id: 10,
    name: "Dark Souls",
    image: darkSouls,
    description: "Dark Souls",
  },
]

const CarouselStatic = () => {
  return (
    <div className="relative col-span-full">
      <section className="relative flex gap-4 pl-4 pr-24 overflow-y-scroll snap-x">
        {Paintings.sort(() => 0.5 - Math.random()).map((painting) => (
          <Image
            key={painting.id}
            src={painting.image}
            placeholder="blur"
            alt={painting.description}
            quality={75}
            className="object-cover w-full h-full aspect-video lg:aspect-portrait rounded-xl snap-start drop-shadow-xl"
            sizes="(max-width: 768px) 100vw,
  (max-width: 1200px) 50vw,
  33vw"
          />
        ))}
      </section>
      {/* <div className="absolute top-0 bottom-0 right-0 w-28 bg-gradient-to-l from-tertiary via-tertiary" /> */}
    </div>
  )
}

export default CarouselStatic
