import {
    SiArtstation,
    SiInstagram,
    SiLinkedin,
    SiRedbubble,
} from "react-icons/si"

import { cn } from "@/utils/utility"

const links = [
    {
        label: "Redbubble",
        url: "https://www.redbubble.com/people/hws902/shop?asc=u&ref=account-nav-dropdown",
        icon: <SiRedbubble />,
    },
    {
        label: "Artstation",
        url: "https://www.artstation.com/wisihe",
        icon: <SiArtstation />,
    },
    {
        label: "Instagram",
        url: "https://www.instagram.com/wisihe/?hl=en",
        icon: <SiInstagram />,
    },
    {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/henrik-wilhelm-sissener/",
        icon: <SiLinkedin />,
    },
]

const SocialLinks = ({ alignLeft = false }) => {
    return (
        <div
            className={cn(
                "flex",
                alignLeft ? "justify-start" : "justify-center",
            )}
        >
            <ul className="inline-flex space-x-8 ">
                {links.map((link) => {
                    const { label, url, icon } = link
                    return (
                        <li key={url} className="hover:text-yellow-500">
                            <a
                                href={url}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={label}
                                className="group focus:outline-none"
                            >
                                {icon}
                            </a>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default SocialLinks
