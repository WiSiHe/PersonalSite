import type { Meta, StoryObj } from "@storybook/react"

import Mask from "./Mask"

const meta: Meta<typeof Mask> = {
  title: "Atoms/Mask",
  component: Mask,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: "centered",
  },
}

export default meta

type Story = StoryObj<typeof Mask>

export const Default: Story = {}
