import PropTypes from "prop-types";
import React, { useEffect } from "react";
import "tailwindcss/tailwind.css";
import { RecoilRoot } from "recoil";

import ThemeSwitcher from "../components/themeSwitcher";
import { AnimatePresence, AnimateSharedLayout } from "framer-motion";

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <ThemeSwitcher>
        <AnimateSharedLayout>
          <Component {...pageProps} />
        </AnimateSharedLayout>
      </ThemeSwitcher>
    </RecoilRoot>
  );
}

MyApp.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any,
};

export default MyApp;
