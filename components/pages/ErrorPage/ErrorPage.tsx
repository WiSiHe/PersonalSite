import Main from "components/atoms/Main/Main"
import Image from "next/image"

interface iErrorPageProps {
    title?: string
    subtitle?: string
}

const ErrorPage = ({
    title = "You seem a little lost!",
    subtitle = "Page not found",
}: iErrorPageProps) => {
    return (
        <Main noTopPadding>
            <section className="relative grid flex-1 flex-grow h-full min-h-screen grid-cols-12">
                <section className="relative flex items-center justify-center w-full col-span-full h-72 md:h-screen ">
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
                        <h2>{title}</h2>
                        <p>{subtitle}</p>
                    </div>
                </section>
            </section>
        </Main>
    )
}

export default ErrorPage
