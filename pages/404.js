import React from "react";
import Image from "next/image";

import Main from "../components/Main";
import Meta from "../components/Meta/Meta";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import NavigationDrawer from "../components/NavigationDrawer";

export default function Custom404() {
  return (
    <>
      <Meta />
      <Navigation />
      <NavigationDrawer />
      <Main>
        <section className="w-full h-72 md:h-screen flex relative justify-center items-center  ">
          <Image
            src="/images/explorer.png"
            layout="fill"
            className="object-scale-down md:object-cover bg-left"
          />
          <div className="text-center p-8 bg-white dark:bg-gray-900 shadow-lg z-10 transition duration-1000 ease-in-out  transform translate-y-40 md:transform-none ">
            <h1 className="text-3xl font-serif">404</h1>
            <h2>Oh no! I could not find the page you were looking for!</h2>
            <h3>Page not found</h3>
          </div>
        </section>
      </Main>
      <Footer />
    </>
  );
}
