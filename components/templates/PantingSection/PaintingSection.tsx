"use client"
import LinkButton from "components/atoms/LinkButton/LinkButton"
import CarouselStatic from "components/molecules/CarouselStatic"
import { motion } from "framer-motion"
import Link from "next/link"

const PaintingSection = () => {
  return (
    <>
      <section className="relative w-full text-white py-14 xl:py-24">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="relative w-full px-4 text-dark "
        >
          <h2 className="pb-2">Paintings</h2>
          <p className="max-w-2xl">
            As a Digital Artist, my passion leans towards creating stylized
            portraits, ethereal landscapes, and artwork that transports you into
            the cosmos. I also occasionally taking up commissioned work.{" "}
            <Link href="/paintings" className="underline">
              Check out my gallery
            </Link>
          </p>
        </motion.div>
        <CarouselStatic />
        <div className="flex flex-col items-center justify-center w-full gap-4 px-4 text-dark">
          <strong>Like what you see?</strong>
          <LinkButton href="/paintings">More paintings</LinkButton>
        </div>
      </section>
    </>
  )
}

export default PaintingSection
