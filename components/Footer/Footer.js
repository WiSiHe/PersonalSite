import PropTypes from "prop-types";
import clsx from "clsx";
import React from "react";
import SocialLinks from "../SocialLinks/SocialLinks";

export default function Footer({ fixed = false, onlyMobile = false }) {
  return (
    <footer
      className={clsx(
        "w-full p-4 text-white bg-purple-800 ",
        fixed && "fixed bottom-0",
        onlyMobile && " block lg:hidden"
      )}
    >
      <SocialLinks />
    </footer>
  );
}

Footer.propTypes = {
  fixed: PropTypes.bool,
  onlyMobile: PropTypes.bool,
};
