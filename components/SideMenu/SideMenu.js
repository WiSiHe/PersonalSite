import React from 'react';

import { BsChevronRight } from 'react-icons/bs';
import SocialLinks from 'components/SocialLinks';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { NavItems } from 'constants/navigation';
import clsx from 'clsx';

const SideMenu = () => {
  const router = useRouter();

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
      <ul className="grid gap-4 p-6">
        {NavItems.map((item, i) => {
          const isActive = router.asPath === item.url;
          return (
            <li key={i} className={clsx(isActive && 'text-primary')}>
              <Link href={item.url} passHref>
                <a>
                  <div className={clsx('flex items-center justify-between')}>
                    <strong>{item.text}</strong>
                    <BsChevronRight />
                  </div>
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default SideMenu;
