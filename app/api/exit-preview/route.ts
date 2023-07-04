import { draftMode } from "next/headers"
import { redirect } from "next/navigation"

export async function GET(req: Request) {
  draftMode().disable()
  // Redirect to the preview path
  // Note: Not using «redirect()» because it has a bug at the time of writing this»

  return new Response(null, {
    status: 307,
    headers: {
      Location: "/",
    },
  })
}
