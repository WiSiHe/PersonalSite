// import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook"

// const SANITY_WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET

// export default async function handler(req, res) {
//   const signature = req.headers[SIGNATURE_HEADER_NAME]
//   const isValid = isValidSignature(
//     JSON.stringify(req.body),
//     signature,
//     SANITY_WEBHOOK_SECRET
//   )

//   console.log(`===== Is the webhook request valid? ${isValid}`)

//   // Validate signature
//   if (!isValid) {
//     res.status(401).json({ success: false, message: "Invalid signature" })
//     return
//   }

//   try {
//     const pathToRevalidate = req.body.slug.current

//     console.log(`===== Revalidating: ${pathToRevalidate}`)

//     await res.revalidate(pathToRevalidate)

//     return res.json({ revalidated: true })
//   } catch (err) {
//     // Could not revalidate. The stale page will continue to be shown until
//     // this issue is fixed.
//     return res.status(500).send("Error while revalidating")
//   }
// }
import { isValidRequest, SIGNATURE_HEADER_NAME } from "@sanity/webhook"

const secret = process.env.SANITY_WEBHOOK_SECRET

export default async function handler(req, res) {
  const signature = request.headers[SIGNATURE_HEADER_NAME]
  const body = await readBody(req) // Read the body into a string
  if (!isValidSignature(body, signature, secret)) {
    res.status(401).json({ success: false, message: "Invalid signature" })
    return
  }

  const jsonBody = JSON.parse(body)
  doSomeMagicWithPayload(jsonBody)
  res.json({ success: true })
}

// Next.js will by default parse the body, which can lead to invalid signatures
export const config = {
  api: {
    bodyParser: false,
  },
}

async function readBody(readable) {
  const chunks = []
  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk)
  }
  return Buffer.concat(chunks).toString("utf8")
}
