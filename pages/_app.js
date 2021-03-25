import React from "react";
import "tailwindcss/tailwind.css";

import { RecoilRoot } from "recoil";

import ThemeSwitcher from "../components/themeSwitcher";

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
