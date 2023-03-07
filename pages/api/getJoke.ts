import type { NextApiRequest, NextApiResponse } from "next"

type ResponseData = {
  text: string
}

interface GenerateNextApiRequest extends NextApiRequest {
  body: {
    prompt: string
  }
}

export default async function handler(
  req: GenerateNextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const baseUrl = "https://v2.jokeapi.dev/joke/Any"

  try {
    const response = await fetch(baseUrl)
    const data = await response.json()
    const joke = data.joke
    res.status(200).json({ text: joke })
  } catch (error) {
    console.error(error)
    res.status(500).json({ text: "Sorry, I don't know" })
    return
  }
}
