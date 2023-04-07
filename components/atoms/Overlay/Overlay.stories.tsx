import type { Meta, StoryObj } from "@storybook/react"

import Overlay from "./Overlay"

const meta: Meta<typeof Overlay> = {
  title: "Atoms/Overlay",
  component: Overlay,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: "centered",
  },
}

export default meta

type Story = StoryObj<typeof Overlay>

export const Open: Story = {
  args: {
    display: true,
  },
}

export const Closed: Story = {
  args: {
    display: false,
  },
}
