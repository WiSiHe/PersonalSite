"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import explorer from "public/images/explorer.png"

import LinkButton from "@/components/atoms/LinkButton/LinkButton"

const NotFoundSection = () => {
    return (
        <section className="relative grid w-full h-full grid-flow-col-dense aspect-square xl:aspect-video overflow-clip">
            <motion.div
                initial={{ opacity: 0, x: -200 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.5 }}
                whileInView={{
                    opacity: 1,
                    x: 0,
                }}
                className="relative"
            >
                <Image
                    src={explorer}
                    alt="Female explorer"
                    className="object-cover w-full h-full"
                    fill
                    sizes="(max-width: 768px) 100vw,
      (max-width: 1200px) 50vw,
      33vw"
                />
            </motion.div>

            <div className="absolute inset-0 flex flex-col items-center p-4 mx-auto my-auto text-center text-dark h-fit w-fit">
                <div className="text-xs">
                    <h2>
                        <strong>Still not convinced?</strong>
                    </h2>
                    <div className="pb-4">
                        Come on, just a little peak, I dare you!
                    </div>
                </div>
                <div className="flex justify-center pt-4">
                    <LinkButton href="/paintings">
                        <strong>Paintings</strong>
                    </LinkButton>
                </div>
            </div>
        </section>
    )
}

export default NotFoundSection
