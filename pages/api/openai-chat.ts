import type { NextApiRequest, NextApiResponse } from "next"
import OpenAI from "openai"

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

const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
})

export default async function handler(
    req: GenerateNextApiRequest,
    res: NextApiResponse<ResponseData>,
) {
    const messages = req.body.messages
    const maxTokens = req.body.maxTokens || 1000
    const temperature = req.body.temperature || 0.7
    const frequencyPenalty = req.body.frequencyPenalty || 0.5
    const presencePenalty = req.body.presencePenalty || 0.5

    if (!messages || messages.length === 0) {
        res.status(400).json({
            role: "assistant",
            content: "No messages provided",
        })
        return
    }

    try {
        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-4-1106-preview",
            max_tokens: maxTokens, // 1000,
            stream: false,
            frequency_penalty: frequencyPenalty, // 0.5,
            presence_penalty: presencePenalty, // 0.5,
            temperature: temperature, // 0.7,
            top_p: 1, // 1,
            messages: messages, // [  { role: 'user', content: 'How many stars are in the sky?' } ],
        })

        const response = chatCompletion?.choices[0]?.message || {
            role: "assistant",
            content: "Sorry, I don't know",
        }

        if (!response.content) {
            res.status(500).json({
                role: "assistant",
                content: "Sorry, I don't know",
            })
            return
        }

        res.status(200).json({ role: "assistant", content: response.content })
    } catch (error) {
        res.status(500).json({
            role: "assistant",
            content: "Sorry, I don't know",
        })
        return
    }
}
