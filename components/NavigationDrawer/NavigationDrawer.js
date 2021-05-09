import React from "react";
import FocusTrap from "focus-trap-react";

import { RiCloseFill } from "react-icons/ri";
import { useRecoilState } from "recoil";
import Overlay from "../Overlay";

import { navdrawer as atomNavdrawer } from "../../atoms/navdrawer";
import ActiveLink from "../ActiveLink/ActiveLink";

import {
  SiRedbubble,
  SiArtstation,
  SiInstagram,
  SiLinkedin,
} from "react-icons/si";
import Image from "next/image";

const NavigationDrawer = () => {
  const [navdrawer, hideNavDrawer] = useRecoilState(atomNavdrawer);

  const defaultStyle =
    "h-full fixed bg-white dark:bg-gray-800 w-full sm:w-96 z-30 top-0 shadow-lg p-4 transform -translate-x-full transition-all duration-500 ease-in-out dark:text-white";
  const activeStyle =
    "h-full fixed bg-white dark:bg-gray-800 w-full sm:w-96 z-30 top-0 shadow-lg p-4 transform transition-all duration-500 ease-in-out dark:text-white";

  return (
    <>
      <FocusTrap active={navdrawer}>
        <div>
          <nav className={navdrawer ? activeStyle : defaultStyle}>
            <div className="flex justify-between items-center py-4">
              <Image
                src="/images/Logo.png"
                layout="fill"
                alt="logo"
                className="filter object-cover hover:brightness-200 hover:drop-shadow hover:contrast-200"
              />
              <button onClick={() => hideNavDrawer(false)}>
                <RiCloseFill className="text-2xl dark:text-white hover:opacity-50" />
              </button>
            </div>
            <hr />
            <ul className="space-y-4 pt-4">
              <li>
                <ActiveLink href="/">Home</ActiveLink>
              </li>
              <li>
                <ActiveLink href={"/paintings"}>Paintings</ActiveLink>
              </li>
            </ul>

            <div className="flex justify-center absolute left-0 right-0 bottom-4">
              <ul className="inline-flex space-x-4 ">
                <li className="hover:text-yellow-500">
                  <a
                    href="https://www.redbubble.com/people/hws902/shop?asc=u&ref=account-nav-dropdown"
                    rel="noreferrer"
                    target="_blank"
                    aria-label="redbubble"
                  >
                    <SiRedbubble alt="redbubble" aria-hidden="true" />
                  </a>
                </li>
                <li className="hover:text-yellow-500">
                  <a
                    href="https://www.artstation.com/wisihe"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="artstation"
                  >
                    <SiArtstation alt="artstation" aria-hidden="true" />
                  </a>
                </li>
                <li className="hover:text-yellow-500">
                  <a
                    href="https://www.instagram.com/wisihe/?hl=en"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="instagram"
                  >
                    <SiInstagram alt="instagram" aria-hidden="true" />
                  </a>
                </li>
                <li className="hover:text-yellow-500">
                  <a
                    href="https://www.linkedin.com/in/henrik-wilhelm-sissener/"
                    rel="noreferrer"
                    target="_blank"
                    aria-label="linkedin"
                  >
                    <SiLinkedin alt="linkedin" aria-hidden="true" />
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          <Overlay display={navdrawer} close={() => hideNavDrawer(false)} />
        </div>
      </FocusTrap>
    </>
  );
};

export default NavigationDrawer;
