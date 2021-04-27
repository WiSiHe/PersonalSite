import PropTypes from "prop-types";
import React, { useEffect } from "react";
import "tailwindcss/tailwind.css";

import { RecoilRoot } from "recoil";

import TagManager from "react-gtm-module";

import { hotjar } from "react-hotjar";

const tagManagerArgs = {
  id: "GTM-K885GDV",
};

import ThemeSwitcher from "../components/themeSwitcher";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    TagManager.initialize(tagManagerArgs);
    hotjar.initialize(2372362, 6);
  }, []);

  return (
    <RecoilRoot>
      <ThemeSwitcher>
        <Component {...pageProps} />
      </ThemeSwitcher>
    </RecoilRoot>
  );
}

MyApp.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any,
};

export default MyApp;
