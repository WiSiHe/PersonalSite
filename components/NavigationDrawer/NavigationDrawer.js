import React, { useEffect } from 'react';
import FocusTrap from 'focus-trap-react';

import { RiCloseFill } from 'react-icons/ri';
import { useRecoilState } from 'recoil';
import Overlay from '../Overlay';

import { navdrawer as atomNavdrawer } from '../../atoms/navdrawer';

import SocialLinks from '../SocialLinks/SocialLinks';
import { NavItems } from 'constants/navigation';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { BsChevronRight } from 'react-icons/bs';

const NavigationDrawer = () => {
  const [navdrawer, hideNavDrawer] = useRecoilState(atomNavdrawer);

  const router = useRouter();

  // rewrite this
  const defaultStyle =
    'h-full fixed bg-white dark:bg-gray-800 w-full sm:w-96 z-30 top-0 shadow-lg p-4 transform -translate-x-full transition-all duration-500 ease-in-out dark:text-white';
  const activeStyle =
    'h-full fixed bg-white dark:bg-gray-800 w-full sm:w-96 z-30 top-0 shadow-lg p-4 transform transition-all duration-500 ease-in-out dark:text-white';

  useEffect(() => {
    return () => {
      hideNavDrawer(false);
    };
  }, [hideNavDrawer]);

  return (
    <>
      <FocusTrap active={navdrawer}>
        <div>
          <nav className={navdrawer ? activeStyle : defaultStyle}>
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center justify-between filter brightness-200">
                <div className="flex items-center justify-center w-12 h-12 text-xs rounded-full bg-primary">
                  WiSiHe
                </div>{' '}
                <p className="p-2">Henrik Wilhelm Sissener</p>
              </div>
              <button onClick={() => hideNavDrawer(false)}>
                <RiCloseFill className="text-2xl dark:text-white hover:opacity-50" />
              </button>
            </div>
            <hr />
            <ul className="grid gap-4 p-6">
              {NavItems.map((item, i) => {
                const isActive = router.asPath === item.url;
                console.log('isActive', isActive);
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

            <div className="absolute left-0 right-0 bottom-4">
              <SocialLinks />
            </div>
          </nav>

          <Overlay display={navdrawer} close={() => hideNavDrawer(false)} />
        </div>
      </FocusTrap>
    </>
  );
};

export default NavigationDrawer;
