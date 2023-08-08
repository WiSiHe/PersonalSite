// import { getPlaiceholder } from "plaiceholder"

// async function getBase64(imageUrl: string) {
//   try {
//     const result = await fetch(imageUrl)

//     if (!result.ok) {
//       throw new Error(`Error ${result.status} ${result.statusText}`)
//     }
//     const buffer = await result.arrayBuffer()

//     const { base64 } = await getPlaiceholder(Buffer.from(buffer))

//     return base64
//   } catch (error) {
//     if (error instanceof Error) {
//       console.log(error.message)
//     }
//   }
// }

// export {  }
