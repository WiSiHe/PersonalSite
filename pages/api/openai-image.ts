import type { NextApiRequest, NextApiResponse } from "next"
import { Configuration, OpenAIApi } from "openai"

type ResponseData = {
  text: string
}

interface GenerateNextApiRequest extends NextApiRequest {
  body: {
    prompt: string
  }
}

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

export default async function handler(
  req: GenerateNextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const promt = req.body.prompt

  if (!promt || promt === "") {
    res.status(400).json({ text: "No prompt provided" })
    return
  }

  try {
    const aiResult = await openai.createImage({
      n: 1,
      prompt: promt,
      size: "256x256",
    })
    const response = aiResult.data.data[0].url || "Sorry, I don't know"
    res.status(200).json({ text: response })
  } catch (error) {
    console.error(error)
    res.status(500).json({ text: "Sorry, I don't know" })
    return
  }
}
