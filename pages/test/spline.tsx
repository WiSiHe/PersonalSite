import Main from "components/atoms/Main/Main"
import Script from "next/script"
import React from "react"

const threePage = () => {
  return (
    <>
      <Script
        type="module"
        src="https://unpkg.com/@splinetool/viewer/build/spline-viewer.js"
      ></Script>
      <Main className="grid grid-cols-12 p-4">
        <div className="col-span-6">Look at</div>
        <div
          dangerouslySetInnerHTML={{
            __html:
              '<spline-viewer url="https://prod.spline.design/FVZWbQH2B6ndj9UU/scene.splinecode" events-target="global"></spline-viewer>',
          }}
          className="w-full h-full min-h-screen col-span-6 bg-blue-300 ring"
        />
        <div className="col-span-6">Follow</div>
        <div
          dangerouslySetInnerHTML={{
            __html:
              '<spline-viewer url="https://prod.spline.design/PBQQBw8bfXDhBo7w/scene.splinecode" events-target="global"></spline-viewer>',
          }}
          className="w-full h-full min-h-screen col-span-6 bg-blue-300 ring"
        />
        <div className="col-span-6">Orbit & Zoom</div>
        <div
          dangerouslySetInnerHTML={{
            __html:
              '<spline-viewer url="https://prod.spline.design/U9O6K7fXziMEU7Wu/scene.splinecode" events-target="global"></spline-viewer>',
          }}
          className="w-full h-full min-h-screen col-span-6 bg-blue-300 ring"
        />
        <div className="col-span-6">Scroll</div>
        <div
          dangerouslySetInnerHTML={{
            __html:
              '<spline-viewer url="https://prod.spline.design/LEvjG3OETYd2GsRw/scene.splinecode" events-target="global"></spline-viewer>',
          }}
          className="w-full h-full min-h-screen col-span-6 bg-blue-300 ring"
        />
      </Main>
    </>
  )
}

export default threePage
