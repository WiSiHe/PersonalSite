import StoreLink from "components/atoms/StoreLink"
import SocialLinks from "components/molecules/SocialLinks/SocialLinks"
import Image from "next/image"
import Link from "next/link"
import explorer from "public/images/explorer.png"
import bathtub from "public/images/paintings/bathtub.jpg"
import celestial from "public/images/paintings/Celestial.jpg"
import cloud from "public/images/paintings/cloud.jpg"
import creepy from "public/images/paintings/creepy.jpg"
import sloth from "public/images/paintings/cute.jpg"
import fire from "public/images/paintings/fire.jpg"
import iceCave from "public/images/paintings/icecave.png"
import sunlight from "public/images/paintings/sunlight.jpg"
import winter from "public/images/paintings/winter.jpg"
import woods from "public/images/woods.png"
import { FaMailBulk } from "react-icons/fa"
import {
    SiArtstation,
    SiOctoprint,
    SiRedbubble,
    SiSociety6,
} from "react-icons/si"

import { cn } from "@/utils/utility"

const mailtoLabel = "mailto:hws902@gmail.com"

const paintings = [
    {
        label: "Cute",
        src: sloth,
        alt: "cute",
        height: 24,
        aspectRatio: "aspect-square",
    },
    {
        label: "Bathtub",
        src: bathtub,
        alt: "bathtub",
        height: 32,
        aspectRatio: "aspect-portrait",
    },
    {
        label: "Winter",
        src: winter,
        alt: "winter",
        height: 24,
        aspectRatio: "aspect-video",
    },
    {
        label: "Creepy",
        src: creepy,
        alt: "creepy",
        height: 32,
        aspectRatio: "aspect-video",
    },
    {
        label: "Fire",
        src: fire,
        alt: "fire",
        height: 24,
        aspectRatio: "aspect-square",
    },
    {
        label: "Ice Cave",
        src: iceCave,
        alt: "ice cave",
        height: 24,
        aspectRatio: "aspect-video",
    },
    {
        label: "Sunlight",
        src: sunlight,
        alt: "sunlight",
        height: 24,
        aspectRatio: "aspect-square",
    },
    {
        label: "Celestial",
        src: celestial,
        alt: "celestial",
        height: 24,
        aspectRatio: "aspect-square",
    },
    {
        label: "Cloud",
        src: cloud,
        alt: "cloud",
        height: 24,
        aspectRatio: "aspect-video",
    },
    {
        label: "Explorer",
        src: woods,
        alt: "explorer",
        height: 24,
        aspectRatio: "aspect-portrait",
    },
]

paintings.sort(() => Math.random() - 0.5)

const ContactPage = () => {
    return (
        <>
            <div className="flex flex-col gap-8 p-4 col-span-full lg:col-span-3">
                <section>
                    <h1>Contact</h1>
                    <p className="pt-2">
                        I&#39;m always happy to hear from you. If you have any
                        questions or comments, please feel free to reach out to
                        me via email or social media.
                    </p>
                </section>

                <section className="grid grid-cols-1 gap-4">
                    <div className="col-span-full">
                        <h2>Store</h2>
                        <p className="pt-2">
                            Beyond my original art, I offer prints, posters, and
                            merchandise in various formats, including framed or
                            canvas prints and artful phone cases.
                        </p>
                    </div>
                    <div className="flex flex-col justify-between gap-4 p-4 bg-white drop-shadow">
                        <h3>Redbubble</h3>
                        <p className="text-xs ">
                            Redbubble is a vibrant online marketplace where I
                            sell my unique art as prints, posters, and
                            merchandise.
                        </p>

                        <StoreLink
                            href="https://www.redbubble.com/people/hws902/shop?asc=u"
                            Label="RedBubble"
                            Icon={SiRedbubble}
                            className="bg-[#e31421] hover:bg-[#e31421]/90"
                        />
                    </div>
                    <div className="flex flex-col justify-between gap-2 p-4 bg-white drop-shadow">
                        <h3>ArtStation</h3>
                        <p className="text-xs">
                            ArtStation is the leading showcase platform for
                            games, film, media & entertainment artists.
                        </p>
                        <StoreLink
                            href="https://www.artstation.com/wisihe/prints"
                            Label="ArtStation"
                            Icon={SiArtstation}
                            className="bg-[#101014] hover:bg-dark/90 text-[#51ACEA]"
                        />
                    </div>

                    <div className="flex flex-col justify-between gap-2 p-4 bg-white drop-shadow">
                        <h3>Society6</h3>
                        <p className="text-xs">
                            Society6 is home to hundreds of thousands of artists
                            from around the globe, uploading and selling their
                            original works as 30+ premium consumer goods from
                            Art Prints to Throw Blankets.
                        </p>
                        <StoreLink
                            href="https://society6.com/wisihe"
                            Label="Society6"
                            Icon={SiSociety6}
                            className="bg-dark hover:bg-dark/90"
                        />
                    </div>
                    <div className="flex flex-col justify-between gap-2 p-4 bg-white drop-shadow">
                        <h3>InPrint</h3>
                        <p className="text-xs">
                            InPrnt is a gallery marketplace where I sell my
                            unique art as prints, posters, and merchandise.
                        </p>
                        <StoreLink
                            href="https://www.inprnt.com/gallery/wisihe/"
                            Label="InPrint"
                            Icon={SiOctoprint}
                            className="bg-dark hover:bg-dark/90"
                        />
                    </div>
                </section>

                <section>
                    <h2>Commission</h2>
                    <p className="pb-4">
                        Can&#39;t find what you&#39;re looking for? I&#39;m
                        available for commissions and custom work. Please
                        contact me for more information.
                    </p>
                    <Link
                        href={mailtoLabel}
                        className="flex items-center gap-2 px-4 py-3 text-white bg-primary w-fit"
                    >
                        <FaMailBulk />
                        Email me
                    </Link>
                </section>

                <section className="pb-10">
                    <h2>Social links</h2>
                    <p className="pb-4">
                        I&#39;m active on social media. Follow me to stay up to
                        date with my latest work and projects.
                    </p>
                    <SocialLinks alignLeft />
                </section>
            </div>

            <div className="sticky hidden gap-4 top-20 lg:flex lg:col-span-9">
                <div className="w-full gap-4 columns-3">
                    {paintings.map((painting, index) => (
                        <div
                            className={cn(
                                "mb-4 bg-dark  relative break-inside-avoid rounded-xl",
                                painting.aspectRatio,
                            )}
                            key={index}
                        >
                            <Image
                                src={painting.src}
                                alt="contact"
                                fill
                                placeholder="blur"
                                className="object-cover rounded-xl "
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default ContactPage
