"use client"
import LinkButton from "components/atoms/LinkButton/LinkButton"
import { motion } from "framer-motion"
import dynamic from "next/dynamic"
import Link from "next/link"

import { iSanityPainting } from "@/lib/models/objects/sanityPainting"

const CarouselStatic = dynamic(
    () => import("@/components/molecules/CarouselStatic"),
)

type PaintingSection = {
    paintings?: iSanityPainting[]
    description?: string
}

const PaintingSection = ({ paintings = [], description }: PaintingSection) => {
    const descriptionText =
        description ||
        "As a Digital Artist, my passion leans towards creating stylized portraits, ethereal landscapes, and artwork that transports you into the cosmos. I also occasionally taking up commissioned work."
    return (
        <>
            <section className="relative w-full text-white py-14 xl:py-24">
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, amount: "some" }}
                    transition={{ type: "spring" }}
                    className="relative w-full px-4 text-dark"
                >
                    <h2 className="pb-2">Paintings</h2>
                    <p className="max-w-2xl">
                        {descriptionText}
                        <Link href="/paintings" className="underline">
                            Check out my gallery
                        </Link>
                    </p>
                </motion.div>
                <CarouselStatic paintings={paintings} />
                <div className="flex flex-col items-center justify-center w-full gap-4 px-4 text-dark">
                    <strong>Like what you see?</strong>
                    <LinkButton href="/paintings" hasIcon>
                        More paintings
                    </LinkButton>
                </div>
            </section>
        </>
    )
}

export default PaintingSection
