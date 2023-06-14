import Link from "next/link"

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <nav className="p-4 mt-14">
        <ul className="sticky top-0 flex gap-4 p-4 bg-white rounded-lg drop-shadow-xl">
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
        </ul>
      </nav>
      {children}
    </>
  )
}
