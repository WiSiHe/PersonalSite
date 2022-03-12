import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { SiRedbubble, SiArtstation, SiInstagram, SiLinkedin } from "react-icons/si";

const SocialLinks = ({ alignLeft = false }) => {
  return (
    <div className={clsx("flex", alignLeft ? "justify-start" : "justify-center")}>
      <ul className="inline-flex space-x-4 ">
        <li className="">
          <a
            href="https://www.redbubble.com/people/hws902/shop?asc=u&ref=account-nav-dropdown"
            rel="noreferrer"
            target="_blank"
            aria-label="redbubble"
            className="group focus:outline-none"
          >
            <SiRedbubble
              alt="redbubble"
              aria-hidden="true"
              className="group-focus:rounded-full group-focus:outline-none group-hover:text-primary group-active:bg-highlight group-focus:ring group-focus:text-primary group-focus:ring-highlight"
            />
          </a>
        </li>
        <li className="hover:text-yellow-500">
          <a
            href="https://www.artstation.com/wisihe"
            target="_blank"
            rel="noreferrer"
            aria-label="artstation"
            className="group focus:outline-none"
          >
            <SiArtstation
              alt="artstation"
              aria-hidden="true"
              className="group-focus:rounded-full group-focus:outline-none group-hover:text-primary group-active:bg-highlight group-focus:ring group-focus:text-primary group-focus:ring-highlight"
            />
          </a>
        </li>
        <li className="hover:text-yellow-500">
          <a
            href="https://www.instagram.com/wisihe/?hl=en"
            target="_blank"
            rel="noreferrer"
            aria-label="instagram"
            className="group focus:outline-none"
          >
            <SiInstagram
              alt="instagram"
              aria-hidden="true"
              className="group-focus:rounded-full group-focus:outline-none group-hover:text-primary group-active:bg-highlight group-focus:ring group-focus:text-primary group-focus:ring-highlight"
            />
          </a>
        </li>
        <li className="hover:text-yellow-500">
          <a
            href="https://www.linkedin.com/in/henrik-wilhelm-sissener/"
            rel="noreferrer"
            target="_blank"
            aria-label="linkedin"
            className="group focus:outline-none"
          >
            <SiLinkedin
              alt="linkedin"
              aria-hidden="true"
              className="group-focus:rounded-full group-focus:outline-none group-hover:text-primary group-active:bg-highlight group-focus:ring group-focus:text-primary group-focus:ring-highlight"
            />
          </a>
        </li>
      </ul>
    </div>
  );
};

SocialLinks.propTypes = {
  alignLeft: PropTypes.bool,
};

export default SocialLinks;
