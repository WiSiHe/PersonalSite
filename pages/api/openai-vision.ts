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

interface GenerateNextApiRequest extends NextApiRequest {
    body: {
        prompt: string
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

    if (!messages || messages.length === 0) {
        res.status(400).json({
            role: "assistant",
            content: "No messages provided",
        })
        return
    }

    try {
        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-4-vision-preview",
            messages: messages, // [  { role: 'user', content: 'How many stars are in the sky?' } ],
            max_tokens: 1000,
            // detail: "low",
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
