import React, { useEffect } from "react";
import "tailwindcss/tailwind.css";

import { RecoilRoot } from "recoil";

import TagManager from "react-gtm-module";

const tagManagerArgs = {
  id: "GTM-K885GDV",
};

import ThemeSwitcher from "../components/themeSwitcher";

268497789;

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    TagManager.initialize(tagManagerArgs);
  }, []);

  return (
    <RecoilRoot>
      <ThemeSwitcher>
        <Component {...pageProps} />
      </ThemeSwitcher>
    </RecoilRoot>
  );
}

export default MyApp;
