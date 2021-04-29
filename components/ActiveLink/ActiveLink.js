import PropTypes from "prop-types";
import React from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { theme as atomTheme } from "../../atoms/theme";

function ActiveLink({ children, href, shallow = false }) {
  const theme = useRecoilValue(atomTheme);

  const isDarkMode = theme === "dark";

  const router = useRouter();
  const isActive = router.asPath === href;

  const darkStyle = `${isActive && "text-yellow-500"}`;
  const lightStyle = `text-black hover:border-b-2 border-purple-800  ${
    isActive && "text-purple-800"
  }`;

  const style = isDarkMode ? darkStyle : lightStyle;

  const handleClick = (e) => {
    e.preventDefault();
    router.push(href, undefined, { shallow: shallow });
  };

  return (
    <a href={href} onClick={handleClick} className={style}>
      {children}
    </a>
  );
}

ActiveLink.propTypes = {
  children: PropTypes.any,
  href: PropTypes.any,
  shallow: PropTypes.bool,
};

export default ActiveLink;
