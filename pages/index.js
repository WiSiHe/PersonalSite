import React from "react";
import Head from "next/head";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

export default function Home() {
  const mainCss = "flex-grow bg-gray-50 dark:bg-gray-800";

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />

      <main className={mainCss}>
        <section
          className="container max-w-full  h-screen object-cover  bg-fixed flex flex-wrap content-center  "
          style={{
            backgroundImage: `url("https://w.wallhaven.cc/full/j3/wallhaven-j3339m.jpg")`,
          }}
        >
          <div className="md:flex  p-8 md:p-0 max-w-md mx-8 ">
            <div className="pt-6 md:p-8 text-center md:text-left space-y-4">
              <h1 className="text-4xl font-bold">
                Welcome to my little nextjs & tailwind project!
              </h1>
            </div>
          </div>
        </section>
        <div className="container mx-auto">
          <div className="block sm:flex">
            <div className="p-6 w-full md:w-4/12">
              <h1 className="text-gray-900 dark:text-white">
                Dark mode is here!
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                in augue arcu. Proin mollis, quam tincidunt dictum molestie,
                lorem augue facilisis justo, sed luctus orci massa at urna.
              </p>
              <div className="my-5">
                <button
                  type="button"
                  className="focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-blue-500 hover:bg-blue-600 hover:shadow-lg"
                >
                  Button Name
                </button>
              </div>
            </div>

            <picture>
              <source
                srcSet="https://w.wallhaven.cc/full/28/wallhaven-28ekym.jpg"
                media="(min-width: 400px)"
              />
              <img
                className="p-6 bg-cover bg-center w-full sm:w-8/12 h-80 object-cover "
                src="https://w.wallhaven.cc/full/28/wallhaven-28ekym.jpg"
              />
            </picture>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
