import "styles/globals.css"
import type { Preview } from "@storybook/react"
import React from "react"

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    layout: "padded",
    decorators: [
      (Story) => (
        <div style={{ margin: "3em" }}>
          <Story />
        </div>
      ),
    ],
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
}

export default preview
