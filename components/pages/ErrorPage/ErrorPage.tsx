import Main from "components/atoms/Main/Main"
import SideMenu from "components/organisms/SideMenu/SideMenu"
import Image from "next/image"

const ErrorPage = () => {
  return (
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
          <div className="z-10 p-10 text-center transition duration-1000 ease-in-out transform translate-y-40 bg-white shadow-lg dark:bg-gray-900 md:transform-none ">
            <h1>404</h1>
            <h2>You seem a little lost!</h2>
            <p>Page not found</p>
          </div>
        </section>
      </section>
    </Main>
  )
}

export default ErrorPage
