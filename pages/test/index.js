import Link from "next/link";
import React from "react";
import { IoArrowBackSharp } from "react-icons/io5";

import Main from "../../components/Main";

function Test() {
  return (
    <>
      <div className="fixed z-10 transition-all ease-in-out top-4 left-4">
        <Link href="/">
          <a className="flex items-center justify-center p-2 text-2xl transition-all duration-200 ease-in-out bg-white rounded-lg hover:shadow-lg dark:bg-primary dark:text-white ">
            <IoArrowBackSharp />
          </a>
        </Link>
      </div>
      <Main noTopPadding>
        <section className="container py-20 mx-auto">
          <h1>various links:</h1>
          <hr />
          <ul className="mt-4 space-y-2">
            <li>
              <a
                href="http://localhost:3000"
                className="underline"
                target="_blank"
              >
                localhost
              </a>
            </li>
            <li>
              <a
                href="https://feature.linasmatkasse.se/"
                className="underline"
                target="_blank"
              >
                feature
              </a>
            </li>
          </ul>
        </section>
      </Main>
    </>
  );
}

export default Test;
