import React, { useEffect } from "react";
import FocusTrap from "focus-trap-react";

import { RiCloseFill } from "react-icons/ri";
import { useRecoilState } from "recoil";
import clsx from "clsx";

import Overlay from "../Overlay";

import { navdrawer as atomNavdrawer } from "../../atoms/navdrawer";

import SocialLinks from "../SocialLinks/SocialLinks";
import NavigationLinks from "components/NavigationLinks";

const NavigationDrawer = () => {
  const [navdrawer, hideNavDrawer] = useRecoilState(atomNavdrawer);

  // rewrite this
  const defaultStyle = "-translate-x-full";
  const activeStyle = "dark:text-white";

  useEffect(() => {
    return () => {
      hideNavDrawer(false);
    };
  }, [hideNavDrawer]);

  return (
    <>
      <FocusTrap active={navdrawer}>
        <div>
          <nav
            className={clsx(
              "h-full fixed bg-stone-300 w-full sm:w-96 z-30 top-0 shadow-lgtransform transition-all duration-500 ease-in-out",
              navdrawer ? activeStyle : defaultStyle,
            )}
          >
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center justify-between ">
                <div className="flex items-center justify-center p-4 text-xs rounded-lg bg-primary text-highlight">
                  WiSiHe
                </div>
              </div>
              <button
                onClick={() => hideNavDrawer(false)}
                className="p-2 rounded-full hover:bg-opacity-10 hover:bg-primary"
              >
                <RiCloseFill className="text-2xl " />
              </button>
            </div>

            <hr className=" bg-stone-800 border-stone-400" />
            <NavigationLinks />
            <hr className="my-4 bg-stone-800 border-stone-400" />
            <SocialLinks />
          </nav>

          <Overlay display={navdrawer} close={() => hideNavDrawer(false)} />
        </div>
      </FocusTrap>
    </>
  );
};

export default NavigationDrawer;
