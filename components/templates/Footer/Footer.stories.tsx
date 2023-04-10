import type { Meta, StoryObj } from "@storybook/react"

import Footer from "./Footer"

const meta: Meta<typeof Footer> = {
  title: "Templates/Footer",
  component: Footer,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: "padded",
  },
}

export default meta

type Story = StoryObj<typeof Footer>

export const Default: Story = {}
