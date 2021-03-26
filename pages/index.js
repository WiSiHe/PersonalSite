import React from "react";
import Head from "next/head";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const images = [
  {
    url:
      "https://cdnb.artstation.com/p/assets/images/images/013/488/069/large/henrik-sissener-man-in-woods-6.jpg?1539813177",
  },
  {
    url:
      "https://cdna.artstation.com/p/assets/images/images/013/991/418/large/henrik-sissener-night-forest.jpg?1541993149",
  },
  {
    url:
      "https://cdnb.artstation.com/p/assets/images/images/005/955/563/large/henrik-wilhelm-sissener-woods-2-1.jpg?1494969561",
  },
  {
    url:
      "https://cdnb.artstation.com/p/assets/images/images/003/189/593/large/henrik-wilhelm-sissener-daw2.jpg?1470822001",
  },
  {
    url:
      "https://cdnb.artstation.com/p/assets/images/images/003/189/583/large/henrik-wilhelm-sissener-nature6.jpg?1470821845",
  },
  {
    url:
      "https://cdnb.artstation.com/p/assets/images/images/010/899/059/large/henrik-sissener-boat-universe-ice-2.jpg?1526838087",
  },
  {
    url:
      "https://cdna.artstation.com/p/assets/images/images/025/577/182/large/henrik-sissener-space-helm-profile-low.jpg?1586248553",
  },
];

export default function Home() {
  const mainCss =
    "flex-grow bg-gray-50 dark:bg-gray-800 transition-all duration-1000 ease-in-out";

  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  const header = parseInt(getRandomArbitrary(0, images.length));
  const small = parseInt(getRandomArbitrary(0, images.length));

  return (
    <>
      <Head>
        <title>wisihe.no</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />

      <main className={mainCss}>
        <section
          className="container max-w-full  h-screen object-cover  bg-fixed flex flex-wrap content-center  "
          style={{
            backgroundImage: `url(${images[header].url})`,
          }}
        ></section>
        <div className="container mx-auto">
          <div className="block sm:flex">
            <div className="p-6 w-full lg:w-4/12">
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
            <div className="sm:w-8/12 ">
              <picture>
                <source srcSet={images[small].url} media="(min-width: 400px)" />
                <img
                  className="p-6 bg-cover bg-center w-full h-80 dark:h-full object-cover transition-all"
                  src={images[small].url}
                />
              </picture>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
