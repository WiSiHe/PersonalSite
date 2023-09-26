import clsx from "clsx"
import React from "react"
import {
    SiArtstation,
    SiInstagram,
    SiLinkedin,
    SiRedbubble,
} from "react-icons/si"

const SocialLinks = ({ alignLeft = false }) => {
    return (
        <div
            className={clsx(
                "flex",
                alignLeft ? "justify-start" : "justify-center",
            )}
        >
            <ul className="inline-flex space-x-8 ">
                <li className="">
                    <a
                        href="https://www.redbubble.com/people/hws902/shop?asc=u&ref=account-nav-dropdown"
                        rel="noreferrer"
                        target="_blank"
                        aria-label="redbubble"
                        className="group focus:outline-none"
                    >
                        <SiRedbubble
                            aria-hidden="true"
                            className="group-focus:rounded-full group-focus:outline-none group-hover:text-primary group-active:bg-primary group-focus:ring group-focus:text-primary group-focus:ring-primary"
                        />
                    </a>
                </li>
                <li className="hover:text-yellow-500">
                    <a
                        href="https://www.artstation.com/wisihe"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="artstation"
                        className="group focus:outline-none"
                    >
                        <SiArtstation
                            aria-hidden="true"
                            className="group-focus:rounded-full group-focus:outline-none group-hover:text-primary group-active:bg-primary group-focus:ring group-focus:text-primary group-focus:ring-primary"
                        />
                    </a>
                </li>
                <li className="hover:text-yellow-500">
                    <a
                        href="https://www.instagram.com/wisihe/?hl=en"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="instagram"
                        className="group focus:outline-none"
                    >
                        <SiInstagram
                            aria-hidden="true"
                            className="group-focus:rounded-full group-focus:outline-none group-hover:text-primary group-active:bg-primary group-focus:ring group-focus:text-primary group-focus:ring-primary"
                        />
                    </a>
                </li>
                <li className="hover:text-yellow-500">
                    <a
                        href="https://www.linkedin.com/in/henrik-wilhelm-sissener/"
                        rel="noreferrer"
                        target="_blank"
                        aria-label="linkedin"
                        className="group focus:outline-none"
                    >
                        <SiLinkedin
                            aria-hidden="true"
                            className="group-focus:rounded-full group-focus:outline-none group-hover:text-primary group-active:bg-primary group-focus:ring group-focus:text-primary group-focus:ring-primary"
                        />
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default SocialLinks
