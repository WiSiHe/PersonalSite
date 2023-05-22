import Main from "components/atoms/Main/Main"
import Script from "next/script"

export const metadata = {
  title: "My Gallery",
  description: "A gallery of some of my paintings",
  locale: "en-US",
  type: "website",
}

export default async function Home() {
  return (
    <>
      <Script
        type="module"
        src="https://unpkg.com/@splinetool/viewer/build/spline-viewer.js"
      />
      <Main className="min-h-screen" noTopPadding>
        <section className="grid grid-cols-12 p-4">
          <div className="col-span-full">
            Look at
            <div
              dangerouslySetInnerHTML={{
                __html:
                  '<spline-viewer url="https://prod.spline.design/FVZWbQH2B6ndj9UU/scene.splinecode" events-target="global"></spline-viewer>',
              }}
              className="w-full h-full bg-blue-300 col-span-full aspect-square ring"
            />
          </div>

          <div className=" col-span-full">
            Follow
            <div
              dangerouslySetInnerHTML={{
                __html:
                  '<spline-viewer url="https://prod.spline.design/PBQQBw8bfXDhBo7w/scene.splinecode" events-target="global"></spline-viewer>',
              }}
              className="w-full h-full col-span-6 bg-blue-300 aspect-square ring"
            />
          </div>

          <div className="col-span-full">
            Orbit & Zoom{" "}
            <div
              dangerouslySetInnerHTML={{
                __html:
                  '<spline-viewer url="https://prod.spline.design/U9O6K7fXziMEU7Wu/scene.splinecode" events-target="global"></spline-viewer>',
              }}
              className="w-full h-full col-span-6 bg-blue-300 aspect-square ring"
            />
          </div>

          <div className="col-span-full">
            Scroll{" "}
            <div
              dangerouslySetInnerHTML={{
                __html:
                  '<spline-viewer url="https://prod.spline.design/LEvjG3OETYd2GsRw/scene.splinecode" events-target="global"></spline-viewer>',
              }}
              className="w-full h-full col-span-6 bg-blue-300 aspect-square ring"
            />
          </div>
        </section>
      </Main>
    </>
  )
}
