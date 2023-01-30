import SideMenu from "components/SideMenu"
import Image from "next/image"
import React from "react"

import Main from "../components/Main"
import Meta from "../components/Meta/Meta"
// import Navigation from "../components/Navigation"

export default function Custom404() {
  return (
    <>
      <Meta />
      {/* <Navigation hideOnDesktop /> */}

      <Main noTopPadding>
        <section className="relative grid flex-1 flex-grow h-full min-h-screen grid-cols-12">
          <section className="sticky hidden col-span-2 bg-stone-100 xl:block">
            <SideMenu />
          </section>
          <section className="relative flex items-center justify-center w-full col-span-12 p-4 xl:col-span-10 h-72 md:h-screen ">
            <Image
              src="/images/explorer.png"
              // layout="fill"
              className="object-scale-down bg-left md:object-cover"
              alt="missing"
              priority
              fill
            />
            <div className="z-10 p-8 text-center transition duration-1000 ease-in-out transform translate-y-40 bg-white shadow-lg dark:bg-gray-900 md:transform-none ">
              <h1 className="font-serif text-3xl">404</h1>
              <h2>Oh no! I could not find the page you were looking for!</h2>
              <h3>Page not found</h3>
            </div>
          </section>
        </section>
      </Main>
    </>
  )
}
