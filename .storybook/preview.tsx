import "styles/globals.css"
import type { Preview } from "@storybook/react"
import React from "react"

import * as NextImage from "next/image"

const OriginalNextImage = NextImage.default

Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
})

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    layout: "padded",
    // decorators: [
    //   (Story) => (
    //     <div style={{ margin: "3em" }}>
    //       <Story />
    //     </div>
    //   ),
    // ],
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
}

export default preview
