"use client"
import clsx from "clsx"
import BackButton from "components/molecules/BackButton/BackButton"
import ShareButton from "components/molecules/ShareButton"
import StoreLinks from "components/molecules/StoreLinks"
import { AnimatePresence, motion } from "framer-motion"
import { iSanityPainting } from "lib/models/objects/sanityPainting"
import { urlForImage } from "lib/sanity.image"
import dynamic from "next/dynamic"
import Image from "next/image"
import { FaEye, FaThumbsUp } from "react-icons/fa"

const ReactPlayer = dynamic(() => import("react-player"), {
    suspense: true,
    // ssr: false,
})

interface iPaintingPageProps {
    painting: iSanityPainting
}

const formatDate = (date: string) => {
    const d = new Date(date)
    const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d)
    const mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d)
    return `${mo} ${ye}`
}

const PaintingPage = ({ painting }: iPaintingPageProps) => {
    if (!painting) return <h1>Painting not found</h1>

    const {
        images,
        title = "",
        description = "",
        altText = "",
        image,
        format = "square",
        paintedAt,
        redbubbleUrl = "",
        society6Url = "",
        artstationUrl = "",
        inPrintUrl = "",
        tagsV2 = [],
        video = "",
        likes = 0,
    } = painting

    const imageAspectStyle = {
        square: "aspect-square",
        landscape: "aspect-video",
        portrait: "aspect-[9/16]",
    }

    const imageHeight = {
        square: 1200,
        landscape: 820,
        portrait: 1200,
    }
    const imageWidth = {
        square: 1200,
        landscape: 1200,
        portrait: 650,
    }

    const links = {
        redbubbleUrl,
        society6Url,
        artstationUrl,
        inPrintUrl,
    }

    return (
        <>
            <BackButton />
            <AnimatePresence>
                <section className="flex flex-col gap-4 pb-4 col-span-full lg:col-span-6 xl:col-span-8">
                    <motion.div
                        layoutId={title}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{
                            type: "spring",
                            delay: 0.5,
                            duration: 0.5,
                        }}
                        key="MainPainting"
                        className={clsx(
                            "flex relative",
                            imageAspectStyle[format],
                        )}
                    >
                        <Image
                            priority
                            fill
                            alt={altText}
                            src={urlForImage(image)
                                .width(imageWidth[format])
                                .height(imageHeight[format])
                                .quality(65)
                                .url()}
                            sizes="(min-width: 2040px) 1253px, (min-width: 1280px) calc(57.57vw + 90px), (min-width: 1040px) 50vw, calc(100vw - 32px)"
                            className="object-cover h-fit"
                        />
                    </motion.div>
                    {images?.map((image, index) => {
                        return (
                            <motion.div
                                key={`picture-${index}`}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{
                                    type: "spring",
                                    delay: 0.5,
                                    duration: 0.5,
                                }}
                                className={clsx(
                                    "relative",
                                    imageAspectStyle[format],
                                )}
                            >
                                <Image
                                    priority
                                    fill
                                    alt={altText}
                                    src={urlForImage(image)
                                        .width(imageWidth[format])
                                        .height(imageHeight[format])
                                        .quality(65)
                                        .url()}
                                    sizes="(min-width: 2080px) 1267px, (min-width: 1280px) calc(57.44vw + 84px), calc(100vw - 32px)"
                                    className="object-cover h-fit"
                                />
                            </motion.div>
                        )
                    })}
                    {video && (
                        <motion.div
                            className="w-full aspect-video bg-dark"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{
                                type: "spring",
                                delay: 0.5,
                                duration: 0.5,
                            }}
                        >
                            <ReactPlayer
                                url={video}
                                loop
                                muted
                                width="100%"
                                height="100%"
                                light
                            />
                        </motion.div>
                    )}
                </section>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", delay: 0.2, duration: 0.5 }}
                    key="text-section"
                    className="relative justify-between p-0 transition-all rounded lg:sticky lg:col-span-6 lg:top-20 xl:z-10 col-span-full h-fit lg:bg-white lg:p-4 xl:p-6 xl:col-span-4"
                >
                    <div>
                        <h1>
                            <strong>{title}</strong>
                        </h1>
                        <section className="flex flex-wrap mt-4 text-xs">
                            {tagsV2?.map((tag, i) => {
                                const { name = "" } = tag
                                const isLastElement = i === tagsV2.length - 1

                                return (
                                    <div
                                        key={`tag-${i}`}
                                        className={clsx(
                                            "flex items-center gap-2",
                                            isLastElement ? "" : "mr-2",
                                        )}
                                    >
                                        <span>{name}</span>
                                        {!isLastElement && <span>&#183;</span>}
                                    </div>
                                )
                            })}
                        </section>
                        <div className="flex justify-between gap-2 py-4 text-sm text-stone-400">
                            <div>{paintedAt && formatDate(paintedAt)}</div>
                            <div className="flex items-center gap-2">
                                Likes:
                                <FaThumbsUp /> <span>{likes}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                Views:
                                <FaEye /> 0
                            </div>
                        </div>

                        <div>
                            <strong>Desciption</strong>
                            <p className="whitespace-pre-wrap">
                                {description && description}
                            </p>
                        </div>

                        <ShareButton />
                        <div className="py-6">
                            <StoreLinks links={links} />
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </>
    )
}

export default PaintingPage
