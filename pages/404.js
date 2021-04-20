import React from "react";
import Image from "next/image";

import Main from "../components/Main";
import Meta from "../components/Meta/Meta";
import Navigation from "../components/Navigation";

export default function Custom404() {
  return (
    <>
      <Meta />
      <Navigation />
      <Main>
        <section
          className="container max-w-full  h-screen object-cover bg-fixed bg-cover flex flex-wrap content-center bg-center justify-center items-center  "
          style={{
            backgroundImage: `url(/images/explorer.png)`,
          }}
        >
          <div className="text-center p-8 bg-white">
            <h1 className="text-3xl font-serif">404</h1>
            <h2>Oops, seems you wandered off to far!</h2>
            <h3>Page not found</h3>
          </div>
        </section>
      </Main>
    </>
  );
}
