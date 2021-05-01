import PropTypes from "prop-types";
import React from "react";
import { useRecoilState } from "recoil";

import { overlay as atomOverlay } from "../../atoms/overlay";

const Overlay = ({ display = false }) => {
  const [overlay, displayOverlay] = useRecoilState(atomOverlay);

  const defaultStyle =
    "fixed top-0 bottom-0 left-0 right-0 bg-black opacity-0 z-20 pointer-events-none transition-all duration-1000 ease-in-out";
  const activeStyle =
    "fixed top-0 bottom-0 left-0 right-0 bg-black opacity-60 z-20 transition-all duration-1000 ease-in-out";

  return (
    <div
      className={display ? activeStyle : defaultStyle}
      onClick={() => displayOverlay(!overlay)}
    />
  );
};

Overlay.propTypes = {
  display: PropTypes.bool,
};

export default Overlay;
