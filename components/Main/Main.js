import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

const Main = ({ noTopPadding = false, className = "", children }) => {
  const mainCss = "flex flex-1 bg-stone-300 relative w-full dark:text-white min-h-screen";

  return <main className={clsx(mainCss, className, !noTopPadding && "mt-16")}>{children}</main>;
};

Main.propTypes = {
  children: PropTypes.node.isRequired,
  noTopPadding: PropTypes.bool,
};

export default Main;
