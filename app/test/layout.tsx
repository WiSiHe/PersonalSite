import Link from "next/link"

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* Include shared UI here e.g. a header or sidebar */}
      <nav className="p-4 bg-white mt-14">
        <ul className="flex gap-4">
          <li>
            <Link href="/test/open-ai">OpenAI</Link>
          </li>
          <li>
            <Link href="/test/spline">spline</Link>
          </li>
        </ul>
      </nav>
      {children}
    </>
  )
}
