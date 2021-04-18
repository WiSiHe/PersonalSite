import React from "react";

import {
  SiRedbubble,
  SiArtstation,
  SiInstagram,
  SiLinkedin,
} from "react-icons/si";

export default function Footer() {
  return (
    <footer className=" w-full p-4 bg-purple-800 text-white dark:bg-gray-800">
      <div className="flex justify-center">
        <ul className="inline-flex space-x-4 ">
          <li>
            <a
              href="https://www.redbubble.com/people/hws902/shop?asc=u&ref=account-nav-dropdown"
              rel="noreferrer"
              target="_blank"
              aria-label="redbubble"
            >
              <SiRedbubble alt="redbubble" aria-hidden="true" />
            </a>
          </li>
          <li>
            <a
              href="https://www.artstation.com/wisihe"
              target="_blank"
              rel="noreferrer"
              aria-label="artstation"
            >
              <SiArtstation alt="artstation" aria-hidden="true" />
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/wisihe/?hl=en"
              target="_blank"
              rel="noreferrer"
              aria-label="instagram"
            >
              <SiInstagram alt="instagram" aria-hidden="true" />
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/henrik-wilhelm-sissener/"
              rel="noreferrer"
              target="_blank"
              aria-label="linkedin"
            >
              <SiLinkedin alt="linkedin" aria-hidden="true" />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
