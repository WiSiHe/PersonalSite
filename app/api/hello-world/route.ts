export async function GET(req: Request, res: Response) {
    // const res = await fetch("https://data.mongodb-api.com/...", {
    //     headers: {
    //         "Content-Type": "application/json",
    //         "API-Key": process.env.DATA_API_KEY,
    //     },
    // })
    // const data = await res.json()

    const data = `Hello World`

    return Response.json({ data })
}
