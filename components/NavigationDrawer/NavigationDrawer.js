import React from "react";
import FocusTrap from "focus-trap-react";

import { RiCloseFill } from "react-icons/ri";
import { useRecoilState } from "recoil";
import Overlay from "../Overlay";

import { navdrawer as atomNavdrawer } from "../../atoms/navdrawer";
import ActiveLink from "../ActiveLink/ActiveLink";

const NavigationDrawer = () => {
  const [navdrawer, hideNavDrawer] = useRecoilState(atomNavdrawer);

  const defaultStyle =
    "h-full fixed bg-white dark:bg-gray-800 w-full sm:w-96 z-30 top-0 shadow-lg p-4 transform -translate-x-full transition-all duration-500 ease-in-out dark:text-white";
  const activeStyle =
    "h-full fixed bg-white dark:bg-gray-800 w-full sm:w-96 z-30 top-0 shadow-lg p-4 transform transition-all duration-500 ease-in-out dark:text-white";

  return (
    <>
      <FocusTrap active={navdrawer}>
        <nav className={navdrawer ? activeStyle : defaultStyle}>
          <div className="flex justify-between items-center py-4">
            <p>wisihe.no</p>
            <button onClick={() => hideNavDrawer(false)}>
              <RiCloseFill className="text-4xl dark:text-white hover:opacity-50" />
            </button>
          </div>
          <hr />
          <ul className=" space-y-4 pt-4  ">
            <li>
              <ActiveLink href="/">Home</ActiveLink>
            </li>
            <li>
              <ActiveLink href={"/paintings"}>Paintings</ActiveLink>
            </li>
            {/* <li>
            <ActiveLink href={"/projects"}>Projects</ActiveLink>
          </li> */}
          </ul>
        </nav>
      </FocusTrap>
      <Overlay display={navdrawer} close={() => hideNavDrawer(false)} />
    </>
  );
};

export default NavigationDrawer;
