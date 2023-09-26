// import type { Preview } from "@storybook/react"
// import "styles/globals.css"

// import * as NextImage from "next/image"
// import React from "react"

// const OriginalNextImage = NextImage.default

// Object.defineProperty(NextImage, "default", {
//   configurable: true,
//   value: (props) => <OriginalNextImage {...props} unoptimized />,
// })

// const preview: Preview = {
//   parameters: {
//     actions: { argTypesRegex: "^on[A-Z].*" },
//     layout: "padded",
//     // decorators: [
//     //   (Story) => (
//     //     <div style={{ margin: "3em" }}>
//     //       <Story />
//     //     </div>
//     //   ),
//     // ],
//     controls: {
//       matchers: {
//         color: /(background|color)$/i,
//         date: /Date$/,
//       },
//     },
//   },
// }

// export default preview

import { Preview } from "@storybook/react"

import "styles/globals.css"

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: "^on[A-Z].*" },
        layout: "padded",
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
        nextjs: {
            appDirectory: true,
        },
    },
}

export default preview
