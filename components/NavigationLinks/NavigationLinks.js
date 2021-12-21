import React from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { BsChevronRight } from 'react-icons/bs';

import { NavItems } from 'constants/navigation';

const NavigationLinks = () => {
  const router = useRouter();

  return (
    <>
      <ul className="grid gap-4 p-2">
        {NavItems.map((item, i) => {
          const isActive = router.asPath === item.url;
          return (
            <li
              key={i}
              className={clsx(
                'px-1 transition-all',
                isActive && 'text-white bg-primary rounded-lg  py-2',
              )}
            >
              <Link href={item.url} passHref>
                <a>
                  <div className={clsx('flex items-center justify-between px-4')}>
                    <strong>{item.text}</strong>
                    <BsChevronRight />
                  </div>
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default NavigationLinks;
