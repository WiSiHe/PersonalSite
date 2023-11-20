export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const blacklistFlags = searchParams.get("blacklistFlags")
    const contains = searchParams.get("contains")

    const baseUrl = "https://v2.jokeapi.dev/joke/Any"

    // https://v2.jokeapi.dev/joke/Programming?blacklistFlags=sexist&contains=christmas
    let queryUrl = baseUrl

    if (blacklistFlags) queryUrl += `?blacklistFlags=${blacklistFlags}`
    if (contains) queryUrl += `?contains=${contains}`
    if (blacklistFlags && contains) {
        queryUrl += `?blacklistFlags=${blacklistFlags}&contains=${contains}`
    }

    const res = await fetch(queryUrl, {
        headers: {
            "Content-Type": "application/json",
        },
    })
    const data = await res.json()

    return Response.json(data)
}
