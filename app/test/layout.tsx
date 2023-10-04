// import { UserButton } from "@clerk/nextjs"
import Link from "next/link"

export default function DashboardLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    return (
        // <ClerkProvider>
        <>
            <nav className="sticky top-0 flex justify-between gap-4 p-4 mx-4 mt-20 bg-white rounded-lg left-4 right-4 drop-shadow-xl">
                <ul className="flex gap-4">
                    <li>
                        <Link href="/test">Next</Link>
                    </li>
                    <li>
                        <Link href="/test/open-ai">OpenAI</Link>
                    </li>
                    <li>
                        <Link href="/test/spline">spline</Link>
                    </li>
                    <li>
                        <Link href="/test/search">Search</Link>
                    </li>
                    <li>
                        <Link href="/test/functions">Functions</Link>
                    </li>
                </ul>
                {/* <UserButton afterSignOutUrl="/" /> */}
            </nav>
            {children}
        </>
        // </ClerkProvider>
    )
}
