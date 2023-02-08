import clsx from "clsx"
import Tag from "components/atoms/Tag"
import { motion } from "framer-motion"
import Image, { StaticImageData } from "next/image"
import PropTypes from "prop-types"
import React from "react"

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

interface ProjectProps {
  image?: string | StaticImageData
  tags?: string[]
  title?: string
  status?: string
  imageLeft?: boolean
  children?: React.ReactNode
  className?: string
}

const Project = ({
  image = "",
  tags = [],
  title = "",
  status = "",
  imageLeft = false,
  children,
  className = "",
}: ProjectProps) => {
  return (
    <motion.article
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.1 }}
      variants={cardVariants}
      className={clsx(
        "relative flex flex-col overflow-hidden bg-white shadow-xl xl:h-[512px]",
        className
      )}
    >
      <div
        className={clsx(
          "flex flex-col justify-between p-4",
          imageLeft ? "order-2 xl:order-2" : "order-2 xl:order-1"
        )}
      >
        <div>
          <h2 className="text-4xl">
            <strong>{title}</strong>
          </h2>
          <strong>
            Status: <span className="text-primary">{status}</span>
          </strong>
          <ul className="flex flex-wrap mt-2 mb-4 text-xs">
            {tags.map((tag) => {
              return (
                <li className="mb-2 mr-2 bg-primary text-white" key={tag}>
                  <Tag>{tag}</Tag>
                </li>
              )
            })}
          </ul>
          <div className="max-w-6xl">{children}</div>
        </div>
      </div>
      <div
        className={clsx(
          "relative  w-full h-full bg-primary aspect-square",
          imageLeft ? "order-1 xl:order-1" : "order-1 xl:order-2"
        )}
      >
        <Image
          src={image}
          alt="test"
          className="object-cover"
          fill
          // layout="fill"
        />
      </div>
    </motion.article>
  )
}

Project.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  className: PropTypes.string,
  image: PropTypes.object,
  imageLeft: PropTypes.bool,
  status: PropTypes.string,
  tags: PropTypes.array,
  title: PropTypes.string,
}

export default Project
