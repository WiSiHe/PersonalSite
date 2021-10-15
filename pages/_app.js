import PropTypes from "prop-types";
import React, { useEffect } from "react";
import "tailwindcss/tailwind.css";

import { RecoilRoot } from "recoil";

// import { hotjar } from "react-hotjar";

import ThemeSwitcher from "../components/themeSwitcher";

function MyApp({ Component, pageProps }) {
  // useEffect(() => {
  //   hotjar.initialize(2372362, 6);
  // }, []);

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
