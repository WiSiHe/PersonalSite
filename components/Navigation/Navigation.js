import React from "react";
import { useRecoilState } from "recoil";
import Link from "next/link";

// import { GiHamburgerMenu } from "react-icons/gi";

import { theme as atomTheme } from "../../atoms/theme";
// import { navdrawer as atomNavdrawer } from "../../atoms/navdrawer";
import Logo from "../../icons/logo";
// import Switch from "../Switch";

export default function Navigation() {
  const [theme, setTheme] = useRecoilState(atomTheme);
  // const [navdrawer, showNavDrawer] = useRecoilState(atomNavdrawer);

  const isDarkMode = theme === "dark";

  const switchTheme = `w-6 h-6 relative rounded-full transition duration-500 transform dark:bg-yellow-500 bg-purple-900 ${
    isDarkMode ? "translate-x-2" : "translate-x-8"
  } p-1 text-white `;

  const _changeTheme = () => {
    switch (theme) {
      case "light":
        setTheme("dark");
        break;
      case "dark":
        setTheme("light");
        break;
      default:
        setTheme("light");
    }
  };
  return (
    <nav className="fixed top-0 left-0 right-0 z-10 max-w-full font-serif text-lg bg-white shadow-2xl dark:bg-gray-700 dark:text-white ">
      <div className="flex items-center justify-between px-8 py-4 mx-auto">
        {/* <button className="inline-flex " onClick={() => showNavDrawer(true)}>
          <GiHamburgerMenu />
        </button> */}
        <Link href="/">
          <a className="relative h-2 transform -translate-y-5 font-xs filter hover:contrast-200 hover:brightness-200 ">
            <Logo />
          </a>
        </Link>
        {/* <Switch /> */}
        <button
          className="flex items-center w-16 h-8 transition duration-300 bg-white rounded-full shadow-inner dark:bg-gray-900 focus:outline-none"
          onClick={() => _changeTheme()}
          aria-label="darkmode toggle"
        >
          <div id="switch-toggle" className={switchTheme}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </div>
        </button>
      </div>
    </nav>
  );
}
