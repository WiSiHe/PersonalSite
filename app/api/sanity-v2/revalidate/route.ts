/**
 * This code is responsible for revalidating queries as the dataset is updated.
 *
 * It is set up to receive a validated GROQ-powered Webhook from Sanity.io:
 * https://www.sanity.io/docs/webhooks
 *
 * 1. Go to the API section of your Sanity project on sanity.io/manage or run `npx sanity hook create`
 * 2. Click "Create webhook"
 * 3. Set the URL to https://YOUR_NEXTJS_SITE_URL/api/revalidate
 * 4. Dataset: Choose desired dataset or leave at default "all datasets"
 * 5. Trigger on: "Create", "Update", and "Delete"
 * 6. Filter: Leave empty
 * 7. Projection: {_type, "slug": slug.current}
 * 8. Status: Enable webhook
 * 9. HTTP method: POST
 * 10. HTTP Headers: Leave empty
 * 11. API version: v2021-03-25
 * 12. Include drafts: No
 * 13. Secret: Set to the same value as SANITY_REVALIDATE_SECRET (create a random secret if you haven't yet, for example by running `Math.random().toString(36).slice(2)` in your console)
 * 14. Save the cofiguration
 * 15. Add the secret to Vercel: `npx vercel env add SANITY_REVALIDATE_SECRET`
 * 16. Redeploy with `npx vercel --prod` to apply the new environment variable
 */

import { revalidateTag } from "next/cache"
import { type NextRequest, NextResponse } from "next/server"
import { parseBody } from "next-sanity/webhook"

import { revalidateSecret } from "@/sanity/lib/api"

export async function POST(req: NextRequest) {
    try {
        const { body, isValidSignature } = await parseBody<{
            _type: string
            slug?: string | undefined
        }>(req, revalidateSecret)
        if (!isValidSignature) {
            const message = "Invalid signature"
            return new Response(message, { status: 401 })
        }

        if (!body?._type) {
            return new Response("Bad Request", { status: 400 })
        }

        revalidateTag(body._type)
        if (body.slug) {
            revalidateTag(`${body._type}:${body.slug}`)
        }
        return NextResponse.json({
            status: 200,
            revalidated: true,
            now: Date.now(),
            body,
        })
    } catch (err: any) {
        console.error(err)
        return new Response(err.message, { status: 500 })
    }
}

// Old stuff

// import { apiVersion, dataset, projectId } from "lib/sanity.api"
// import { createClient, groq } from "next-sanity"
// import { parseBody } from "next-sanity/webhook"

// export { config } from "next-sanity/webhook"

// export default async function revalidate(req, res) {
//     try {
//         const { body, isValidSignature } = await parseBody(
//             req,
//             process.env.SANITY_WEBHOOK_SECRET,
//         )
//         if (isValidSignature === false) {
//             const message = "Invalid signature"
//             return res.status(401).send(message)
//         }

//         if (typeof body._id !== "string" || !body._id) {
//             const invalidId = "Invalid _id"
//             console.error(invalidId, { body })
//             return res.status(400).send(invalidId)
//         }

//         const staleRoutes = await queryStaleRoutes(body)
//         await Promise.all(staleRoutes.map((route) => res.revalidate(route)))

//         const updatedRoutes = `Updated routes: ${staleRoutes.join(", ")}`
//         return res.status(200).send(updatedRoutes)
//     } catch (err) {
//         console.error(err)
//         return res.status(500).send(err.message)
//     }
// }

// async function queryStaleRoutes(body) {
//     const client = createClient({
//         projectId,
//         dataset,
//         apiVersion,
//         useCdn: false,
//     })

//     if (!body._type) throw new Error("Missing _type")

//     // Handle possible deletions
//     if (body._type === "post") {
//         const exists = await client.fetch(groq`*[_id == $id][0]`, {
//             id: body._id,
//         })
//         if (!exists) {
//             const staleRoutes = ["/paintings"]
//             if (body.slug?.current) {
//                 staleRoutes.push(`/paintings/${body.slug.current}`)
//             }
//             // Assume that the post document was deleted. Query the datetime used to sort "More stories" to determine if the post was in the list.
//             const moreStories = await client.fetch(
//                 groq`count(
//           *[_type == "painting"] | order(date desc, _updatedAt desc) [0...3] [dateTime(date) > dateTime($date)]
//         )`,
//                 { date: body.date },
//             )
//             // If there's less than 3 posts with a newer date, we need to revalidate everything
//             if (moreStories < 3) {
//                 return [
//                     ...new Set([
//                         ...(await queryAllRoutes(client)),
//                         ...staleRoutes,
//                     ]),
//                 ]
//             }
//             return staleRoutes
//         }
//     }

//     switch (body._type) {
//         case "author":
//             return await queryStaleAuthorRoutes(client, body._id)
//         case "post":
//             return await queryStalePostRoutes(client, body._id)
//         case "settings":
//             return await queryAllRoutes(client)
//         case "painting":
//             return await queryStalePaintingRoutes(client, body._id)
//         default:
//             throw new TypeError(`Unknown type: ${body._type}`)
//     }
// }

// async function _queryAllRoutes(client) {
//     return await client.fetch(groq`*[_type == "post"].slug.current`)
// }

// async function queryAllRoutes(client) {
//     const slugs = await _queryAllRoutes(client)

//     return ["/", ...slugs.map((slug) => `/posts/${slug}`)]
// }

// async function mergeWithMoreStories(client, slugs) {
//     const moreStories = await client.fetch(
//         groq`*[_type == "post"] | order(date desc, _updatedAt desc) [0...3].slug.current`,
//     )
//     if (slugs.some((slug) => moreStories.includes(slug))) {
//         const allSlugs = await _queryAllRoutes(client)
//         return [...new Set([...slugs, ...allSlugs])]
//     }

//     return slugs
// }

// async function queryStaleAuthorRoutes(client, id) {
//     let slugs = await client.fetch(
//         groq`*[_type == "author" && _id == $id] {
//     "slug": *[_type == "post" && references(^._id)].slug.current
//   }["slug"][]`,
//         { id },
//     )

//     if (slugs.length > 0) {
//         slugs = await mergeWithMoreStories(client, slugs)
//         return ["/", ...slugs.map((slug) => `/posts/${slug}`)]
//     }

//     return []
// }

// async function queryStalePostRoutes(client, id) {
//     let slugs = await client.fetch(
//         groq`*[_type == "post" && _id == $id].slug.current`,
//         { id },
//     )

//     slugs = await mergeWithMoreStories(client, slugs)

//     return ["/", ...slugs.map((slug) => `/posts/${slug}`)]
// }

// async function queryStalePaintingRoutes(client, id) {
//     let slugs = await client.fetch(
//         groq`*[_type == "painting" && _id == $id].slug.current`,
//         { id },
//     )

//     slugs = await mergeWithMoreStories(client, slugs)

//     return ["/paintings", ...slugs.map((slug) => `/paintings/${slug}`)]
// }
