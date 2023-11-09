import type { NextApiRequest, NextApiResponse } from "next"
import OpenAI from "openai"

type ResponseData = {
    text: string
}

interface GenerateNextApiRequest extends NextApiRequest {
    body: {
        prompt: string
    }
}

const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY })

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
        const aiResult = await openai.images.generate({
            model: "dall-e-3",
            prompt: promt,
            n: 1,
            size: "1024x1024",
        })

        const response = aiResult?.data[0]?.url || "Sorry, I don't know"

        res.status(200).json({ text: response })
    } catch (error) {
        console.error(error)
        res.status(500).json({ text: "Sorry, I don't know" })
        return
    }
}
