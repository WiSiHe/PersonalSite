import OpenAI from "openai"

const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
})

export async function POST(req: Request) {
    const { messages } = await req.json()

    if (!messages || messages.length === 0) {
        return Response.json({
            role: "assistant",
            content: "No messages provided",
        })
    }

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
        return Response.json({
            role: "assistant",
            content: "Sorry, I don't know",
        })
    }

    return Response.json({ role: "assistant", content: response.content })
}
