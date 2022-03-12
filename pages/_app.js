import PropTypes from "prop-types";
import React from "react";
import "tailwindcss/tailwind.css";
import { RecoilRoot } from "recoil";

import { AnimateSharedLayout } from "framer-motion";
import ThemeSwitcher from "../components/themeSwitcher";
import Script from "next/script";

const MyApp = function ({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <ThemeSwitcher>
        <AnimateSharedLayout>
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-TDN290C5H6"
            strategy="afterInteractive"
          />
          <Component {...pageProps} />
        </AnimateSharedLayout>
      </ThemeSwitcher>
    </RecoilRoot>
  );
};

MyApp.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any,
};

export default MyApp;
