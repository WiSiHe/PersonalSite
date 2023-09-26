import { FaBrush, FaFolder, FaMailBulk, FaTv } from "react-icons/fa"

export const NavItems = [
    // { url: "/", text: "Home" },
    {
        url: "/paintings",
        text: "Paintings",
        description: "A collections of my paintings",
        Icon: FaBrush,
    },
    {
        url: "/projects",
        text: "Projects",
        description: "A collections of my projects",
        Icon: FaFolder,
    },
    {
        url: "/videos",
        text: "Videos",
        description: "Some videos I made",
        Icon: FaTv,
    },
    // { url: "/about", text: "About", description: "Some info about me" },
    {
        url: "/contact",
        text: "Contact",
        description: "Some various ways to contact me",
        Icon: FaMailBulk,
    },
    // { url: "test", text: "Test", description: "Some test pages for development" },
]
