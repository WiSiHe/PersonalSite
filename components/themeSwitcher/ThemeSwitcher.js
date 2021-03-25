import PropTypes from "prop-types";
import React from "react";
import { useRecoilValue } from "recoil";

import { theme as atomTheme } from "../../atoms/theme";

const ThemeSwitcher = ({ children }) => {
  const theme = useRecoilValue(atomTheme);
  return <div className={theme}>{children}</div>;
};

ThemeSwitcher.propTypes = {
  children: PropTypes.object,
};

export default ThemeSwitcher;
