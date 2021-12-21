import React from 'react';
import { useSetRecoilState } from 'recoil';
import Link from 'next/link';
import clsx from 'clsx';
import { GiHamburgerMenu } from 'react-icons/gi';

// import { theme as atomTheme } from '../../atoms/theme';
import { navdrawer as atomNavdrawer } from '../../atoms/navdrawer';

export default function Navigation({ hideOnDesktop = false }) {
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
        'relative font-serif text-lg bg-stone-200 ',
      )}
    >
      <div className="flex items-center justify-between px-8 py-4 mx-auto">
        <Link href="/">
          <a className="relative">
            <div className="flex items-center justify-center text-xs rounded-full w-14 h-14 text-highlight bg-primary">
              <strong>WiSiHe</strong>
            </div>
          </a>
        </Link>
        <button className="inline-flex " onClick={() => showNavDrawer(true)}>
          <GiHamburgerMenu />
        </button>
      </div>
    </nav>
  );
}
