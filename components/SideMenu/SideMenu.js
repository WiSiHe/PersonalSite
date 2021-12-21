import React from 'react';

import SocialLinks from 'components/SocialLinks';

import Link from 'next/link';

import NavigationLinks from 'components/NavigationLinks';

const SideMenu = () => {
  return (
    <section className="relative w-full h-full">
      <div className="flex flex-col items-center justify-center w-full p-8 bg-stone-300 ">
        <div className="mb-4 !text-left">
          <Link href="/" passHref>
            <a>
              <div className="flex items-center justify-center w-24 h-24 rounded-full text-highlight bg-primary">
                <strong>WiSiHe</strong>
              </div>
            </a>
          </Link>
        </div>
        <h1 className="text-xl font-playfair">
          <strong>
            <span className="text-primary">He</span>nrik <span className="text-primary">Wi</span>
            lhelm <span className="text-primary">Si</span>ssener
          </strong>
        </h1>
        <div className="mt-4">
          <SocialLinks />
        </div>
      </div>

      <hr className=" bg-stone-800 border-stone-400" />
      <NavigationLinks />
    </section>
  );
};

export default SideMenu;
