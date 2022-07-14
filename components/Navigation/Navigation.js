import PropTypes from "prop-types"
import React from "react"
// import { useSetRecoilState } from "recoil"
import Link from "next/link"
import clsx from "clsx"
// import { GiHamburgerMenu } from "react-icons/gi"

// import { theme as atomTheme } from '../../atoms/theme';
// import { navdrawer as atomNavdrawer } from "../../atoms/navdrawer"
// import { BsChevronRight } from "react-icons/bs"
import { NavItems } from "constants/navigation"
import { useRouter } from "next/router"

export default function Navigation({ hideOnDesktop = false, isAbsolute = false }) {
  const router = useRouter()
  // const [theme, setTheme] = useRecoilState(atomTheme);
  // const showNavDrawer = useSetRecoilState(atomNavdrawer)

  // const isDarkMode = theme === 'dark';

  // const switchTheme = `w-6 h-6 relative rounded-full transition duration-500 transform dark:bg-yellow-500 bg-purple-900 ${
  //   isDarkMode ? 'translate-x-2' : 'translate-x-8'
  // } p-1 text-white `;

  // const _changeTheme = () => {
  //   switch (theme) {
  //     case 'light':
  //       setTheme('dark');
  //       break;
  //     case 'dark':
  //       setTheme('light');
  //       break;
  //     default:
  //       setTheme('light');
  //   }
  // };

  return (
    <nav
      className={clsx(
        "bg-stone-800 bg-opacity-30 backdrop-blur-lg text-white",
        hideOnDesktop && "xl:hidden",
        isAbsolute ? "fixed z-10 top-0 left-0 right-0 " : "relative"
      )}>
      <div className="flex items-center justify-between px-4 py-2 mx-auto">
        <div className="flex items-center">
          <Link href="/">
            <a className="flex items-center justify-center p-2 text-sm group-active:bg-highlight group-focus:ring group-focus:ring-highlight ">
              <strong className="font-bold hover:text-primary">WiSiHe</strong>
            </a>
          </Link>
          <span>|</span>
          <ul className="flex items-center gap-4 px-4">
            {NavItems.map((item, i) => {
              const { asPath = "" } = router

              const asPathWithSpacing = asPath.replace(/\//g, "/")
              console.log("asPathWithSpacing", asPathWithSpacing)

              const isActive = asPathWithSpacing.includes(item.url)

              return (
                <li key={i}>
                  <Link href={item.url} passHref>
                    <a
                      className={clsx(
                        "transition-all hover:text-primary  active:bg-highlight focus:outline-none focus:ring focus:ring-highlight",
                        isActive &&
                          "underline underline-offset-1 decoration-primary text-primary decoration-2 font-semibold"
                      )}>
                      {item.text}
                    </a>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        {/* <button
          className="inline-flex p-2 rounded-full hover:bg-opacity-10 hover:bg-primary active:bg-highlight focus:outline-none focus:ring focus:ring-highlight"
          onClick={() => showNavDrawer(true)}>
          <GiHamburgerMenu />
        </button> */}
      </div>
    </nav>
  )
}

Navigation.propTypes = {
  darkMode: PropTypes.bool,
  hideOnDesktop: PropTypes.bool,
  isAbsolute: PropTypes.bool
}
