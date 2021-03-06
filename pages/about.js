import React from "react"
import PropTypes from "prop-types"

import Navigation from "../components/Navigation"

import Main from "../components/Main"
import Meta from "../components/Meta/Meta"
import NavigationDrawer from "../components/NavigationDrawer"

import SideMenu from "components/SideMenu"
import Image from "next/image"

import portrait from "public/images/selfPortrait.png"

export default function ProjectsPage() {
  return (
    <>
      <Meta
        title="Projects"
        description="A collection of Henrik Wilhelm Sissener's previous projects"
      />

      <Navigation hideOnDesktop darkMode />
      <NavigationDrawer />
      <Main noTopPadding>
        <section className="relative grid flex-1 flex-grow h-full min-h-screen grid-cols-12">
          <section className="relative hidden h-full col-span-2 bg-stone-100 xl:block">
            <div className="sticky  top-0 w-full h-[fit-content]">
              <SideMenu />
            </div>
          </section>
          <section className="relative col-span-12 p-4 pt-10 xl:col-span-10">
            <div className="relative grid grid-cols-8 gap-10 py-10">
              <h1 className="text-4xl col-span-full">About me</h1>
              <article className="relative flex flex-col overflow-hidden bg-white rounded-lg shadow-xl xl:col-span-6 xl:flex-row col-span-full xl:h-96 xl:overflow-visible">
                <p className="max-w-2xl p-4">
                  Short story: I’m a digital artist / web developer / hobby designer who has been
                  drawing my whole life. I mostly do character designs, but I try to step into the
                  big world of landscape every now and then, I spend my free time making digital
                  paintings paintings and do some tinkering with new Frontend technologies.
                </p>

                <div className="relative order-1 w-full overflow-hidden transition-all h-96 xl:h-full xl:order-2 xl:transform xl:translate-x-10 xl:translate-y-0">
                  <Image src={portrait} alt="test" className="object-cover" layout="fill" />
                </div>
              </article>
            </div>
          </section>
        </section>
      </Main>
    </>
  )
}

ProjectsPage.propTypes = {
  paintings: PropTypes.array
}
