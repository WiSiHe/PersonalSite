import LinkButton from "components/atoms/LinkButton/LinkButton"
import CarouselStatic from "components/molecules/CarouselStatic"
import { motion } from "framer-motion"
import Link from "next/link"

const PaintingSection = () => {
  return (
    <>
      <section className="relative text-white pt-14 xl:pt-24">
        <div className="relative w-full px-4 text-dark xl:px-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", duration: 1.5 }}
          >
            <h2 className="pb-2">Paintings</h2>
            <p className="max-w-2xl">
              As a Digital Artist, my passion leans towards creating stylized
              portraits, ethereal landscapes, and artwork that transports you
              into the cosmos. I also occasionally taking up commissioned work.{" "}
              <Link href="/paintings" className="underline">
                Check out my gallery
              </Link>
            </p>
          </motion.div>
        </div>
      </section>

      <motion.div
        className="w-full pt-8 xl:pl-6"
        initial={{ opacity: 0, scale: 0.8, y: 100 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", duration: 1.5 }}
      >
        <CarouselStatic />
      </motion.div>

      <div className="flex flex-col items-center justify-center w-full gap-4 py-10">
        <strong>Like what you see?</strong>
        <LinkButton href="/paintings">More paintings</LinkButton>
      </div>
    </>
  )
}

export default PaintingSection
