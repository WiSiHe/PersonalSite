import { cookies } from "next/headers"

export async function GET() {
    cookies().set("theme", "dark")

    const data = `Dark mode enabled`

    return Response.json({ data })
}
