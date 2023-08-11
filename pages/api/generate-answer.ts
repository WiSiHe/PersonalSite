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
  res: NextApiResponse<ResponseData>,
) {
  const promt = req.body.prompt

  if (!promt || promt === "") {
    res.status(400).json({ text: "No prompt provided" })
    return
  }

  try {
    const aiResult = await openai.createCompletion(
      {
        model: "text-davinci-003",
        prompt: promt,
        max_tokens: 100, // max number of tokens to generate
        temperature: 0.9, // higher temperature means more creative, less coherent
        frequency_penalty: 0.5, // penalize new tokens based on their existing frequency, between -2.0 and 2.0
        presence_penalty: 0.0, // penalize new tokens based on whether they appear in the text so far,between -2.0 and 2.0
      },
      { timeout: 0 },
    )
    const response = aiResult.data.choices[0].text || "Sorry, I don't know"
    res.status(200).json({ text: response })
  } catch (error) {
    console.error(error)
    res.status(500).json({ text: "Sorry, I don't know" })
    return
  }
}
