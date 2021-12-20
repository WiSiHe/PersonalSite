import React from 'react';

import { BsChevronRight } from 'react-icons/bs';
import SocialLinks from 'components/SocialLinks';

import Link from 'next/link';

const SideMenu = () => {
  return (
    <section className="relative w-full h-full">
      <div className="flex flex-col items-center justify-center w-full p-4 ">
        <div className="mb-4 !text-left">
          <Link href="/" passHref>
            <a className="relative transform -translate-y-5 font-xs filter hover:contrast-200 hover:brightness-200 ">
              <div className="flex items-center justify-center w-24 h-24 rounded-full text-highlight bg-primary">
                WiSiHe
              </div>
            </a>
          </Link>
        </div>
      </div>
      <h1 className="p-4 text-2xl font-playfair">Henrik Wilhelm Sissener</h1>
      <ul className="grid gap-4 p-4">
        <li>
          <Link href="/gallery">
            <a>
              <div className="flex items-center justify-between">
                Gallery
                <BsChevronRight />
              </div>
            </a>
          </Link>
        </li>
        {/* <li>
          <Link href="/404">
            <a>
              <div className="flex items-center justify-between">
                About me
                <BsChevronRight />
              </div>
            </a>
          </Link>
        </li> */}
      </ul>
      <div className="fixed left-0 right-0 bottom-10">
        <SocialLinks />
      </div>
    </section>
  );
};

export default SideMenu;
