import React, { useEffect } from "react";
import "tailwindcss/tailwind.css";

import { RecoilRoot } from "recoil";
import TagManager from "react-gtm-module";

import ThemeSwitcher from "../components/themeSwitcher";

268497789;

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    TagManager.initialize({ gtmId: "GTM-K885GDV" });
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
