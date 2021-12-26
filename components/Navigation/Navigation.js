import React from 'react';
import { useSetRecoilState } from 'recoil';
import Link from 'next/link';
import clsx from 'clsx';
import { GiHamburgerMenu } from 'react-icons/gi';

// import { theme as atomTheme } from '../../atoms/theme';
import { navdrawer as atomNavdrawer } from '../../atoms/navdrawer';

export default function Navigation({ hideOnDesktop = false, isAbsolute = false }) {
  // const [theme, setTheme] = useRecoilState(atomTheme);
  const showNavDrawer = useSetRecoilState(atomNavdrawer);

  // const isDarkMode = theme === 'dark';

  // const switchTheme = `w-6 h-6 relative rounded-full transition duration-500 transform dark:bg-yellow-500 bg-purple-900 ${
  //   isDarkMode ? 'translate-x-2' : 'translate-x-8'
  // } p-1 text-white `;

  // const _changeTheme = () => {
  //   switch (theme) {
  //     case 'light':
  //       setTheme('dark');
  //       break;
  //     case 'dark':
  //       setTheme('light');
  //       break;
  //     default:
  //       setTheme('light');
  //   }
  // };

  return (
    <nav
      className={clsx(
        hideOnDesktop && 'block xl:hidden',
        isAbsolute ? 'fixed z-10 top-0 left-0 right-0 ' : 'relative',
        'font-serif  bg-stone-200 bg-opacity-20 backdrop-blur-lg',
      )}
    >
      <div className="flex items-center justify-between px-4 py-2 mx-auto">
        <Link href="/">
          <a className="relative">
            <div className="flex items-center justify-center p-4 text-xs rounded-lg text-highlight bg-primary">
              <strong>WiSiHe</strong>
            </div>
          </a>
        </Link>
        <button
          className="inline-flex p-2 text-white rounded-full hover:bg-opacity-10 hover:bg-primary"
          onClick={() => showNavDrawer(true)}
        >
          <GiHamburgerMenu />
        </button>
      </div>
    </nav>
  );
}
