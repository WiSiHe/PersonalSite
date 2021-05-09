import React, { useEffect } from "react";
import FocusTrap from "focus-trap-react";

import { RiCloseFill } from "react-icons/ri";
import { useRecoilState } from "recoil";
import Overlay from "../Overlay";

import { navdrawer as atomNavdrawer } from "../../atoms/navdrawer";
import ActiveLink from "../ActiveLink/ActiveLink";

import Logo from "../../icons/logo";
import SocialLinks from "../SocialLinks/SocialLinks";

const NavigationDrawer = () => {
  const [navdrawer, hideNavDrawer] = useRecoilState(atomNavdrawer);

  // rewrite this
  const defaultStyle =
    "h-full fixed bg-white dark:bg-gray-800 w-full sm:w-96 z-30 top-0 shadow-lg p-4 transform -translate-x-full transition-all duration-500 ease-in-out dark:text-white";
  const activeStyle =
    "h-full fixed bg-white dark:bg-gray-800 w-full sm:w-96 z-30 top-0 shadow-lg p-4 transform transition-all duration-500 ease-in-out dark:text-white";

  useEffect(() => {
    return () => {
      hideNavDrawer(false);
    };
  }, []);

  return (
    <>
      <FocusTrap active={navdrawer}>
        <div>
          <nav className={navdrawer ? activeStyle : defaultStyle}>
            <div className="flex justify-between items-center py-4">
              <div className="flex justify-between items-center filter brightness-200">
                <Logo /> <p className="p-2">Henrik Wilhelm Sissener</p>
              </div>
              <button onClick={() => hideNavDrawer(false)}>
                <RiCloseFill className="text-2xl dark:text-white hover:opacity-50" />
              </button>
            </div>
            <hr />
            <ul className="space-y-4 pt-4">
              <li>
                <ActiveLink href="/" onClick={() => console.log("hey")}>
                  Home
                </ActiveLink>
              </li>
              <li>
                <ActiveLink href={"/paintings"}>Paintings</ActiveLink>
              </li>
            </ul>

            <div className=" absolute left-0 right-0 bottom-4">
              <SocialLinks />
            </div>
          </nav>

          <Overlay display={navdrawer} close={() => hideNavDrawer(false)} />
        </div>
      </FocusTrap>
    </>
  );
};

export default NavigationDrawer;
