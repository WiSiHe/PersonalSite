import type { NextApiRequest, NextApiResponse } from "next"
import { Configuration, OpenAIApi } from "openai"

type Role = "assistant" | "user"

interface Message {
  role: Role
  content: string
}

interface ResponseData {
  role: Role
  content: string
}

// const exampleResponse = {"role":"assistant","content":"As an AI language model, I don't have personal beliefs, but according to scientific research, the sun's brightness is measured on a scale called luminosity, and it has a luminosity of approximately 3.828 x 10^26 watts. This means that the sun is incredibly bright and can cause damage to human eyes if directly observed without proper protection."},"types":{"role":"assistant","content":"text"}

interface GenerateNextApiRequest extends NextApiRequest {
  body: {
    prompt: string
    maxTokens?: number
    temperature?: number
    frequencyPenalty?: number
    presencePenalty?: number
    messages: Message[]
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
  const messages = req.body.messages
  // const maxTokens = req.body.maxTokens || 100
  const temperature = req.body.temperature || 1
  // const frequencyPenalty = req.body.frequencyPenalty || 0.5
  // const presencePenalty = req.body.presencePenalty || 0.5

  if (!promt || promt === "") {
    res.status(400).json({ role: "assistant", content: "No prompt provided" })
    return
  }

  try {
    const aiResult = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      // max_tokens: 100,
      stream: false,
      // frequency_penalty: 0.5,
      // presence_penalty: 0.5,
      // temperature: 0.7,
      // top_p: 1,
      // messages: [
      //   {
      //     role: "user",
      //     content: promt,
      //   },
      // ],
      messages: messages,
      temperature: temperature, // higher temperature means more creative, less coherent
    })

    console.log("aiResult", aiResult)

    const response = aiResult?.data?.choices[0]?.message || {
      role: "assistant",
      content: "Sorry, I don't know",
    }

    if (!response.content) {
      res
        .status(500)
        .json({ role: "assistant", content: "Sorry, I don't know" })
      return
    }

    res.status(200).json({ role: "assistant", content: response.content })
  } catch (error) {
    console.error(error)
    res.status(500).json({ role: "assistant", content: "Sorry, I don't know" })
    return
  }
}
