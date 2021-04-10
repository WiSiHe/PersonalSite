import React from "react";
import "tailwindcss/tailwind.css";

import { RecoilRoot } from "recoil";

import ThemeSwitcher from "../components/themeSwitcher";

import ReactGA from "react-ga";

ReactGA.initialize("G-TDN290C5H6");

268497789;

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <ThemeSwitcher>
        <Component {...pageProps} />
      </ThemeSwitcher>
    </RecoilRoot>
  );
}

export default MyApp;
