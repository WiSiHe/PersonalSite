import React from "react";
import clsx from "clsx";
import { useRouter } from "next/router";
import Link from "next/link";
import { BsChevronRight } from "react-icons/bs";

import { NavItems } from "constants/navigation";

const NavigationLinks = () => {
  const router = useRouter();

  return (
    <>
      <ul className="grid gap-4 p-2">
        {NavItems.map((item, i) => {
          const isActive = router.asPath === item.url;
          return (
            <li key={i}>
              <Link href={item.url} passHref>
                <a
                  className={clsx(
                    "transition-all flex items-center justify-between p-2 rounded-lg hover:bg-primary hover:text-white active:bg-highlight focus:outline-none focus:ring focus:ring-highlight",
                    isActive && "text-white bg-primary",
                  )}
                >
                  <strong>{item.text}</strong>
                  <BsChevronRight />
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
