import React from "react";
import PropTypes from "prop-types";

const Main = ({ children }) => {
  const mainCss =
    "flex-grow bg-gray-50 dark:bg-gray-800 transition-all duration-1000 ease-in-out mt-16 dark:text-white overflow-hidden min-h-screen";

  return <main className={mainCss}>{children}</main>;
};

Main.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Main;
