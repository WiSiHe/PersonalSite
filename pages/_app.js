import React, { useEffect } from "react";
import "tailwindcss/tailwind.css";

import { RecoilRoot } from "recoil";
import TagManager from "react-gtm-module";
import ReactGA from "react-ga";

import ThemeSwitcher from "../components/themeSwitcher";

268497789;

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    TagManager.initialize({ gtmId: "GTM-K885GDV" });
    ReactGA.initialize("G-TDN290C5H6");
    ReactGA.pageview(window.location.pathname + window.location.search);
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
