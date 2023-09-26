import clsx from "clsx"
import { AnimatePresence, motion } from "framer-motion"
import { iSanityPaintingTag } from "lib/models/objects/SanityTag"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { BsFilter } from "react-icons/bs"
import { IoClose } from "react-icons/io5"

interface iFiltersProps {
    filteredTags: iSanityPaintingTag[]
    activeFilter: string
    amountOfPaintings?: number
}

const Filters = ({
    filteredTags = [],
    activeFilter = "",
    amountOfPaintings = 0,
}: iFiltersProps) => {
    const [active, setActive] = useState(false)

    useEffect(() => {
        setActive(false)
    }, [activeFilter])

    return (
        <>
            <div className="flex flex-wrap gap-2">
                <button
                    onClick={() => setActive((prev) => !prev)}
                    className={clsx(
                        "flex gap-1 items-center overflow-clip px-4 py-1 text-sm font-medium text-white bg-primary hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-highlight focus:outline-none",
                    )}
                >
                    {active && (
                        <motion.div
                            initial={{ x: -100 }}
                            animate={{ x: 0 }}
                            exit={{ x: -100 }}
                            transition={{
                                type: "spring",
                                delay: 0.2,
                                bounce: 0.4,
                            }}
                            className="flex items-center gap-1"
                        >
                            <strong>Close</strong>{" "}
                            <motion.div
                                initial={{ opacity: 0, rotate: 180 }}
                                animate={{ opacity: 1, rotate: 0 }}
                                transition={{
                                    type: "spring",
                                    delay: 0.2,
                                    bounce: 0.4,
                                }}
                            >
                                <IoClose />
                            </motion.div>
                        </motion.div>
                    )}
                    {!active && (
                        <motion.div
                            initial={{ x: 100 }}
                            animate={{ x: 0 }}
                            exit={{ x: 100 }}
                            transition={{
                                type: "spring",
                                delay: 0.2,
                                bounce: 0.4,
                            }}
                            className="flex items-center gap-1"
                        >
                            <strong>Filter</strong>{" "}
                            <motion.div
                                initial={{ opacity: 0, rotate: 180 }}
                                animate={{ opacity: 1, rotate: 0 }}
                                transition={{
                                    type: "spring",
                                    delay: 0.2,
                                    bounce: 0.4,
                                }}
                            >
                                <BsFilter />
                            </motion.div>
                        </motion.div>
                    )}
                </button>

                <div
                    className={clsx(
                        "relative snap-start uppercase transition py-2 pointer-events-none px-4 text-xs whitespace-nowrap hover:opacity-90 active:bg-highlight focus:outline-none focus:ring focus:ring-highlight",
                        "bg-dark hover:bg-dark text-white",
                    )}
                >
                    <motion.strong
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        {activeFilter}({amountOfPaintings})
                    </motion.strong>
                </div>
            </div>
            <AnimatePresence>
                {active && (
                    <motion.ul
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        transition={{ type: "spring" }}
                        className="absolute left-0 right-0 z-20 flex flex-wrap gap-4 px-2 py-4 shadow-xl xl:px-4 top-16 bg-bright backdrop-blur-lg "
                    >
                        {filteredTags.map((tag, i) => {
                            const { name = "", paintingsCount = 0 } = tag
                            const convertedLabel = name.toLowerCase()
                            const isBuyable = convertedLabel === "store"
                            const isActive =
                                convertedLabel ===
                                activeFilter.toLocaleLowerCase()
                            const url =
                                name === "All"
                                    ? "/paintings"
                                    : `/paintings/${convertedLabel}`
                            return (
                                <li key={i}>
                                    <Link
                                        href={url}
                                        className={clsx(
                                            "relative snap-start transition py-2 px-4 text-xs whitespace-nowrap hover:opacity-90 active:bg-highlight focus:outline-none focus:ring focus:ring-highlight",
                                            isBuyable && "ring ring-highlight",
                                            isActive
                                                ? "bg-highlight hover:bg-highlight text-dark"
                                                : "text-white bg-primary hover:bg-primary/90",
                                        )}
                                    >
                                        <strong className="capitalize">
                                            {name}
                                            {paintingsCount > 0 && (
                                                <span>({paintingsCount})</span>
                                            )}
                                        </strong>
                                        {isBuyable && (
                                            <div className="absolute flex items-center justify-center w-4 h-4 rounded-full -right-2 -top-2 text-dark bg-highlight">
                                                <span className="absolute inset-0 inline-flex w-full h-full text-white rounded-full opacity-100 animate-ping bg-highlight" />
                                                <strong>!</strong>
                                            </div>
                                        )}
                                    </Link>
                                </li>
                            )
                        })}
                    </motion.ul>
                )}
            </AnimatePresence>
        </>
    )
}

export default Filters
