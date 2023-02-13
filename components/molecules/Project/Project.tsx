import { PortableText } from "@portabletext/react"
import clsx from "clsx"
import { Chip } from "components/atoms"
import { m } from "framer-motion"
import useWindowDimensions from "hooks/useWindowDimension"
import { iSanityProject } from "lib/models/objects/sanityProject"
import { imageBuilder } from "lib/sanity"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { FaArrowRight } from "react-icons/fa"

const cardVariants = {
  offscreen: {
    y: 150,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 1,
    },
  },
}

// extend the SanityImage type with a url property

interface iProjectProps extends iSanityProject {
  imageLeft?: boolean
}

const Project = ({
  image,
  tags = [],
  description = "",
  title = "",
  // imageLeft = false,
  slug,
  // content,
  status,
}: iProjectProps) => {
  const { width = 0 } = useWindowDimensions()

  const isMobile = width < 765

  return (
    <m.article
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.05 }}
      variants={cardVariants}
      className={clsx(
        "relative w-full grid bg-white shadow-xl grid-cols-3 aspect-square xl:aspect-video "
      )}
    >
      {/* <div
        className={clsx(
          "relative bg-primary aspect-square w-full h-full col-span-full xl:col-span-1",
          imageLeft ? "order-1 xl:order-1" : "order-1 xl:order-2"
        )}
      >
        <Image
          src={imageBuilder(image).width(600).height(600).quality(45).url()}
          alt={title}
          className={clsx("object-cover w-full h-full")}
          fill
        />
      </div> */}

      <Image
        src={imageBuilder(image)
          .width(isMobile ? 400 : 1280)
          .height(isMobile ? 400 : 720)
          .quality(65)
          .url()}
        alt={title}
        className={clsx("object-cover w-full h-full")}
        fill
      />

      <div
        className={clsx(
          "p-6 col-span-full z-10 bg-dark/40 text-white flex flex-col justify-between"
        )}
      >
        <div className="w-full xl:max-w-xl">
          <h2 className="text-2xl xl:text-4xl">
            <strong>{title}</strong>
          </h2>
          <ul className="flex flex-wrap gap-2 py-2 text-sm xl:text-base">
            {tags.map((tag, i) => {
              return (
                <li key={tag.name + i} className="px-1 bg-primary">
                  {tag.name}
                </li>
              )
            })}
          </ul>
          <strong>
            Status: <span className="">{status}</span>
          </strong>

          {description && <div className="text-sm">{description}</div>}
          {/* <PortableText value={content} /> */}
        </div>

        <div className="flex items-center justify-end ">
          <Link
            href={`/project/${slug.current}`}
            className="flex items-center gap-1 px-2 whitespace-nowrap text-dark bg-highlight"
          >
            <strong>See Details</strong> <FaArrowRight />
          </Link>
        </div>
      </div>
    </m.article>
  )
}

export default Project
