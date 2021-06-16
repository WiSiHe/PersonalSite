import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

const Main = ({ noTopPadding = false, children }) => {
  const mainCss =
    "flex-grow bg-gray-50 dark:bg-gray-800 transition-all duration-1000 ease-in-out  dark:text-white  min-h-screen ";

  return (
    <main className={clsx(mainCss, !noTopPadding && "mt-16")}>{children}</main>
  );
};

Main.propTypes = {
  children: PropTypes.node.isRequired,
  noTopPadding: PropTypes.bool,
};

export default Main;
