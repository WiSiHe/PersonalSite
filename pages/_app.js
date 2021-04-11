import React, { useEffect } from "react";
import "tailwindcss/tailwind.css";

import { RecoilRoot } from "recoil";

import ThemeSwitcher from "../components/themeSwitcher";

import TagManager from "react-gtm-module";

268497789;

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (TagManager) {
      TagManager.initialize({ gtmId: "GTM-K885GDV" });
    }
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
